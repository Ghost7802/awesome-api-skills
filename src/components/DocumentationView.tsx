import React, { useState } from 'react';
import { BookOpen, Terminal, Code, Database, ShieldCheck, Cpu, FileSpreadsheet } from 'lucide-react';

interface DocumentationViewProps {
  skillCount: number;
  edgeCount: number;
}

export const DocumentationView: React.FC<DocumentationViewProps> = ({ skillCount, edgeCount }) => {
  const [activeDoc, setActiveDoc] = useState<string>('overview');

  const docs = [
    { id: 'overview', title: 'Overview', icon: BookOpen },
    { id: 'specification', title: 'SKILL.md v1.0 Spec', icon: FileSpreadsheet },
    { id: 'cli', title: 'CLI Reference', icon: Terminal },
    { id: 'sdk', title: 'SDK Guide', icon: Code },
    { id: 'validator', title: 'Validation Engine', icon: ShieldCheck },
    { id: 'registry', title: 'Registry & Graph', icon: Database },
    { id: 'generator', title: 'Generator & Exporters', icon: Cpu },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation (Horizontal scroll on mobile, sticky sidebar on desktop) */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 px-3 hidden lg:block">
              Guide &amp; Tooling
            </span>
            <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0">
              {docs.map((doc) => {
                const Icon = doc.icon;
                const isActive = activeDoc === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setActiveDoc(doc.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 border ${
                      isActive
                        ? 'bg-sky-500/15 text-sky-400 border-sky-500/30 font-semibold'
                        : 'bg-[#0f172a] lg:bg-transparent text-slate-400 border-[#1e293b] lg:border-transparent hover:text-white hover:bg-[#0f172a]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{doc.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 p-6 sm:p-8 rounded-2xl bg-[#0f172a] border border-[#1e293b] space-y-6 text-slate-300 leading-relaxed">
          {activeDoc === 'overview' && (
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white border-b border-[#1e293b] pb-4">
                Overview
              </h1>
              <p>
                Stop AI from guessing APIs. This repository ships <strong className="text-white">{skillCount} verified skills</strong> — deterministic markdown packages your coding agent reads to eliminate SDK hallucinations, broken method calls, and missing configuration flags.
              </p>

              <h2 className="text-xl font-bold text-white pt-2">Why API Skills?</h2>
              <p>
                LLMs are regularly trained on outdated API documentation. When asking an agent to write code for modern SDKs (such as Vercel AI SDK v4+, Stripe webhooks, Clerk v5+, Next.js App Router, or Supabase SSR), models frequently invent deprecated parameters or hallucinate methods.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b]">
                  <h4 className="font-bold text-sky-400 text-sm mb-1">Exact Signatures</h4>
                  <p className="text-xs text-slate-400">Up-to-date import paths, method signatures, and environment variable names.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b]">
                  <h4 className="font-bold text-rose-400 text-sm mb-1">Critical AI Pitfalls</h4>
                  <p className="text-xs text-slate-400">Explicit warnings against known LLM hallucinations and breaking SDK patterns.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b]">
                  <h4 className="font-bold text-emerald-400 text-sm mb-1">Production Checklists</h4>
                  <p className="text-xs text-slate-400">Step-by-step verification items before shipping code to production.</p>
                </div>
              </div>

              <h2 className="text-xl font-bold text-white pt-2">Supported AI Coding Agents</h2>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li><strong className="text-white">Cursor:</strong> Reference in <code className="text-sky-400">.cursorrules</code> or prompt <code className="text-sky-400">@skills/&lt;skill-name&gt;/SKILL.md</code></li>
                <li><strong className="text-white">Claude Code:</strong> Include in <code className="text-sky-400">CLAUDE.md</code> or load via context</li>
                <li><strong className="text-white">Cline:</strong> Place inside <code className="text-sky-400">.cline/skills/</code> or workspace instructions</li>
                <li><strong className="text-white">Continue:</strong> Configure under <code className="text-sky-400">.continue/config.json</code> context providers</li>
              </ul>
            </div>
          )}

          {activeDoc === 'specification' && (
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white border-b border-[#1e293b] pb-4">
                SKILL.md v1.0 Specification
              </h1>
              <p>
                Every skill in this repository follows the open <code className="text-sky-400">SKILL.md v1.0</code> specification.
              </p>

              <h2 className="text-xl font-bold text-white">Directory Layout</h2>
              <pre className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b] font-mono text-xs text-slate-200 overflow-x-auto">
{`skills/stripe/
├── SKILL.md       # Primary agent context and implementation patterns
├── metadata.json  # Machine-readable schema metadata
├── examples/      # Tested TypeScript, Python, and Go snippets
└── prompts/       # Agent system prompt templates`}
              </pre>

              <h2 className="text-xl font-bold text-white">Required Metadata Schema</h2>
              <pre className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b] font-mono text-xs text-sky-300 overflow-x-auto">
{`{
  "name": "stripe",
  "version": "1.0.0",
  "description": "Financial infrastructure platform for the internet.",
  "categories": ["Payments", "Commerce"],
  "languages": ["typescript", "python"],
  "license": "MIT",
  "documentationSource": "https://stripe.com/docs/api",
  "supportedAgents": ["cursor", "claude-code", "cline", "continue"],
  "compatibility": "SKILL.md v1.0",
  "lastVerified": "2026-10-21"
}`}
              </pre>
            </div>
          )}

          {activeDoc === 'cli' && (
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white border-b border-[#1e293b] pb-4">
                CLI Reference
              </h1>
              <p>
                Search, validate, and inspect skills locally using the built-in CLI or serverless API routes.
              </p>

              <h2 className="text-lg font-bold text-white">Search Skills</h2>
              <pre className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b] font-mono text-xs text-slate-200 overflow-x-auto">
{`node packages/cli/dist/bin.js search stripe
node packages/cli/dist/bin.js search database --json`}
              </pre>

              <h2 className="text-lg font-bold text-white">Validate All Skills</h2>
              <pre className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b] font-mono text-xs text-slate-200 overflow-x-auto">
{`node packages/cli/dist/bin.js validate`}
              </pre>

              <h2 className="text-lg font-bold text-white">Doctor &amp; Environment Health</h2>
              <pre className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b] font-mono text-xs text-slate-200 overflow-x-auto">
{`node packages/cli/dist/bin.js doctor`}
              </pre>
            </div>
          )}

          {activeDoc === 'sdk' && (
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white border-b border-[#1e293b] pb-4">
                SDK Guide (@awesome-api-skills/sdk)
              </h1>
              <p>
                The <code className="text-sky-400">@awesome-api-skills/sdk</code> package provides programmatic access for embedding skill management, lifecycle hooks, and validation events into custom developer tooling.
              </p>
              <pre className="p-4 rounded-xl bg-[#090d16] border border-[#1e293b] font-mono text-xs text-slate-200 overflow-x-auto">
{`import { SDKCore, DefaultLogger, DefaultEventBus } from '@awesome-api-skills/sdk';

const sdk = new SDKCore();

sdk.events.on('PluginLoaded', (event) => {
  console.log(\`Loaded skill plugin: \${event.data.name}\`);
});`}
              </pre>
            </div>
          )}

          {activeDoc === 'validator' && (
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white border-b border-[#1e293b] pb-4">
                Validation Engine (@awesome-api-skills/validator)
              </h1>
              <p>
                Enforces structural, schema, and anti-hallucination trust integrity across all {skillCount} skills.
              </p>
              <ul className="space-y-2 text-sm list-disc pl-5">
                <li><strong className="text-white">V-001 (MetadataPresenceRule):</strong> Ensures <code className="text-sky-400">metadata.json</code> exists and parses as valid JSON with kebab-case slug.</li>
                <li><strong className="text-white">V-002 (SemanticVersionRule):</strong> Verifies strict semver version string.</li>
                <li><strong className="text-white">V-004 (MetadataSchemaValidationRule):</strong> Validates required categories and schema fields.</li>
                <li><strong className="text-white">V-006 (LastVerifiedMetadataRule):</strong> Confirms <code className="text-sky-400">lastVerified</code> ISO timestamp is present.</li>
                <li><strong className="text-white">V-008 (PitfallsCoverageRule):</strong> Checks for documented LLM anti-hallucination pitfalls.</li>
              </ul>
            </div>
          )}

          {activeDoc === 'registry' && (
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white border-b border-[#1e293b] pb-4">
                Registry &amp; Knowledge Graph
              </h1>
              <p>
                The registry maintains metadata, category indexes, and dependency relationships for all <strong className="text-white">{skillCount} skills</strong> and <strong className="text-white">{edgeCount} directed graph edges</strong>.
              </p>
              <p className="text-sm">
                Serverless API endpoints are exposed at <code className="text-sky-400">/api/skills</code>, <code className="text-sky-400">/api/search</code>, and <code className="text-sky-400">/api/validate</code> for programmatic consumption on Vercel.
              </p>
            </div>
          )}

          {activeDoc === 'generator' && (
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white border-b border-[#1e293b] pb-4">
                Generator &amp; Exporters
              </h1>
              <p>
                Transforms raw skill metadata and markdown into agent-specific formats:
              </p>
              <ul className="space-y-2 text-sm list-disc pl-5">
                <li><strong className="text-white">Cursor Rules:</strong> Generates <code className="text-sky-400">.cursorrules</code> context blocks.</li>
                <li><strong className="text-white">Claude Code:</strong> Formats unified project references for <code className="text-sky-400">CLAUDE.md</code>.</li>
                <li><strong className="text-white">Static Search Index:</strong> Precomputes inverted token indexes for sub-16ms lookup.</li>
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
