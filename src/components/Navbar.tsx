import React from 'react';
import { Sparkles, Terminal, Compass, Network, BookOpen, Search } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  skillCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  skillCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1e293b] bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-600 p-[1px] shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-[#090d16] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white font-sans">
                Awesome <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">API Skills</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                v1.0.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden md:block">
              {skillCount} verified SKILL.md specs for AI coding agents
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'home'
                ? 'text-sky-400 bg-sky-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'catalog'
                ? 'text-sky-400 bg-sky-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            Skills Catalog
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'playground'
                ? 'text-sky-400 bg-sky-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            Skill Studio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('graph')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'graph'
                ? 'text-sky-400 bg-sky-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Network className="w-4 h-4" />
            Knowledge Graph
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'terminal'
                ? 'text-sky-400 bg-sky-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-4 h-4" />
            CLI Terminal
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('docs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'docs'
                ? 'text-sky-400 bg-sky-500/10 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Documentation
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-[#0f172a] hover:bg-[#131d33] border border-[#1e293b] hover:border-sky-500/50 rounded-lg transition-all shadow-sm"
            title="Search skills (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search skills...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#1e293b] text-slate-300 rounded border border-slate-700">
              ⌘K
            </kbd>
          </button>

          <a
            href="https://github.com/Ghost7802/awesome-api-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-[#1e293b]/60 rounded-lg transition-colors border border-transparent hover:border-[#1e293b]"
            aria-label="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile navigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#1e293b] bg-[#0c121e] px-2 py-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-2.5 py-1 rounded ${activeTab === 'home' ? 'text-sky-400 font-bold bg-sky-500/15' : 'text-slate-400'}`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-2.5 py-1 rounded ${activeTab === 'catalog' ? 'text-sky-400 font-bold bg-sky-500/15' : 'text-slate-400'}`}
        >
          Catalog
        </button>
        <button
          onClick={() => setActiveTab('playground')}
          className={`px-2.5 py-1 rounded ${activeTab === 'playground' ? 'text-sky-400 font-bold bg-sky-500/15' : 'text-slate-400'}`}
        >
          Playground
        </button>
        <button
          onClick={() => setActiveTab('graph')}
          className={`px-2.5 py-1 rounded ${activeTab === 'graph' ? 'text-sky-400 font-bold bg-sky-500/15' : 'text-slate-400'}`}
        >
          Graph
        </button>
        <button
          onClick={() => setActiveTab('terminal')}
          className={`px-2.5 py-1 rounded ${activeTab === 'terminal' ? 'text-sky-400 font-bold bg-sky-500/15' : 'text-slate-400'}`}
        >
          CLI
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`px-2.5 py-1 rounded ${activeTab === 'docs' ? 'text-sky-400 font-bold bg-sky-500/15' : 'text-slate-400'}`}
        >
          Docs
        </button>
      </div>
    </header>
  );
};
