import React, { useState, useEffect, useMemo } from 'react';
import { Skill } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  skills: Skill[];
  onSelectSkill: (skill: Skill) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  skills,
  onSelectSkill,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return skills.slice(0, 10);
    return skills
      .filter(
        (s) =>
          s.id.toLowerCase().includes(q) ||
          (s.name && s.name.toLowerCase().includes(q)) ||
          (s.description && s.description.toLowerCase().includes(q)) ||
          (s.categories || []).some((c) => c.toLowerCase().includes(q))
      )
      .slice(0, 12);
  }, [skills, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-[#0f172a] border border-[#1e293b] shadow-2xl overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-[#1e293b] bg-[#0c121e]">
          <Search className="w-4 h-4 text-sky-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Quick search ${skills.length} verified API skills...`}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-[#1e293b]">
          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching API skills found for "{query}".
            </div>
          ) : (
            results.map((skill) => (
              <button
                key={skill.id}
                onClick={() => {
                  onSelectSkill(skill);
                  onClose();
                }}
                className="w-full px-4 py-3 text-left hover:bg-[#131d33] flex items-center justify-between gap-3 transition-colors group"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-white group-hover:text-sky-400">
                      {skill.name || skill.id}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e293b] text-sky-300">
                      {(skill.categories || ['General'])[0]}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {skill.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
