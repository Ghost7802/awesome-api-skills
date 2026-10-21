import React, { useState, useMemo } from 'react';
import { GraphNode, GraphEdge, RecommendedStack, LearningPath } from '../types';
import { Network, Layers, Compass, ArrowRight, Search, GitBranch } from 'lucide-react';

interface KnowledgeGraphViewProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  stacks: RecommendedStack[];
  learningPaths: LearningPath[];
  stats: any;
  onSelectSkillById: (skillId: string) => void;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({
  nodes,
  edges,
  stacks,
  learningPaths,
  stats,
  onSelectSkillById,
}) => {
  const [selectedEdgeType, setSelectedEdgeType] = useState<string>('All');
  const [edgeSearch, setEdgeSearch] = useState<string>('');

  const edgeTypes = useMemo(() => {
    const counts: Record<string, number> = {};
    edges.forEach((e) => {
      counts[e.type] = (counts[e.type] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({ type, count }));
  }, [edges]);

  const filteredEdges = useMemo(() => {
    const q = edgeSearch.toLowerCase().trim();
    return edges.filter((e) => {
      const matchType = selectedEdgeType === 'All' || e.type === selectedEdgeType;
      const matchQuery =
        !q ||
        e.source.toLowerCase().includes(q) ||
        e.target.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [edges, selectedEdgeType, edgeSearch]);

  const edgeBadgeColor = (type: string) => {
    switch (type) {
      case 'depends_on':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'integrates_with':
        return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
      case 'works_well_with':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'alternative_to':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'deploys_to':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
          <Network className="w-3.5 h-3.5" />
          <span>Relational Dependency &amp; Stack Graph</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          API Skills Knowledge Graph
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1">
          The graph connects <strong className="text-white">{nodes.length} skills</strong> with{' '}
          <strong className="text-white">{edges.length} directed relationships</strong> — prerequisites, alternatives, and verified production stacks.
        </p>
      </div>

      {/* Graph Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b]">
          <span className="text-xs font-mono uppercase text-slate-400 block">Graph Nodes</span>
          <span className="text-2xl font-mono font-black text-sky-400 mt-1 block">{nodes.length}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b]">
          <span className="text-xs font-mono uppercase text-slate-400 block">Directed Edges</span>
          <span className="text-2xl font-mono font-black text-blue-400 mt-1 block">{edges.length}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b]">
          <span className="text-xs font-mono uppercase text-slate-400 block">Avg Edges / Skill</span>
          <span className="text-2xl font-mono font-black text-emerald-400 mt-1 block">
            {stats?.averageRelationshipsPerNode || '2.17'}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-[#0f172a] border border-[#1e293b]">
          <span className="text-xs font-mono uppercase text-slate-400 block">Production Stacks</span>
          <span className="text-2xl font-mono font-black text-purple-400 mt-1 block">{stacks.length}</span>
        </div>
      </div>

      {/* Popular Production Stacks */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-sky-400" />
          <h2 className="text-xl font-bold text-white">Verified Production Stacks</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stacks.map((st, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#0f172a] border border-[#1e293b] hover:border-sky-500/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">{st.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  {st.stack.length} nodes
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {st.stack.map((nodeId, i) => (
                  <React.Fragment key={nodeId}>
                    <button
                      type="button"
                      onClick={() => onSelectSkillById(nodeId)}
                      className="px-2.5 py-1 rounded-lg font-mono text-xs font-semibold bg-[#131d33] hover:bg-sky-500/20 text-sky-300 border border-[#1e293b] hover:border-sky-400 transition-all"
                    >
                      {nodeId}
                    </button>
                    {i < st.stack.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guided Learning Paths */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">Guided Learning &amp; Agent Context Paths</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningPaths.map((lp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#0f172a] border border-[#1e293b] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{lp.name}</span>
                <span className="text-xs font-mono text-emerald-400">Step-by-step sequence</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {lp.path.map((id, stepIdx) => (
                  <React.Fragment key={id}>
                    <button
                      type="button"
                      onClick={() => onSelectSkillById(id)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#090d16] hover:bg-emerald-500/15 text-slate-200 hover:text-emerald-300 border border-[#1e293b] text-xs font-mono transition-colors"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#1e293b] text-[10px] flex items-center justify-center text-slate-400">
                        {stepIdx + 1}
                      </span>
                      <span>{id}</span>
                    </button>
                    {stepIdx < lp.path.length - 1 && (
                      <span className="text-slate-600 font-mono text-xs">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Edge Explorer */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Interactive Relationship Explorer</h2>
          </div>

          {/* Search Edges */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={edgeSearch}
              onChange={(e) => setEdgeSearch(e.target.value)}
              placeholder="Filter edges by skill (e.g. nextjs, stripe)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#0f172a] border border-[#1e293b] focus:border-sky-400 text-xs text-white outline-none"
            />
          </div>
        </div>

        {/* Edge Type Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedEdgeType('All')}
            className={`px-3 py-1 rounded-full text-xs font-mono border shrink-0 transition-all ${
              selectedEdgeType === 'All'
                ? 'bg-sky-500/15 text-sky-400 border-sky-400 font-semibold'
                : 'bg-[#0f172a] text-slate-400 border-[#1e293b] hover:text-white'
            }`}
          >
            All Relationships ({edges.length})
          </button>
          {edgeTypes.map((et) => (
            <button
              key={et.type}
              onClick={() => setSelectedEdgeType(et.type)}
              className={`px-3 py-1 rounded-full text-xs font-mono border shrink-0 transition-all ${
                selectedEdgeType === et.type
                  ? 'bg-sky-500/15 text-sky-400 border-sky-400 font-semibold'
                  : 'bg-[#0f172a] text-slate-400 border-[#1e293b] hover:text-white'
              }`}
            >
              {et.type.replace(/_/g, ' ')} ({et.count})
            </button>
          ))}
        </div>

        {/* Edges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto p-1">
          {filteredEdges.map((edge, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-[#0f172a] border border-[#1e293b] hover:border-slate-700 text-xs font-mono"
            >
              <button
                onClick={() => onSelectSkillById(edge.source)}
                className="font-bold text-white hover:text-sky-400 transition-colors truncate max-w-[110px]"
                title={edge.source}
              >
                {edge.source}
              </button>

              <span className={`px-2 py-0.5 rounded border text-[10px] shrink-0 ${edgeBadgeColor(edge.type)}`}>
                {edge.type.replace(/_/g, ' ')} →
              </span>

              <button
                onClick={() => onSelectSkillById(edge.target)}
                className="font-bold text-sky-400 hover:underline transition-colors truncate max-w-[110px] text-right"
                title={edge.target}
              >
                {edge.target}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Edge Semantics Legend Table */}
      <div className="rounded-xl bg-[#0f172a] border border-[#1e293b] overflow-hidden">
        <div className="px-5 py-3.5 bg-[#131d33] border-b border-[#1e293b] font-bold text-sm text-white">
          How to Read Graph Edges
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1e293b] text-slate-400 font-mono">
                <th className="py-3 px-4">Edge Type</th>
                <th className="py-3 px-4">Meaning</th>
                <th className="py-3 px-4">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b] text-slate-300">
              <tr>
                <td className="py-2.5 px-4 font-mono text-rose-300">depends_on</td>
                <td className="py-2.5 px-4">Install or configure the target prerequisite first</td>
                <td className="py-2.5 px-4 font-mono">cloudflare-d1 → cloudflare-workers</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono text-sky-300">integrates_with</td>
                <td className="py-2.5 px-4">Commonly paired together in production architectures</td>
                <td className="py-2.5 px-4 font-mono">vercel-ai-sdk → openai</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono text-emerald-300">works_well_with</td>
                <td className="py-2.5 px-4">Recommended complementary technology</td>
                <td className="py-2.5 px-4 font-mono">drizzle → postgresql</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono text-amber-300">alternative_to</td>
                <td className="py-2.5 px-4">Competing solution in the same category; pick one</td>
                <td className="py-2.5 px-4 font-mono">fastapi ↔ express</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
