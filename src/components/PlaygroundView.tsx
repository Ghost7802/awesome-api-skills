import React, { useState, useMemo } from 'react';
import { Diagnostic } from '../types';
import { Sparkles, Check, Copy, AlertCircle, CheckCircle2, FileCode, Database, Search } from 'lucide-react';

const PRESETS: Record<string, { label: string; data: Record<string, any> }> = {
  stripe: {
    label: 'Stripe (Payments)',
    data: {
      name: 'stripe',
      version: '1.0.0',
      description: 'Financial infrastructure platform for online payments, billing, and webhooks.',
      categories: ['Payments', 'Commerce'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: { 'API Reference': 'https://stripe.com/docs/api' },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://stripe.com/docs/api',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Missing raw body buffer on webhook endpoints causes cryptographic signature verification failures',
        'Failing to pass idempotency keys on payment intent creation during network retries',
        'Storing Stripe API secret keys in client-side bundles instead of server-side environment variables',
      ],
      checklist: [
        'Webhook endpoint uses express.raw({ type: "application/json" })',
        'STRIPE_WEBHOOK_SECRET and STRIPE_SECRET_KEY are loaded via environment variables',
        'All payment intents specify an explicit currency code and integer amount in cents',
      ],
    },
  },
  'vercel-ai-sdk': {
    label: 'Vercel AI SDK (v4+)',
    data: {
      name: 'vercel-ai-sdk',
      version: '1.0.0',
      description: 'TypeScript toolkit for building AI applications with streamText, generateObject, and multi-provider routing.',
      categories: ['AI', 'Developer Tools'],
      languages: ['typescript'],
      author: 'Awesome API Skills Team',
      license: 'Apache-2.0',
      links: { 'API Reference': 'https://sdk.vercel.ai/docs' },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-10-21',
      documentationSource: 'https://sdk.vercel.ai/docs',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-10-21',
      pitfalls: [
        'Using deprecated OpenAIStream and StreamingTextResponse from AI SDK v2/v3 instead of streamText() and result.toDataStreamResponse()',
        'Passing raw JSON strings instead of Zod schemas to generateObject() or tool parameters',
        'Calling provider SDKs directly in client components instead of server route handlers',
      ],
      checklist: [
        'Using ai v4+ core primitives (generateText, streamText, generateObject)',
        'Provider packages (@ai-sdk/openai, @ai-sdk/anthropic) installed separately',
        'Streaming endpoints return result.toDataStreamResponse()',
      ],
    },
  },
  langgraph: {
    label: 'LangGraph (Agent Workflows)',
    data: {
      name: 'langgraph',
      version: '1.0.0',
      description: 'Stateful, multi-actor agent orchestration framework with cycles, persistence, and human-in-the-loop control.',
      categories: ['AI', 'Workflows', 'Developer Tools'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: { 'API Reference': 'https://langchain-ai.github.io/langgraph/' },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-10-21',
      documentationSource: 'https://langchain-ai.github.io/langgraph/',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-10-21',
      pitfalls: [
        'Mutating graph state in-place inside node functions instead of returning partial state updates',
        'Creating cyclic edges without a conditional termination branch to END',
        'Omitting thread_id inside configurable options when invoking a graph compiled with a checkpointer',
      ],
      checklist: [
        'State schema defined via Annotation.Root (TS) or TypedDict with Annotated reducers (Python)',
        'Conditional edges explicitly map terminal conditions to END',
        'Checkpointer configured with thread_id for multi-turn memory',
      ],
    },
  },
  'cloudflare-d1': {
    label: 'Cloudflare D1 (Edge SQL)',
    data: {
      name: 'cloudflare-d1',
      version: '1.0.0',
      description: "Cloudflare's native serverless SQLite edge database with read replication and batch transactions.",
      categories: ['Databases', 'Cloud', 'Serverless'],
      languages: ['typescript', 'sql'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: { 'API Reference': 'https://developers.cloudflare.com/d1/' },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-10-21',
      documentationSource: 'https://developers.cloudflare.com/d1/',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-10-21',
      pitfalls: [
        'Using string interpolation in env.DB.prepare() instead of parameterized .bind() calls',
        'Attempting interactive BEGIN TRANSACTION SQL statements instead of using env.DB.batch([...])',
        'Forgetting to bind d1_databases in wrangler.toml',
      ],
      checklist: [
        'All user inputs bound via env.DB.prepare(sql).bind(...params)',
        'Multi-statement atomic transactions executed via env.DB.batch([...])',
        'wrangler.toml includes [[d1_databases]] binding and database_id',
      ],
    },
  },
  supabase: {
    label: 'Supabase (Database & Auth)',
    data: {
      name: 'supabase',
      version: '1.0.0',
      description: 'Open source Firebase alternative providing Postgres database, Auth, and Storage.',
      categories: ['Databases', 'Authentication', 'Storage'],
      languages: ['typescript', 'python', 'sql'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: { 'API Reference': 'https://supabase.com/docs/reference/javascript/introduction' },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://supabase.com/docs/reference/javascript/introduction',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Querying Postgres tables without enabling Row-Level Security (RLS) exposes all user rows',
        'Using the service_role key in browser-accessible client code instead of anon key',
        'Connecting directly without Supavisor transaction pooler in serverless environments',
      ],
      checklist: [
        'RLS policies are enabled and verified with auth.uid() checks on every public table',
        'Serverless functions connect through port 6543 (transaction pooling)',
        'Client-side calls use createBrowserClient with public anon key',
      ],
    },
  },
  openai: {
    label: 'OpenAI (LLM & Embeddings)',
    data: {
      name: 'openai',
      version: '1.0.0',
      description: 'Frontier AI models for natural language generation, reasoning, embeddings, and vision.',
      categories: ['AI', 'Machine Learning'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: { 'API Reference': 'https://platform.openai.com/docs/api-reference' },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://platform.openai.com/docs/api-reference',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Using legacy chat completion models instead of modern structured outputs (response_format)',
        'Neglecting to attach AbortController signals to streaming requests when users cancel',
        'Exposing OPENAI_API_KEY in client bundles rather than proxying through secure server routes',
      ],
      checklist: [
        'Responses use zod or JSON schema validation with response_format: { type: "json_object" }',
        'Streaming chunk readers handle [DONE] and stream abort cancellations cleanly',
        'API requests run on Node.js/Edge runtime behind authenticated backend routes',
      ],
    },
  },
  deepseek: {
    label: 'DeepSeek (R1 Reasoning & V3)',
    data: {
      name: 'deepseek',
      version: '1.0.0',
      description: 'DeepSeek frontier reasoning (R1) and general chat (V3) models with OpenAI-compatible API endpoints.',
      categories: ['AI', 'Machine Learning'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: { 'API Reference': 'https://platform.deepseek.com/api-docs' },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://platform.deepseek.com/api-docs',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Omitting baseURL: "https://api.deepseek.com" when using the standard openai SDK client',
        'Confusing reasoning model "deepseek-reasoner" (which includes reasoning_content) with "deepseek-chat"',
        'Setting temperature too high on deepseek-reasoner (recommended: 0.6 or default)',
      ],
      checklist: [
        'Client sets baseURL: "https://api.deepseek.com"',
        'DEEPSEEK_API_KEY loaded securely in server environment variables',
        'Streaming handler separates delta.reasoning_content from delta.content on deepseek-reasoner',
      ],
    },
  },
  qdrant: {
    label: 'Qdrant (Vector DB & RAG)',
    data: {
      name: 'qdrant',
      version: '1.0.0',
      description: 'Vector similarity search engine and database for production AI embeddings and RAG pipelines.',
      categories: ['AI', 'Databases', 'Search'],
      languages: ['typescript', 'python', 'rust'],
      author: 'Awesome API Skills Team',
      license: 'Apache-2.0',
      links: { 'API Reference': 'https://qdrant.tech/documentation/' },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://qdrant.tech/documentation/',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Inserting vector dimensions that mismatch collection vector parameters (e.g., 1536 vs 3072)',
        'Forgetting to create payload indexes on filter fields before running large filtered searches',
        'Passing integer IDs as strings or UUIDs when collection expects a specific ID format',
      ],
      checklist: [
        'Collection vector size matches the exact embedding model output dimensions',
        'Payload fields used in filter queries are indexed with createPayloadIndex',
        'QDRANT_URL and QDRANT_API_KEY are configured in server-side environment variables',
      ],
    },
  },
  clerk: {
    label: 'Clerk (Authentication)',
    data: {
      name: 'clerk',
      version: '1.0.0',
      description: 'Comprehensive authentication, user management, and session middleware for modern web frameworks.',
      categories: ['Authentication', 'Security'],
      languages: ['typescript'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: { 'API Reference': 'https://clerk.com/docs' },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://clerk.com/docs',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Using legacy authMiddleware() from @clerk/nextjs instead of clerkMiddleware() in v5+',
        'Missing createRouteMatcher() resulting in unprotected API routes',
        'Accessing auth().userId on client components without checking isLoaded state',
      ],
      checklist: [
        'middleware.ts implements clerkMiddleware() and createRouteMatcher()',
        'Public routes (e.g., /, /sign-in, /sign-up) are explicitly excluded from protection',
        'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY are set',
      ],
    },
  },
  inngest: {
    label: 'Inngest (Durable Workflows)',
    data: {
      name: 'inngest',
      version: '1.0.0',
      description: 'Event-driven durable execution engine for background jobs, workflows, and step functions without queues.',
      categories: ['Developer Tools', 'Serverless', 'Workflows'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'Apache-2.0',
      links: { 'API Reference': 'https://www.inngest.com/docs' },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://www.inngest.com/docs',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Executing non-deterministic operations (e.g. Math.random(), Date.now()) outside step.run() blocks',
        'Not returning serializable JSON data from step.run() calls',
        'Forgetting to export serve() handler from the API route (e.g., /api/inngest)',
      ],
      checklist: [
        'API handler exposed at /api/inngest with serve({ client: inngest, functions: [...] })',
        'All side-effects and external API calls wrapped in step.run()',
        'INNGEST_SIGNING_KEY and INNGEST_EVENT_KEY set in production',
      ],
    },
  },
};

export const PlaygroundView: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>('stripe');
  const [metadataText, setMetadataText] = useState<string>(() =>
    JSON.stringify(PRESETS.stripe.data, null, 2)
  );
  const [activeTab, setActiveTab] = useState<'validator' | 'docs' | 'registry' | 'search'>('validator');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedTarget, setCopiedTarget] = useState<string>('');

  const loadPreset = (key: string) => {
    setSelectedPreset(key);
    if (PRESETS[key]) {
      setMetadataText(JSON.stringify(PRESETS[key].data, null, 2));
    } else {
      const today = new Date().toISOString().split('T')[0];
      setMetadataText(
        JSON.stringify(
          {
            name: 'custom-skill',
            version: '1.0.0',
            description: 'A custom verified API skill specification.',
            categories: ['Developer Tools'],
            languages: ['typescript'],
            author: 'Skill Author',
            license: 'MIT',
            links: { 'API Reference': 'https://example.com/docs' },
            schemaVersion: '1.0.0',
            validationStatus: 'validated',
            maintainer: 'Skill Author',
            lastUpdated: today,
            documentationSource: 'https://example.com/docs',
            supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
            compatibility: 'SKILL.md v1.0',
            lastVerified: today,
            pitfalls: ['Document common agent hallucination patterns here'],
            checklist: ['Step 1 verification check', 'Step 2 verification check'],
          },
          null,
          2
        )
      );
    }
  };

  const { parsedMetadata, jsonParseError } = useMemo(() => {
    try {
      return { parsedMetadata: JSON.parse(metadataText), jsonParseError: null };
    } catch (e: any) {
      return { parsedMetadata: null, jsonParseError: e?.message || 'Invalid JSON' };
    }
  }, [metadataText]);

  const validationDiagnostics = useMemo<Diagnostic[]>(() => {
    if (jsonParseError) {
      return [
        {
          rule: 'V-001',
          category: 'Syntax',
          severity: 'error',
          message: `JSON Syntax Error: ${jsonParseError}`,
          suggestion: 'Fix syntax error in metadata JSON editor.',
        },
      ];
    }

    const m = parsedMetadata;
    if (!m) return [];

    const diagnostics: Diagnostic[] = [];

    // V-001: Required Core Fields
    if (!m.name || typeof m.name !== 'string') {
      diagnostics.push({
        rule: 'V-001',
        category: 'Metadata Presence',
        severity: 'error',
        message: 'Field "name" is missing or not a string.',
        suggestion: 'Add "name": "<skill-slug>" to metadata.json.',
      });
    } else if (!/^[a-z0-9-]+$/.test(m.name)) {
      diagnostics.push({
        rule: 'V-001',
        category: 'Identifier Format',
        severity: 'error',
        message: `Skill name "${m.name}" must be kebab-case (lowercase letters, numbers, and hyphens).`,
        suggestion: 'Format the name like "aws-s3" or "stripe".',
      });
    }

    // V-002: Version validation
    if (!m.version) {
      diagnostics.push({
        rule: 'V-002',
        category: 'Versioning',
        severity: 'error',
        message: 'Field "version" is missing.',
        suggestion: 'Add "version": "1.0.0" following semantic versioning.',
      });
    } else if (!/^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/.test(m.version)) {
      diagnostics.push({
        rule: 'V-002',
        category: 'Versioning',
        severity: 'error',
        message: `Version "${m.version}" does not follow semantic versioning (e.g., 1.0.0).`,
        suggestion: 'Use a semver string like "1.0.0".',
      });
    }

    // V-003: Description length
    if (!m.description || m.description.length < 10) {
      diagnostics.push({
        rule: 'V-003',
        category: 'Content Completeness',
        severity: 'warning',
        message: 'Description should be descriptive (at least 10 characters).',
        suggestion: 'Provide a clear summary of what the API skill enables.',
      });
    }

    // V-004: Categories array
    if (!Array.isArray(m.categories) || m.categories.length === 0) {
      diagnostics.push({
        rule: 'V-004',
        category: 'Classification',
        severity: 'error',
        message: 'Field "categories" must be a non-empty array of strings.',
        suggestion: 'Add categories such as ["Payments", "Commerce"].',
      });
    }

    // V-005: Agent Compatibility
    const validAgents = ['cursor', 'claude-code', 'cline', 'continue', 'codex', 'gemini-cli'];
    if (!Array.isArray(m.supportedAgents) || m.supportedAgents.length === 0) {
      diagnostics.push({
        rule: 'V-005',
        category: 'Agent Compatibility',
        severity: 'warning',
        message: 'Field "supportedAgents" is missing or empty.',
        suggestion: 'Add supported agents, e.g., ["cursor", "claude-code", "cline", "continue"].',
      });
    } else {
      const unknown = m.supportedAgents.filter((a: string) => !validAgents.includes(a));
      if (unknown.length > 0) {
        diagnostics.push({
          rule: 'V-005',
          category: 'Agent Compatibility',
          severity: 'warning',
          message: `Unrecognized agent identifier(s): ${unknown.join(', ')}.`,
          suggestion: `Standard supported agents: ${validAgents.join(', ')}.`,
        });
      }
    }

    // V-006: Freshness & Trust Verification
    if (!m.lastVerified) {
      diagnostics.push({
        rule: 'V-006',
        category: 'Trust & Freshness',
        severity: 'warning',
        message: 'Missing "lastVerified" audit timestamp.',
        suggestion: 'Add "lastVerified": "YYYY-MM-DD" to certify verification freshness.',
      });
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(m.lastVerified)) {
      diagnostics.push({
        rule: 'V-006',
        category: 'Trust & Freshness',
        severity: 'warning',
        message: `Invalid "lastVerified" format "${m.lastVerified}". Expected ISO date YYYY-MM-DD.`,
        suggestion: 'Format date as YYYY-MM-DD (e.g., 2026-07-03).',
      });
    }

    // V-007: Documentation URL
    if (m.documentationSource && !/^https?:\/\//.test(m.documentationSource)) {
      diagnostics.push({
        rule: 'V-007',
        category: 'Documentation Link',
        severity: 'error',
        message: '"documentationSource" must be a valid HTTP or HTTPS URL.',
        suggestion: 'Specify a valid link to official documentation.',
      });
    }

    // V-008: AI Pitfalls & Checklist Check
    if (!Array.isArray(m.pitfalls) || m.pitfalls.length === 0) {
      diagnostics.push({
        rule: 'V-008',
        category: 'AI Guidance',
        severity: 'warning',
        message: 'No "pitfalls" array defined. Skills should document common LLM hallucinations.',
        suggestion: 'Include 2-3 specific traps that AI models make when implementing this API.',
      });
    }

    return diagnostics;
  }, [parsedMetadata, jsonParseError]);

  const errorCount = validationDiagnostics.filter((d) => d.severity === 'error').length;
  const isFullyValid = !jsonParseError && errorCount === 0;

  const generatedSkillMarkdown = useMemo(() => {
    const m = parsedMetadata;
    if (!m) {
      return '# Invalid JSON\n\nPlease fix JSON syntax errors in the editor to preview generated SKILL.md.';
    }

    const agentsList = (m.supportedAgents || ['cursor', 'claude-code', 'cline', 'continue']).join(', ');
    const cats = (m.categories || ['General']).join(', ');
    const langs = (m.languages || ['typescript']).join(', ');
    const pitfallsList = (
      m.pitfalls || [
        'Hallucinating deprecated method names from older major SDK versions',
        'Omitting required server-side authentication headers or secrets in client runtime',
      ]
    )
      .map((p: string, idx: number) => `${idx + 1}. **${p}**`)
      .join('\n');

    const checklistItems = (
      m.checklist || [
        'API credentials are securely loaded via environment variables',
        'Input validation conforms to official schema types',
        'Production error handling and retries are implemented',
      ]
    )
      .map((c: string) => `- [ ] ${c}`)
      .join('\n');

    return `---
name: ${m.name || 'unnamed-skill'}
version: ${m.version || '1.0.0'}
description: ${m.description || ''}
compatibility: ${m.compatibility || 'SKILL.md v1.0'}
lastVerified: ${m.lastVerified || new Date().toISOString().split('T')[0]}
supportedAgents: [${agentsList}]
---

# ${m.name ? m.name.toUpperCase() : 'SKILL'} Integration Guide

> **Category:** ${cats} | **SDK Languages:** ${langs}  
> **Source:** [Official Documentation](${m.documentationSource || '#'})  
> **Agent Compatibility:** ${agentsList}

${m.description || ''}

---

## 1. Quickstart & Setup

\`\`\`bash
# Install required dependencies
npm install ${m.name || 'api-package'}
\`\`\`

\`\`\`typescript
// Environment setup and client initialization
import { Client } from '${m.name || 'api-package'}';

const client = new Client({
  apiKey: process.env.${(m.name || 'API').toUpperCase().replace(/[^A-Z0-9]/g, '_')}_KEY!,
});
\`\`\`

---

## 2. Critical AI Pitfalls & Anti-Hallucination Guidelines

${pitfallsList}

---

## 3. Production Verification Checklist

${checklistItems}
`;
  }, [parsedMetadata]);

  const registryNodeEntry = useMemo(() => {
    const m = parsedMetadata;
    if (!m) return null;
    return {
      id: m.name || 'unnamed',
      version: m.version || '1.0.0',
      description: m.description || '',
      categories: m.categories || [],
      languages: m.languages || [],
      supportedAgents: m.supportedAgents || [],
      status: m.validationStatus || 'validated',
      lastVerified: m.lastVerified || new Date().toISOString().split('T')[0],
      documentationSource: m.documentationSource || null,
      links: m.links || {},
    };
  }, [parsedMetadata]);

  const searchIndexEntry = useMemo(() => {
    const m = parsedMetadata;
    if (!m) return null;

    const rawTokens = [
      m.name,
      ...(m.categories || []),
      ...(m.languages || []),
      ...(m.supportedAgents || []),
      ...(m.pitfalls || []).flatMap((p: string) =>
        p
          .toLowerCase()
          .split(/\W+/)
          .filter((w) => w.length > 3)
      ),
    ]
      .filter(Boolean)
      .map((t: string) => t.toLowerCase());

    const uniqueTokens = Array.from(new Set(rawTokens));
    const query = searchQuery.trim().toLowerCase();
    const matchedTokens = query ? uniqueTokens.filter((t) => t.includes(query)) : [];
    const score = query ? matchedTokens.length * 10 + (m.name?.includes(query) ? 50 : 0) : null;

    return {
      id: m.name || 'unnamed',
      tokenCount: uniqueTokens.length,
      indexedTokens: uniqueTokens.slice(0, 30),
      queryTest: query
        ? {
            query,
            matched: matchedTokens.length > 0,
            matchedTokens,
            relevanceScore: score,
          }
        : { message: 'Type in Search Query Test above to simulate match relevance' },
    };
  }, [parsedMetadata, searchQuery]);

  const copyToClipboard = (content: any, targetId: string) => {
    if (!content) return;
    const str = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    navigator.clipboard.writeText(str);
    setCopiedTarget(targetId);
    setTimeout(() => setCopiedTarget(''), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Skill Studio &amp; Validator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Skill Studio Playground
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1">
          Author, validate, and preview <code className="text-sky-400 bg-[#0f172a] px-1.5 py-0.5 rounded border border-[#1e293b]">metadata.json</code> and generated <code className="text-sky-400 bg-[#0f172a] px-1.5 py-0.5 rounded border border-[#1e293b]">SKILL.md</code> packages in real time.
        </p>
      </div>

      {/* Preset Blueprints Bar */}
      <div className="flex flex-wrap items-center gap-2 p-3.5 rounded-xl bg-[#0f172a] border border-[#1e293b] shadow-lg">
        <span className="text-xs font-mono font-semibold text-slate-400 mr-1 flex items-center gap-1.5">
          <FileCode className="w-4 h-4 text-sky-400" />
          Preset Blueprints:
        </span>
        {Object.entries(PRESETS).map(([key, val]) => (
          <button
            key={key}
            type="button"
            onClick={() => loadPreset(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              selectedPreset === key
                ? 'bg-sky-500/15 text-sky-400 border-sky-400 font-bold shadow-sm shadow-sky-500/20'
                : 'bg-[#131d33] text-slate-300 border-[#1e293b] hover:border-sky-500/50 hover:text-white'
            }`}
          >
            {val.data.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => loadPreset('custom')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border border-dashed ${
            selectedPreset === 'custom'
              ? 'bg-sky-500/15 text-sky-400 border-sky-400 font-bold'
              : 'bg-[#090d16] text-slate-400 border-slate-700 hover:border-sky-400 hover:text-white'
          }`}
        >
          + Custom Skill
        </button>
      </div>

      {/* Main Split Playground: Stacked on mobile/tablet, Side-by-side on lg+ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:h-[680px]">
        {/* Left Column: JSON Editor */}
        <div className="flex flex-col rounded-xl bg-[#0f172a] border border-[#1e293b] overflow-hidden shadow-xl h-[500px] lg:h-full">
          <div className="flex items-center justify-between px-4 py-3 bg-[#131d33] border-b border-[#1e293b] font-mono text-xs">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span>📄</span>
              <span>metadata.json</span>
            </div>
            <div className="flex items-center gap-2">
              {jsonParseError ? (
                <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 font-semibold">
                  JSON Syntax Error
                </span>
              ) : isFullyValid ? (
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                  ✓ Schema Valid
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                  Needs Attention
                </span>
              )}
              <button
                type="button"
                onClick={() => copyToClipboard(metadataText, 'metadata')}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0f172a] hover:bg-[#1e293b] text-slate-300 border border-[#1e293b] transition-colors"
              >
                {copiedTarget === 'metadata' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedTarget === 'metadata' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
          <textarea
            value={metadataText}
            onChange={(e) => setMetadataText(e.target.value)}
            spellCheck={false}
            aria-label="Skill metadata JSON editor"
            className="flex-1 w-full p-4 bg-[#090d16] text-slate-100 font-mono text-xs sm:text-sm leading-relaxed resize-none outline-none"
          />
        </div>

        {/* Right Column: Live Tabbed Preview */}
        <div className="flex flex-col rounded-xl bg-[#0f172a] border border-[#1e293b] overflow-hidden shadow-xl h-[560px] lg:h-full">
          {/* Tabs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#1e293b] bg-[#131d33] text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('validator')}
              className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'validator'
                  ? 'border-sky-400 text-sky-400 font-semibold bg-[#0f172a]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Validator</span>
              {errorCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  {errorCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('docs')}
              className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'docs'
                  ? 'border-sky-400 text-sky-400 font-semibold bg-[#0f172a]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>SKILL.md Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('registry')}
              className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'registry'
                  ? 'border-sky-400 text-sky-400 font-semibold bg-[#0f172a]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Registry Node</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('search')}
              className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'search'
                  ? 'border-sky-400 text-sky-400 font-semibold bg-[#0f172a]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Search Index</span>
            </button>
          </div>

          {/* Preview Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {/* VALIDATOR TAB */}
            {activeTab === 'validator' && (
              <div className="space-y-4">
                {isFullyValid && validationDiagnostics.length === 0 && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>All Validation Checks Passed</span>
                    </div>
                    <p className="text-xs text-emerald-200/90">
                      Metadata conforms to the official SKILL.md v1.0 specification with zero diagnostics or warnings.
                    </p>
                  </div>
                )}

                {validationDiagnostics.map((diag, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                      diag.severity === 'error'
                        ? 'bg-rose-500/10 border-rose-500/35 text-rose-200'
                        : 'bg-amber-500/10 border-amber-500/35 text-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold">[{diag.rule}]</span>
                        <span className="text-slate-400">{diag.category}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          diag.severity === 'error'
                            ? 'bg-rose-500 text-white'
                            : 'bg-amber-500 text-black'
                        }`}
                      >
                        {diag.severity}
                      </span>
                    </div>
                    <p className="font-medium text-sm">{diag.message}</p>
                    <p className="opacity-90">
                      <strong>Recommendation:</strong> {diag.suggestion}
                    </p>
                  </div>
                ))}

                <div className="p-4 rounded-xl bg-[#131d33] border border-[#1e293b] text-xs space-y-2">
                  <h4 className="font-bold text-white text-sm">
                    Active Rules (@awesome-api-skills/validator)
                  </h4>
                  <ul className="space-y-1 text-slate-300 list-disc pl-4 leading-relaxed">
                    <li><strong>V-001:</strong> Identifier &amp; JSON syntax validation</li>
                    <li><strong>V-002:</strong> Semantic versioning check (semver)</li>
                    <li><strong>V-003:</strong> Description completeness check</li>
                    <li><strong>V-004:</strong> Category tagging validation</li>
                    <li><strong>V-005:</strong> Agent compatibility verification</li>
                    <li><strong>V-006:</strong> Freshness audit timestamp (lastVerified)</li>
                    <li><strong>V-007:</strong> Documentation URL validation</li>
                    <li><strong>V-008:</strong> AI anti-hallucination pitfalls coverage</li>
                  </ul>
                </div>
              </div>
            )}

            {/* SKILL.MD PREVIEW TAB */}
            {activeTab === 'docs' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#131d33] border border-[#1e293b] text-xs text-slate-300">
                  <span>Generated <code className="text-sky-400">SKILL.md</code> ingested by Cursor, Claude Code, Cline:</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(generatedSkillMarkdown, 'skillmd')}
                    className="px-2.5 py-1 rounded bg-[#0f172a] hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono shrink-0"
                  >
                    {copiedTarget === 'skillmd' ? 'Copied SKILL.md!' : 'Copy SKILL.md'}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b] font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {generatedSkillMarkdown}
                </pre>
              </div>
            )}

            {/* REGISTRY NODE TAB */}
            {activeTab === 'registry' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#131d33] border border-[#1e293b] text-xs text-slate-300">
                  <span>Exact schema representation inside <code className="text-sky-400">registry/graph.json</code>:</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(registryNodeEntry, 'registry')}
                    className="px-2.5 py-1 rounded bg-[#0f172a] hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono shrink-0"
                  >
                    {copiedTarget === 'registry' ? 'Copied JSON!' : 'Copy Node JSON'}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b] font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {JSON.stringify(registryNodeEntry, null, 2)}
                </pre>
              </div>
            )}

            {/* SEARCH INDEX SIMULATOR TAB */}
            {activeTab === 'search' && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Simulate Agent In-Memory Search Query:
                  </label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. stripe, rls, webhook, embeddings, vector, auth..."
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#090d16] border border-[#1e293b] focus:border-sky-400 text-xs text-white outline-none"
                    />
                  </div>
                </div>
                <pre className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b] font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {JSON.stringify(searchIndexEntry, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
