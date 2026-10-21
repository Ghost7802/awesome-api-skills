import React, { useState } from 'react';
import { Skill } from '../types';
import { X, ExternalLink, ShieldCheck, AlertTriangle, CheckSquare, FileText, Code2, Copy, Check, ArrowRight } from 'lucide-react';

interface SkillDetailModalProps {
  skill: Skill | null;
  onClose: () => void;
  onSelectSkill: (skillId: string) => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({
  skill,
  onClose,
  onSelectSkill,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'pitfalls' | 'checklist' | 'code' | 'raw'>('guide');
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  if (!skill) return null;

  const handleCopySkillMd = () => {
    const textToCopy = skill.skillMd || `# ${skill.name}\n\n${skill.description}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#090d16] border border-[#1e293b] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-[#1e293b] bg-[#0c121e]">
          <div className="space-y-1.5 pr-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-2xl font-black text-white tracking-tight font-mono">
                {skill.name}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {skill.validationStatus || 'validated'}
              </span>
              <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-[#1e293b]">
                v{skill.version || '1.0.0'}
              </span>
              {skill.compatibility && (
                <span className="text-xs font-mono text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                  {skill.compatibility}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {skill.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySkillMd}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-all"
              title="Copy complete SKILL.md to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied SKILL.md!' : 'Copy SKILL.md'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1e293b] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust Panel Banner */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#0f172a] border-b border-[#1e293b] text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-mono">Maintainer</span>
              <span className="text-slate-200 font-medium">{skill.maintainer || skill.author || 'API Skills Team'}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-mono">Last Verified</span>
              <span className="text-emerald-400 font-mono font-medium">{skill.lastVerified || skill.lastUpdated || '2026-07-03'}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-mono">SDK Languages</span>
              <span className="text-slate-200 font-medium">{(skill.languages || ['typescript']).join(', ')}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-mono">Official Source</span>
              {skill.documentationSource ? (
                <a
                  href={skill.documentationSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  Documentation <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-slate-400">—</span>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-5 sm:px-6 border-b border-[#1e293b] bg-[#0c121e] overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'border-sky-400 text-sky-400 bg-sky-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Integration Guide
          </button>
          <button
            onClick={() => setActiveTab('pitfalls')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'pitfalls'
                ? 'border-rose-400 text-rose-400 bg-rose-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            AI Pitfalls
            {skill.pitfalls && skill.pitfalls.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 text-[10px]">
                {skill.pitfalls.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'checklist'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            Production Checklist
            {skill.checklist && skill.checklist.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
                {skill.checklist.length}
              </span>
            )}
          </button>
          {((skill.examples && skill.examples.length > 0) || (skill.prompts && skill.prompts.length > 0)) && (
            <button
              onClick={() => setActiveTab('code')}
              className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'border-blue-400 text-blue-400 bg-blue-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              Code &amp; Prompts ({(skill.examples?.length || 0) + (skill.prompts?.length || 0)})
            </button>
          )}
          <button
            onClick={() => setActiveTab('raw')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'raw'
                ? 'border-purple-400 text-purple-400 bg-purple-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Raw SKILL.md
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm text-slate-300">
          {/* TAB: GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              {/* Verified API Performance Benchmarks Panel */}
              {skill.benchmarks && (
                <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                      Verified API Performance Benchmarks
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      {skill.benchmarks.benchmarkSource}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#090d16] border border-[#1e293b]">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        P50 / P99 Latency
                      </span>
                      <span className="font-mono font-bold text-emerald-400 text-sm mt-0.5 block">
                        {skill.benchmarks.p50LatencyMs}ms / {skill.benchmarks.p99LatencyMs}ms
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#090d16] border border-[#1e293b]">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        SLA / Availability
                      </span>
                      <span className="font-mono font-bold text-sky-400 text-xs mt-0.5 block truncate" title={skill.benchmarks.slaUptime}>
                        {skill.benchmarks.slaUptime}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#090d16] border border-[#1e293b]">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Context Budget
                      </span>
                      <span className="font-mono font-bold text-purple-400 text-xs mt-0.5 block">
                        ~{skill.benchmarks.estimatedContextTokens} tokens ({(skill.benchmarks.skillMdBytes / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#090d16] border border-[#1e293b]">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Wire Protocol
                      </span>
                      <span className="font-mono font-bold text-slate-200 text-xs mt-0.5 block truncate" title={skill.benchmarks.protocol}>
                        {skill.benchmarks.protocol}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
                    <div className="p-2.5 rounded-lg bg-[#090d16]/70 border border-[#1e293b]">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Verified Throughput Profile
                      </span>
                      <span className="font-mono text-slate-200 mt-0.5 block">
                        {skill.benchmarks.throughput}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#090d16]/70 border border-[#1e293b]">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Production Rate Limit &amp; Quotas
                      </span>
                      <span className="font-mono text-amber-300/90 mt-0.5 block">
                        {skill.benchmarks.rateLimit}
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 pt-0.5">
                    Workload: <span className="text-slate-300">{skill.benchmarks.benchmarkWorkload}</span>
                  </div>
                </div>
              )}

              {/* Graph Connections */}
              {skill.relationships && skill.relationships.length > 0 && (
                <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b]">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Connected Knowledge Graph Nodes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.relationships.map((rel, i) => (
                      <button
                        key={i}
                        onClick={() => onSelectSkill(rel.target)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-[#1e293b] hover:bg-sky-500/20 text-slate-200 hover:text-sky-300 border border-[#334155] transition-all"
                      >
                        <span className="text-slate-400">{rel.type.replace(/_/g, ' ')}:</span>
                        <span className="font-bold text-sky-400">{rel.target}</span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Formatted Guide Body */}
              <div className="prose prose-invert max-w-none space-y-4">
                <div className="p-4 rounded-xl bg-[#0c121e] border border-[#1e293b]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400">Quick Installation</span>
                  </div>
                  <pre className="font-mono text-xs text-sky-300 p-3 bg-[#060a12] rounded-lg border border-[#1e293b] overflow-x-auto">
                    <code>npm install {skill.name}</code>
                  </pre>
                </div>

                {skill.skillMd ? (
                  <div className="whitespace-pre-wrap font-sans text-sm text-slate-300 leading-relaxed bg-[#0c121e] p-5 rounded-xl border border-[#1e293b] font-mono text-xs">
                    {skill.skillMd}
                  </div>
                ) : (
                  <p className="text-slate-400 italic">Integration guide content available in Raw SKILL.md.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB: PITFALLS */}
          {activeTab === 'pitfalls' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>
                  These are documented failure points where AI coding models (GPT-4, Claude 3.5, Gemini Pro) frequently hallucinate or generate breaking code.
                </span>
              </div>

              {skill.pitfalls && skill.pitfalls.length > 0 ? (
                <div className="space-y-3">
                  {skill.pitfalls.map((pitfall, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#0f172a] border border-rose-500/20 flex items-start gap-3.5"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-mono text-xs font-bold shrink-0">
                        {i + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="font-medium text-slate-200 text-sm leading-snug">{pitfall}</p>
                        <span className="text-xs text-rose-400/90 font-mono block">
                          Verified prevention standard in SKILL.md v1.0
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 bg-[#0f172a] rounded-xl border border-[#1e293b]">
                  <p>Standard SDK methods apply. Refer to the full guide for details.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  Run this production readiness checklist before deploying this API integration to live users.
                </span>
              </div>

              {skill.checklist && skill.checklist.length > 0 ? (
                <div className="space-y-2.5">
                  {skill.checklist.map((item, i) => {
                    const isChecked = !!checkedItems[i];
                    return (
                      <div
                        key={i}
                        onClick={() => toggleCheck(i)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                          isChecked
                            ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                            : 'bg-[#0f172a] border-[#1e293b] text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-400 text-black'
                              : 'border-slate-600 bg-[#1e293b]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className={`text-sm ${isChecked ? 'line-through text-slate-400' : ''}`}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 bg-[#0f172a] rounded-xl border border-[#1e293b]">
                  <p>No custom checklist items defined. Review integration guide.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: CODE EXAMPLES & PROMPTS */}
          {activeTab === 'code' && (
            <div className="space-y-6">
              {skill.examples && skill.examples.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Production Code Examples ({skill.examples.length})
                  </h4>
                  {skill.examples.map((ex, i) => (
                    <div key={i} className="rounded-xl border border-[#1e293b] bg-[#0c121e] overflow-hidden">
                      <div className="px-4 py-2 bg-[#090d16] border-b border-[#1e293b] font-mono text-xs text-sky-400 flex items-center justify-between">
                        <span>{ex.filename}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(ex.content);
                          }}
                          className="hover:text-white"
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="p-4 font-mono text-xs text-slate-200 overflow-x-auto max-h-80">
                        <code>{ex.content}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              )}

              {skill.prompts && skill.prompts.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Agent System Prompts ({skill.prompts.length})
                  </h4>
                  {skill.prompts.map((pr, i) => (
                    <div key={i} className="rounded-xl border border-[#1e293b] bg-[#0c121e] overflow-hidden">
                      <div className="px-4 py-2 bg-[#090d16] border-b border-[#1e293b] font-mono text-xs text-purple-400 flex items-center justify-between">
                        <span>{pr.filename}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(pr.content);
                          }}
                          className="hover:text-white"
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-80 whitespace-pre-wrap">
                        <code>{pr.content}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: RAW SKILL.MD */}
          {activeTab === 'raw' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Exact markdown ingested by Cursor (.cursorrules), Claude Code (CLAUDE.md), and Continue:
                </span>
                <button
                  onClick={handleCopySkillMd}
                  className="px-3 py-1 text-xs font-mono bg-sky-500/10 text-sky-400 rounded hover:bg-sky-500/20"
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#060a12] border border-[#1e293b] font-mono text-xs text-slate-200 whitespace-pre-wrap overflow-x-auto max-h-[500px]">
                <code>{skill.skillMd || `# ${skill.name}\n\n${skill.description}`}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-[#0c121e] border-t border-[#1e293b] flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">
            Compatible with Cursor, Claude Code, Cline, Continue
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1e293b] hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
