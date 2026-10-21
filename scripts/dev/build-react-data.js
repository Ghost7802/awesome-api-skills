const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const { API_BENCHMARKS } = require('./api-benchmarks-catalog');

const repoRoot = path.resolve(__dirname, '../..');
const skillsDir = path.join(repoRoot, 'skills');
const outDir = path.join(repoRoot, 'src/data');

fs.mkdirSync(outDir, { recursive: true });

const t0 = performance.now();

const skillDirs = fs
  .readdirSync(skillsDir)
  .filter((name) => fs.statSync(path.join(skillsDir, name)).isDirectory())
  .sort();

console.log(`Found ${skillDirs.length} skills`);

let graph = { nodes: [], edges: [] };
try {
  graph = JSON.parse(fs.readFileSync(path.join(repoRoot, 'registry/graph.json'), 'utf8'));
} catch (e) {
  console.error('Error reading graph.json:', e.message);
}

/**
 * Extract bullet items under a Markdown section header
 */
function extractMarkdownListSection(md, headerRegex) {
  const match = md.match(headerRegex);
  if (!match) return [];
  const startIdx = match.index + match[0].length;
  const rest = md.slice(startIdx);
  const nextHeader = rest.search(/^##\s+/m);
  const block = nextHeader !== -1 ? rest.slice(0, nextHeader) : rest;
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- ') || line.startsWith('* '))
    .map((line) =>
      line
        .replace(/^[-*]\s+(\[[ xX]\]\s+)?/, '')
        .replace(/\*\*/g, '')
        .trim(),
    )
    .filter(Boolean);
}

/**
 * Clean synthetic score blocks or outdated relationship placeholders from SKILL.md
 */
function cleanSkillMarkdown(md, id, rels) {
  let cleaned = md.replace(
    /## Recommended Next Skills\n\n(?:- \*\*\[[^\]]+\]\([^)]+\)\*\* \(Score: [0-9.]+\)\n\s+\*Why: [^\n]+\*\n?)+\n*/g,
    '',
  );
  if (cleaned.includes('No graph relationships yet') && rels.length > 0) {
    const relLines = rels
      .map((r) => `- [\`${r.target}\`](../${r.target}/SKILL.md) — ${r.type.replace(/_/g, ' ')}`)
      .join('\n');
    cleaned = cleaned.replace(
      /- No graph relationships yet — see the knowledge graph in the docs site\./g,
      relLines,
    );
  }
  return cleaned;
}

// Pre-index edges from registry/graph.json
const nodeIds = new Set(graph.nodes.map((n) => n.id));
const edgeKeys = new Set();
const dedupedEdges = [];

for (const e of graph.edges) {
  const key = `${e.source}->${e.target}:${e.type}`;
  if (!edgeKeys.has(key)) {
    edgeKeys.add(key);
    dedupedEdges.push(e);
  }
}
graph.edges = dedupedEdges;

let totalSkillMdBytes = 0;
let totalMetadataBytes = 0;
let totalContextTokens = 0;
let totalValidationMs = 0;

const skills = skillDirs.map((id) => {
  const skillStart = performance.now();
  const metaPath = path.join(skillsDir, id, 'metadata.json');
  const skillMdPath = path.join(skillsDir, id, 'SKILL.md');

  let meta = { name: id, categories: ['Other'] };
  let metadataBytes = 0;
  if (fs.existsSync(metaPath)) {
    try {
      const rawMeta = fs.readFileSync(metaPath, 'utf8');
      metadataBytes = Buffer.byteLength(rawMeta, 'utf8');
      totalMetadataBytes += metadataBytes;
      meta = JSON.parse(rawMeta);
    } catch (e) {
      console.error(`Error parsing ${metaPath}:`, e.message);
    }
  }

  let skillMd = '';
  let skillMdBytes = 0;
  if (fs.existsSync(skillMdPath)) {
    skillMd = fs.readFileSync(skillMdPath, 'utf8');
    skillMdBytes = Buffer.byteLength(skillMd, 'utf8');
    totalSkillMdBytes += skillMdBytes;
  }

  // Filter out stub/dummy example files so only real runnable code examples are included
  const examplesDir = path.join(skillsDir, id, 'examples');
  let examples = [];
  if (fs.existsSync(examplesDir)) {
    try {
      examples = fs
        .readdirSync(examplesDir)
        .map((file) => ({
          filename: file,
          content: fs.readFileSync(path.join(examplesDir, file), 'utf8'),
        }))
        .filter((ex) => {
          const trimmed = ex.content.trim();
          if (trimmed.startsWith("console.log('Initialize ") && trimmed.length < 60) return false;
          if (trimmed.startsWith('//') && !trimmed.includes('\n')) return false;
          if (ex.filename.startsWith('not-applicable.')) return false;
          return true;
        });
    } catch (e) {}
  }

  // Filter out generic 1-line placeholder system.md prompts
  const promptsDir = path.join(skillsDir, id, 'prompts');
  let prompts = [];
  if (fs.existsSync(promptsDir)) {
    try {
      prompts = fs
        .readdirSync(promptsDir)
        .map((file) => ({
          filename: file,
          content: fs.readFileSync(path.join(promptsDir, file), 'utf8'),
        }))
        .filter((pr) => {
          const trimmed = pr.content.trim();
          if (trimmed.startsWith('You are an expert at using ') && trimmed.length < 65) return false;
          return true;
        });
    } catch (e) {}
  }

  const measuredParseMs = Number((performance.now() - skillStart).toFixed(3));

  // Measure structural & schema validation time for this skill
  const valStart = performance.now();
  const extractedPitfalls =
    Array.isArray(meta.pitfalls) && meta.pitfalls.length > 0
      ? meta.pitfalls
      : extractMarkdownListSection(skillMd, /^##\s+AI [pP]itfalls\s*$/m);

  const extractedChecklist =
    Array.isArray(meta.checklist) && meta.checklist.length > 0
      ? meta.checklist
      : extractMarkdownListSection(skillMd, /^##\s+Production [cC]hecklist\s*$/m);

  // Gather all directed relationships from metadata + graph.json
  const explicitOutRels = Array.isArray(meta.relationships) ? meta.relationships : [];
  const relMap = new Map();
  for (const r of explicitOutRels) {
    relMap.set(`${r.target}:${r.type}`, { target: r.target, type: r.type });
  }
  for (const e of graph.edges) {
    if (e.source === id) {
      relMap.set(`${e.target}:${e.type}`, { target: e.target, type: e.type });
    }
  }
  if (relMap.size === 0) {
    for (const e of graph.edges) {
      if (e.target === id) {
        relMap.set(`${e.source}:${e.type}`, { target: e.source, type: e.type });
      }
    }
  }
  const relationships = Array.from(relMap.values());

  const cleanedMd = cleanSkillMarkdown(skillMd, id, relationships);
  const wordCount = cleanedMd.split(/\s+/).filter(Boolean).length;
  const estimatedContextTokens = Math.ceil(wordCount * 1.33);
  totalContextTokens += estimatedContextTokens;

  const measuredValidationMs = Number((performance.now() - valStart).toFixed(3));
  totalValidationMs += measuredValidationMs;

  return {
    id,
    ...meta,
    pitfalls: extractedPitfalls,
    checklist: extractedChecklist,
    relationships,
    _explicitOutRels: explicitOutRels,
    skillMd: cleanedMd,
    examples,
    prompts,
    _rawMetrics: {
      measuredParseMs,
      measuredValidationMs,
      skillMdBytes,
      metadataBytes,
      estimatedContextTokens,
      examplesCount: examples.length,
    },
  };
});

// Ensure all skill nodes and explicit outgoing relationships exist in graph
for (const skill of skills) {
  if (!nodeIds.has(skill.id)) {
    graph.nodes.push({
      id: skill.id,
      label: skill.name || skill.id,
      categories: skill.categories || ['General'],
      ecosystem: skill.ecosystem || 'various',
    });
    nodeIds.add(skill.id);
  }
  if (Array.isArray(skill._explicitOutRels)) {
    for (const rel of skill._explicitOutRels) {
      const key = `${skill.id}->${rel.target}:${rel.type}`;
      if (!edgeKeys.has(key)) {
        graph.edges.push({
          source: skill.id,
          target: rel.target,
          type: rel.type,
        });
        edgeKeys.add(key);
      }
    }
  }
  delete skill._explicitOutRels;
}

// Compute exact in-degree, out-degree, and undirected connected components via BFS
const graphStart = performance.now();
const inDegree = {};
const outDegree = {};
const adjList = {};

for (const n of graph.nodes) {
  inDegree[n.id] = 0;
  outDegree[n.id] = 0;
  adjList[n.id] = new Set();
}

for (const e of graph.edges) {
  if (outDegree[e.source] !== undefined) outDegree[e.source]++;
  if (inDegree[e.target] !== undefined) inDegree[e.target]++;
  if (adjList[e.source] && adjList[e.target]) {
    adjList[e.source].add(e.target);
    adjList[e.target].add(e.source);
  }
}

let largestConnectedComponentSize = 0;
let connectedComponentsCount = 0;
let isolatedNodesCount = 0;
const visited = new Set();

for (const n of graph.nodes) {
  const deg = (inDegree[n.id] || 0) + (outDegree[n.id] || 0);
  if (deg === 0) isolatedNodesCount++;

  if (!visited.has(n.id)) {
    connectedComponentsCount++;
    let componentSize = 0;
    const queue = [n.id];
    visited.add(n.id);
    while (queue.length > 0) {
      const curr = queue.shift();
      componentSize++;
      for (const neighbor of adjList[curr] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    if (componentSize > largestConnectedComponentSize) {
      largestConnectedComponentSize = componentSize;
    }
  }
}
const measuredGraphTraversalMs = Number((performance.now() - graphStart).toFixed(3));

// Attach verified API benchmarks + measured repository metrics to every skill
for (const skill of skills) {
  const apiBench = API_BENCHMARKS[skill.id];
  const raw = skill._rawMetrics;
  delete skill._rawMetrics;

  const outDeg = outDegree[skill.id] || 0;
  const inDeg = inDegree[skill.id] || 0;

  skill.benchmarks = {
    p50LatencyMs: apiBench.p50LatencyMs,
    p99LatencyMs: apiBench.p99LatencyMs,
    throughput: apiBench.throughput,
    rateLimit: apiBench.rateLimit,
    slaUptime: apiBench.slaUptime,
    protocol: apiBench.protocol,
    benchmarkWorkload: apiBench.benchmarkWorkload,
    benchmarkSource: apiBench.benchmarkSource,
    measuredParseMs: raw.measuredParseMs,
    measuredValidationMs: raw.measuredValidationMs,
    skillMdBytes: raw.skillMdBytes,
    metadataBytes: raw.metadataBytes,
    estimatedContextTokens: raw.estimatedContextTokens,
    graphOutDegree: outDeg,
    graphInDegree: inDeg,
    totalGraphDegree: outDeg + inDeg,
    examplesCount: raw.examplesCount,
  };
}

const loadTimeMs = Number((performance.now() - t0).toFixed(2));

// Measure real search latency across all skills across 8 benchmark queries
const searchStart = performance.now();
const benchmarkQueries = ['ai', 'stripe', 'postgres', 'auth', 'vector', 'redis', 'edge', 'webhook'];
let totalQueryMatches = 0;
for (const q of benchmarkQueries) {
  const matches = skills.filter(
    (s) =>
      s.id.includes(q) ||
      (s.description || '').toLowerCase().includes(q) ||
      (s.categories || []).some((c) => c.toLowerCase().includes(q)),
  );
  totalQueryMatches += matches.length;
}
const searchSuiteMs = Number((performance.now() - searchStart).toFixed(3));
const searchLatencyMs = Number((searchSuiteMs / benchmarkQueries.length).toFixed(3));

const aiMatches = skills.filter(
  (s) => s.id.includes('ai') || (s.categories || []).some((c) => c.toLowerCase().includes('ai')),
);

// Compute verified API latency statistics across the catalog
const p50Values = skills.map((s) => s.benchmarks.p50LatencyMs).sort((a, b) => a - b);
const medianApiP50LatencyMs = p50Values[Math.floor(p50Values.length / 2)];
const averageApiP50LatencyMs = Number(
  (p50Values.reduce((acc, v) => acc + v, 0) / p50Values.length).toFixed(2),
);

const stacks = [
  { name: 'Full-stack TypeScript', stack: ['nextjs', 'prisma', 'postgresql', 'zod'] },
  { name: 'Vercel AI & RAG Agent', stack: ['vercel-ai-sdk', 'openai', 'qdrant', 'nextjs'] },
  { name: 'Model Context Protocol (MCP)', stack: ['anthropic-mcp', 'anthropic', 'zod'] },
  { name: 'Stateful Multi-Agent', stack: ['langgraph', 'langchain', 'anthropic', 'postgresql'] },
  { name: 'Edge Serverless SQL', stack: ['cloudflare-workers', 'cloudflare-d1', 'drizzle', 'hono'] },
  { name: 'Supabase SSR Fullstack', stack: ['supabase-ssr', 'supabase', 'nextjs', 'vercel'] },
  { name: 'Payments & Developer Billing', stack: ['stripe', 'polar', 'express', 'postgresql'] },
  { name: 'Edge Rate Limiting & Auth', stack: ['upstash-ratelimit', 'upstash', 'clerk', 'nextjs'] },
  { name: 'Observability Stack', stack: ['opentelemetry', 'prometheus', 'grafana'] },
];

const learningPaths = [
  {
    name: 'Modern React & AI Fullstack',
    path: ['react', 'nextjs', 'zod', 'vercel-ai-sdk', 'supabase-ssr', 'vercel'],
  },
  {
    name: 'Agentic AI & MCP Servers',
    path: ['openai', 'anthropic-mcp', 'langchain', 'langgraph', 'qdrant'],
  },
  {
    name: 'Cloudflare Edge Native',
    path: ['hono', 'cloudflare-workers', 'cloudflare-d1', 'drizzle'],
  },
  {
    name: 'Kubernetes DevSecOps',
    path: ['docker', 'kubernetes', 'helm', 'argo-cd', 'prometheus', 'grafana'],
  },
];

const stats = {
  totalNodes: graph.nodes.length,
  totalEdges: graph.edges.length,
  edgeTypes: Array.from(new Set(graph.edges.map((e) => e.type))),
  averageRelationshipsPerNode: (graph.edges.length / graph.nodes.length).toFixed(2),
  graphDensity: (graph.edges.length / (graph.nodes.length * (graph.nodes.length - 1))).toFixed(4),
  largestConnectedComponentSize,
  connectedComponentsCount,
  isolatedNodesCount,
  learningPathsCount: learningPaths.length,
  recommendationCount: stacks.length,
  measuredLoadMs: loadTimeMs,
  measuredValidationMs: Number(totalValidationMs.toFixed(2)),
  measuredGraphTraversalMs,
  measuredSearchMs: searchLatencyMs,
  measuredSearchSuiteMs: searchSuiteMs,
  measuredSearchQueriesCount: benchmarkQueries.length,
  measuredSearchMatchesCount: totalQueryMatches,
  parseThroughputSkillsPerSec: Math.round(skills.length / (loadTimeMs / 1000)),
  totalSkillMdBytes,
  totalMetadataBytes,
  totalContextTokens,
  averageContextTokensPerSkill: Math.round(totalContextTokens / skills.length),
  medianApiP50LatencyMs,
  averageApiP50LatencyMs,
  measuredAiSkillsCount: aiMatches.length,
  auditDate: '2026-10-21',
};

const payload = {
  skills,
  graph,
  stacks,
  learningPaths,
  stats,
};

fs.writeFileSync(path.join(outDir, 'skillsData.json'), JSON.stringify(payload));
console.log(
  `Generated skillsData.json: ${skills.length} skills, ${graph.edges.length} edges, LCC=${largestConnectedComponentSize}/${graph.nodes.length}, isolated=${isolatedNodesCount}, load=${loadTimeMs}ms, search=${searchLatencyMs}ms`,
);
