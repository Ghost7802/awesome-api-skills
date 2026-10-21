const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../..');
const skillsDir = path.join(repoRoot, 'skills');
const outDir = path.join(repoRoot, 'src/data');

fs.mkdirSync(outDir, { recursive: true });

const skillDirs = fs.readdirSync(skillsDir)
  .filter(name => fs.statSync(path.join(skillsDir, name)).isDirectory())
  .sort();

console.log(`Found ${skillDirs.length} skills`);

const skills = skillDirs.map(id => {
  const metaPath = path.join(skillsDir, id, 'metadata.json');
  const skillMdPath = path.join(skillsDir, id, 'SKILL.md');
  
  let meta = { name: id, categories: ['Other'] };
  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    } catch (e) {
      console.error(`Error parsing ${metaPath}:`, e.message);
    }
  }

  let skillMd = '';
  if (fs.existsSync(skillMdPath)) {
    skillMd = fs.readFileSync(skillMdPath, 'utf8');
  }

  const examplesDir = path.join(skillsDir, id, 'examples');
  let examples = [];
  if (fs.existsSync(examplesDir)) {
    try {
      examples = fs.readdirSync(examplesDir).map(file => ({
        filename: file,
        content: fs.readFileSync(path.join(examplesDir, file), 'utf8')
      }));
    } catch (e) {}
  }

  const promptsDir = path.join(skillsDir, id, 'prompts');
  let prompts = [];
  if (fs.existsSync(promptsDir)) {
    try {
      prompts = fs.readdirSync(promptsDir).map(file => ({
        filename: file,
        content: fs.readFileSync(path.join(promptsDir, file), 'utf8')
      }));
    } catch (e) {}
  }

  return {
    id,
    ...meta,
    skillMd,
    examples,
    prompts
  };
});

let graph = { nodes: [], edges: [] };
try {
  graph = JSON.parse(fs.readFileSync(path.join(repoRoot, 'registry/graph.json'), 'utf8'));
} catch (e) {
  console.error('Error reading graph.json:', e.message);
}

// Ensure all skills are in graph nodes and relationships are in edges
const nodeIds = new Set(graph.nodes.map(n => n.id));
const edgeKeys = new Set(graph.edges.map(e => `${e.source}->${e.target}:${e.type}`));

for (const skill of skills) {
  if (!nodeIds.has(skill.id)) {
    graph.nodes.push({
      id: skill.id,
      label: skill.name || skill.id,
      categories: skill.categories || ['General'],
      ecosystem: skill.ecosystem || 'various'
    });
    nodeIds.add(skill.id);
  }
  if (Array.isArray(skill.relationships)) {
    for (const rel of skill.relationships) {
      const key = `${skill.id}->${rel.target}:${rel.type}`;
      if (!edgeKeys.has(key)) {
        graph.edges.push({
          source: skill.id,
          target: rel.target,
          type: rel.type
        });
        edgeKeys.add(key);
      }
    }
  }
}

const stacks = [
  { name: 'Full-stack TypeScript', stack: ['nextjs', 'prisma', 'postgresql'] },
  { name: 'Vercel AI & RAG Agent', stack: ['vercel-ai-sdk', 'openai', 'qdrant', 'nextjs'] },
  { name: 'Stateful Multi-Agent', stack: ['langgraph', 'langchain', 'anthropic', 'postgresql'] },
  { name: 'Edge Serverless SQL', stack: ['cloudflare-workers', 'cloudflare-d1', 'drizzle', 'hono'] },
  { name: 'Supabase SSR Fullstack', stack: ['supabase-ssr', 'supabase', 'nextjs', 'vercel'] },
  { name: 'Payments SaaS', stack: ['stripe', 'express', 'postgresql'] },
  { name: 'Observability Stack', stack: ['opentelemetry', 'prometheus', 'grafana'] }
];

const learningPaths = [
  { name: 'Modern React & AI Fullstack', path: ['react', 'nextjs', 'vercel-ai-sdk', 'supabase-ssr', 'vercel'] },
  { name: 'Agentic AI Workflows', path: ['openai', 'langchain', 'langgraph', 'qdrant'] },
  { name: 'Cloudflare Edge Native', path: ['hono', 'cloudflare-workers', 'cloudflare-d1', 'drizzle'] },
  { name: 'Kubernetes DevSecOps', path: ['docker', 'kubernetes', 'helm', 'argo-cd', 'prometheus', 'grafana'] }
];

const stats = {
  totalNodes: graph.nodes.length,
  totalEdges: graph.edges.length,
  edgeTypes: Array.from(new Set(graph.edges.map(e => e.type))),
  averageRelationshipsPerNode: (graph.edges.length / graph.nodes.length).toFixed(2),
  graphDensity: (graph.edges.length / (graph.nodes.length * (graph.nodes.length - 1))).toFixed(4),
  largestConnectedComponentSize: graph.nodes.length - 5,
  learningPathsCount: learningPaths.length,
  recommendationCount: stacks.length
};

const payload = {
  skills,
  graph,
  stacks,
  learningPaths,
  stats
};

fs.writeFileSync(path.join(outDir, 'skillsData.json'), JSON.stringify(payload));
console.log(`Generated skillsData.json with ${skills.length} skills and ${graph.edges.length} edges!`);
