import React, { useState, useMemo } from 'react';
import { Skill } from '../types';
import { Search, X, Filter, Bot, ArrowRight, Sparkles, Check, Copy } from 'lucide-react';

interface SkillsCatalogProps {
  skills: Skill[];
  onSelectSkill: (skill: Skill) => void;
}

export const SkillsCatalog: React.FC<SkillsCatalogProps> = ({ skills, onSelectSkill }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState('All');
  const [onlyNewOrPitfalls, setOnlyNewOrPitfalls] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    skills.forEach((s) => {
      (s.categories || ['General']).forEach((c) => {
        counts[c] = (counts[c] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [skills]);

  const agents = ['All', 'cursor', 'claude-code', 'cline', 'continue'];

  const filteredSkills = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return skills.filter((skill) => {
      const matchSearch =
        !q ||
        skill.id.toLowerCase().includes(q) ||
        (skill.name && skill.name.toLowerCase().includes(q)) ||
        (skill.description && skill.description.toLowerCase().includes(q)) ||
        (skill.categories || []).some((c) => c.toLowerCase().includes(q)) ||
        (skill.languages || []).some((l) => l.toLowerCase().includes(q));

      const matchCat =
        selectedCategory === 'All' ||
        (skill.categories || []).includes(selectedCategory);

      const matchAgent =
        selectedAgent === 'All' ||
        (skill.supportedAgents || []).includes(selectedAgent);

      const matchPitfalls =
        !onlyNewOrPitfalls ||
        (skill.pitfalls && skill.pitfalls.length > 0) ||
        skill.lastVerified === '2026-10-21';

      return matchSearch && matchCat && matchAgent && matchPitfalls;
    });
  }, [skills, searchQuery, selectedCategory, selectedAgent, onlyNewOrPitfalls]);

  const handleCopyQuick = (e: React.MouseEvent, skill: Skill) => {
    e.stopPropagation();
    const content = skill.skillMd || `# ${skill.name}\n\n${skill.description}`;
    navigator.clipboard.writeText(content);
    setCopiedId(skill.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1e293b] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Verified API Skills Catalog
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            Explore <strong className="text-slate-200">{skills.length} structured skill specifications</strong> tested against AI coding agents (Claude Code, Cursor, Cline, Continue).
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-slate-400 bg-[#0f172a] px-3.5 py-2 rounded-lg border border-[#1e293b] self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>
            Showing <strong className="text-white">{filteredSkills.length}</strong> of {skills.length} skills
          </span>
        </div>
      </div>

      {/* Search & Agent Filter Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Search Input */}
        <div className="lg:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by API name, category, or language (e.g., stripe, vercel-ai-sdk, langgraph, d1)..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#0f172a] border border-[#1e293b] focus:border-sky-400 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Agent Compatibility Filter */}
        <div className="lg:col-span-4 flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1 shrink-0 mr-1">
            <Bot className="w-3.5 h-3.5 text-sky-400" /> Agent:
          </span>
          {agents.map((ag) => (
            <button
              key={ag}
              onClick={() => setSelectedAgent(ag)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 border ${
                selectedAgent === ag
                  ? 'bg-sky-500/15 text-sky-400 border-sky-500/40 font-semibold'
                  : 'bg-[#0f172a] text-slate-400 border-[#1e293b] hover:text-slate-200'
              }`}
            >
              {ag}
            </button>
          ))}
        </div>

        {/* Rich Pitfalls Filter Toggle */}
        <div className="lg:col-span-2 flex justify-start lg:justify-end">
          <button
            onClick={() => setOnlyNewOrPitfalls(!onlyNewOrPitfalls)}
            className={`w-full lg:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
              onlyNewOrPitfalls
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 font-semibold'
                : 'bg-[#0f172a] text-slate-400 border-[#1e293b] hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Enhanced Pitfalls</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills (Mobile Horizontal Scroll, Desktop Wrap) */}
      <div className="flex items-center gap-2 overflow-x-auto md:flex-wrap pb-2 md:pb-0 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border ${
            selectedCategory === 'All'
              ? 'bg-sky-500/15 text-sky-400 border-sky-400 font-semibold shadow-sm shadow-sky-500/10'
              : 'bg-[#0f172a] text-slate-400 border-[#1e293b] hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          All ({skills.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 border ${
              selectedCategory === cat.name
                ? 'bg-sky-500/15 text-sky-400 border-sky-400 font-semibold shadow-sm shadow-sky-500/10'
                : 'bg-[#0f172a] text-slate-400 border-[#1e293b] hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Skills Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop, 4 col xl */}
      {filteredSkills.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0f172a] border border-[#1e293b] space-y-3">
          <Filter className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No matching API skills found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Try clearing your search filter or switching to a broader category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedAgent('All');
              setOnlyNewOrPitfalls(false);
            }}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-sky-500 text-white hover:bg-sky-400 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const isRecentlyVerified = skill.lastVerified === '2026-10-21';
            return (
              <div
                key={skill.id}
                onClick={() => onSelectSkill(skill)}
                className="group relative flex flex-col justify-between p-4 rounded-xl bg-[#0f172a] hover:bg-[#131d33] border border-[#1e293b] hover:border-sky-500/60 transition-all duration-150 cursor-pointer shadow-md hover:shadow-xl hover:shadow-sky-500/5 hover:-translate-y-0.5"
              >
                <div>
                  {/* Card Top Header */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 className="font-mono font-bold text-base text-white truncate group-hover:text-sky-400 transition-colors">
                        {skill.name || skill.id}
                      </h3>
                      {isRecentlyVerified && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 shrink-0">
                          NEW
                        </span>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-emerald-500/15 text-emerald-400 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {skill.validationStatus || 'validated'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 line-clamp-2 mb-3.5 leading-relaxed">
                    {skill.description || 'Verified API skill specification for AI coding agents.'}
                  </p>

                  {/* Category & Language Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(skill.categories || ['General']).slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#1e293b] text-sky-300 border border-slate-700/60"
                      >
                        {cat}
                      </span>
                    ))}
                    {(skill.languages || []).slice(0, 2).map((lang) => (
                      <span
                        key={lang}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-[#090d16]/70 border border-[#1e293b]"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-2.5 border-t border-[#1e293b] flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={(e) => handleCopyQuick(e, skill)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-sky-400 transition-colors"
                    title="Copy SKILL.md"
                  >
                    {copiedId === skill.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy SKILL.md</span>
                      </>
                    )}
                  </button>

                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-sky-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    Inspect <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
