import React from 'react';
import { Compass, Sparkles, Network, Terminal, ShieldAlert, CheckCircle2, Bot, ArrowRight, Zap, Copy, Check } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  skillCount: number;
  edgeCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, skillCount, edgeCount }) => {
  const [copiedCmd, setCopiedCmd] = React.useState(false);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 overflow-hidden text-center">
        {/* Ambient radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>The Deterministic API Standard for AI Coding Agents</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Stop Guessing APIs.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">
              Skills Your Agent Can Trust.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            <strong className="text-white font-semibold">{skillCount} verified, structured SKILL.md specifications</strong>{' '}
            with anti-hallucination pitfalls, production checklists, and an interconnected knowledge graph for Claude Code, Cursor, Cline &amp; Continue.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('catalog')}
              className="px-6 py-3 rounded-lg font-semibold text-sm bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Browse {skillCount} Skills
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('playground')}
              className="px-6 py-3 rounded-lg font-semibold text-sm bg-[#0f172a] hover:bg-[#131d33] text-white border border-[#1e293b] hover:border-sky-500/40 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              Skill Studio Playground
            </button>
            <button
              type="button"
              onClick={() => onNavigate('graph')}
              className="px-6 py-3 rounded-lg font-semibold text-sm bg-[#0f172a] hover:bg-[#131d33] text-slate-300 hover:text-white border border-[#1e293b] hover:border-sky-500/40 transition-all flex items-center gap-2"
            >
              <Network className="w-4 h-4 text-slate-400" />
              Knowledge Graph
            </button>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-xl bg-[#0f172a] border border-[#1e293b] shadow-xl">
          <div className="flex flex-col items-center justify-center text-center p-2">
            <span className="font-mono text-3xl font-extrabold text-sky-400">{skillCount}</span>
            <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 font-medium">Verified Skills</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-2 border-l border-[#1e293b]">
            <span className="font-mono text-3xl font-extrabold text-blue-400">{edgeCount}</span>
            <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 font-medium">Graph Edges</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-2 border-l-0 md:border-l border-[#1e293b]">
            <span className="font-mono text-3xl font-extrabold text-emerald-400">100%</span>
            <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 font-medium">Schema Validated</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-2 border-l border-[#1e293b]">
            <span className="font-mono text-3xl font-extrabold text-purple-400">&lt; 16ms</span>
            <span className="text-xs uppercase tracking-wider text-slate-400 mt-1 font-medium">Lookup Latency</span>
          </div>
        </div>
      </section>

      {/* Terminal Showcase */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="rounded-xl overflow-hidden border border-[#1e293b] bg-[#060a12] shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1424] border-b border-[#1e293b]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 font-mono text-xs text-slate-400">bash — npx @awesome-api-skills/cli</span>
            </div>
            <button
              onClick={() => copyCommand('npx @awesome-api-skills/cli search "vector embeddings rag"')}
              className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-[#1e293b]/50 hover:bg-[#1e293b]"
            >
              {copiedCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCmd ? 'Copied' : 'Copy command'}</span>
            </button>
          </div>
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-sky-400 font-bold">$</span>
              <span>npx @awesome-api-skills/cli search "vector embeddings rag"</span>
            </div>
            <div className="text-emerald-400 font-semibold pl-4">
              ✔ Found 6 matching production skills:
            </div>
            <div className="pl-6 text-slate-300 space-y-1">
              <div>• <span className="text-sky-300 font-bold">qdrant</span> (v1.0.0) — Vector similarity search engine &amp; RAG pipelines</div>
              <div>• <span className="text-sky-300 font-bold">deepseek</span> (v1.0.0) — DeepSeek-R1 reasoning &amp; DeepSeek-V3 models</div>
              <div>• <span className="text-sky-300 font-bold">openai</span> (v1.0.0) — Text embeddings &amp; structured responses</div>
              <div>• <span className="text-sky-300 font-bold">weaviate</span> (v1.0.0) — Hybrid keyword + vector generative search</div>
            </div>
            <div className="flex items-center gap-2 text-slate-300 pt-2">
              <span className="text-sky-400 font-bold">$</span>
              <span>npx @awesome-api-skills/cli validate</span>
            </div>
            <div className="text-emerald-400 font-semibold pl-4">
              ✔ Skill Schema Validation — {skillCount} skills checked. All conform to SKILL.md v1.0.
            </div>
          </div>
        </div>
      </section>

      {/* Triad Feature Cards */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#0f172a] border border-[#1e293b] hover:border-sky-500/40 transition-all shadow-lg hover:shadow-sky-500/5 group">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Anti-Hallucination Pitfalls</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Explicitly documents vendor-specific traps: deprecated methods, unbuffered raw body webhook signatures, and missing initialization headers.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0f172a] border border-[#1e293b] hover:border-sky-500/40 transition-all shadow-lg hover:shadow-sky-500/5 group">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Relational Knowledge Graph</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Interconnects all {skillCount} skills across {edgeCount} directed edges mapping prerequisite dependencies, alternatives, and production stacks.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#0f172a] border border-[#1e293b] hover:border-sky-500/40 transition-all shadow-lg hover:shadow-sky-500/5 group">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Multi-Agent Compatibility</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Zero vendor lock-in. SKILL.md files are instantly ingested by Claude Code, Cursor, Cline, Continue, and custom AI CLI pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#090d16] border border-[#1e293b]">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to empower your AI coding agent?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-6">
            Stop debugging hallucinated SDK methods. Explore 116 verified specifications tested against production API documentation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('catalog')}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-sky-500 hover:bg-sky-400 text-white transition-colors"
            >
              Explore Skills Catalog →
            </button>
            <button
              onClick={() => onNavigate('playground')}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#1e293b] hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Test in Skill Studio
            </button>
            <button
              onClick={() => onNavigate('terminal')}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#1e293b] hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Run Interactive CLI
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
