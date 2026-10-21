# Implementation Plan: React Rewrite, New Verified Skills & Vercel Deployment

## Project Overview
Rewrite the Awesome API Skills directory from the source framework to a modern React SPA with TypeScript and Tailwind CSS, preserving the dark, precision-engineered design system. Add newly verified skills with full real-world code examples across major domains (Frontier AI, Cloud DBs, Edge Services, Developer Tooling), configure Vercel fullstack serverless proxy deployment, and ensure pixel-perfect responsive layouts across mobile, tablet, and PC screens.

---

## Proposed Changes

### 1. React Architecture & UI/UX Preservation
- **Preserve Visual Design System**: Match the pure obsidian dark theme (`#090d16` canvas, `#0f172a` soft panels, `#1e293b` borders, and `#38bdf8` brand accents) with tight radii and monospace typography.
- **Components to Implement**:
  - `Navbar.tsx`: Brand emblem, responsive navigation tabs, search trigger with ⌘K badge, GitHub link, and mobile drawer.
  - `HomeView.tsx`: Hero section, live stats ticker, interactive terminal CLI preview, anti-hallucination feature triad, and quick action cards.
  - `SkillsCatalog.tsx`: Instant fuzzy search, domain categories, agent filters (`cursor`, `claude-code`, `cline`, `continue`), sorting, and card grid.
  - `SkillDetailModal.tsx`: Trust panel, verified badge, AI pitfalls checklist, interactive verification checkboxes, connected knowledge graph edges, and code examples.
  - `PlaygroundView.tsx`: Complete React port of `Playground.vue` with 10 presets, live `metadata.json` editor, live V-001 through V-008 schema validation diagnostics, SKILL.md preview, registry node generator, and agent search simulator.
  - `KnowledgeGraphView.tsx`: Stack diagrams, interactive edge filters (`depends_on`, `integrates_with`, `works_well_with`, `alternative_to`), guided learning paths, and graph statistics.
  - `TerminalSimulator.tsx`: Interactive CLI terminal supporting `search`, `validate`, `doctor`, `benchmark`, `list`, and `help`.
  - `DocumentationView.tsx`: Full guides for Overview, CLI Reference, SDK Guide, Registry & Knowledge Graph, Validation Engine, and SKILL.md v1.0 Spec.
  - `SearchModal.tsx`: Global search modal accessible anytime via ⌘K or header search.

### 2. New Real Tested & Verified Skills
Add production-tested skills with complete `metadata.json`, `SKILL.md`, realistic code examples, and prompt templates:
- **`vercel-ai-sdk`** (AI / Developer Tools): `streamText`, `generateObject`, tool calling with modern AI SDK v4+ patterns and anti-hallucination traps.
- **`langgraph`** (AI / Workflows): StateGraph, cyclical agent nodes, memory checkpoints, and human-in-the-loop workflows.
- **`cloudflare-d1`** (Databases / Cloud): Serverless SQL edge database, prepared statements, batch transactions, and migrations.
- **`supabase-ssr`** (Authentication / Databases): Next.js App Router / React cookie-based session management, middleware token refresh, and safe client creation.

### 3. Vercel Serverless Fullstack Deployment
- Create `/api/skills.ts`: Serverless proxy returning all verified skills and metadata.
- Create `/api/search.ts`: Edge search query endpoint with token scoring.
- Create `/api/validate.ts`: Serverless validator endpoint running V-001 to V-008 checks.
- Update `/vercel.json`: Configure rewrite rules for client routing and serverless `/api/*` proxies with security headers.

### 4. Responsive Viewport Testing & Optimization
- **Mobile (< 768px)**: Horizontal scrolling filter chips, single-column card grid, vertically stacked playground editor, sticky bottom or drawer navigation.
- **Tablet (768px - 1024px)**: 2-column catalog grid, optimized split playground layout, accessible touch targets.
- **PC (> 1024px)**: 3-to-4 column dense catalog grid, full side-by-side editor with real-time tabbed preview, keyboard navigation.

---

## Verification Plan

### Automated Build Verification
1. Run `node scripts/dev/build-react-data.js` to compile all 120+ verified skills and graph edges.
2. Run `compile_applet` to execute `npm run build` with Vite.
3. Verify zero TypeScript errors (`tsc --noEmit`).

### Manual & Responsive Verification
1. Test switching between all top-level tabs (Overview, Catalog, Playground, Knowledge Graph, CLI Terminal, Docs).
2. Test search, category filtering, and agent filters on mobile and desktop viewports.
3. Test Skill Studio Playground live validation by editing JSON in real time.
4. Test opening skill details, checking checklist items, and copying markdown.
5. Verify Vercel configuration routes and build artifacts.
