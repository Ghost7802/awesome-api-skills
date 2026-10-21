# Implementation Plan: Fix GitHub CI/CD Deployments, Codebase Audit & Verified Skills Expansion

## Root Cause Diagnosis of GitHub & Deployment Failures

Our audit of `.github/workflows/*.yml`, `package.json`, `tsconfig.json`, and `snapshots/` identified the exact root causes of the GitHub Actions and deployment failures:

1. **Invalid GitHub Action Version (`actions/setup-node@v7`)**:
   - All workflow files (`.github/workflows/build.yml`, `docs.yml`, `quality.yml`, `tests.yml`, `snapshots.yml`, `registry.yml`, `artifacts.yml`, `benchmarks.yml`, `release.yml`, `security.yml`) reference `actions/setup-node@v7`, which does not exist on GitHub (latest is `v4`).
2. **Non-existent npm Package Versions in `package.json`**:
   - `package.json` listed non-existent versions (`vitest: ^5.0.0`, `react: ^19.3.1`, `@types/react: ^19.3.0`, `lucide-react: ^1.61.0`, `@tailwindcss/vite: ^4.3.3`) and lacked a synchronized `package-lock.json`, causing `npm ci` to fail immediately on GitHub Actions and Vercel.
3. **Deleted `@awesome-api-skills/docs` Workspace in `docs.yml`**:
   - `.github/workflows/docs.yml` runs `npm run build --workspace=@awesome-api-skills/docs`, which failed after removing the old VitePress workspace.
4. **Root `tsconfig.json` Breaking Monorepo Packages (`packages/*`)**:
   - All 7 workspace packages (`shared-types`, `sdk`, `registry`, `validator`, `generator`, `core`, `cli`) extend `../../tsconfig.json`. Setting `"noEmit": true` and `"moduleResolution": "bundler"` in root `tsconfig.json` prevented `npm run build:packages` from emitting `dist/*.js` files needed by `npm test`, `npm run validate:skills`, and `scripts/dev/dogfood.ts`.
5. **Golden Snapshot Mismatch (`snapshots/*`)**:
   - Adding new skills without running `scripts/dev/dogfood.ts --update-snapshots` caused `snapshots.yml` and `registry.yml` to fail on snapshot comparison.

---

## Proposed Changes

### 1. Fix All GitHub Actions Workflows & Lockfile
- Update all `.github/workflows/*.yml` files to use `actions/setup-node@v4` and valid Node.js LTS matrix (`22.x`).
- Update `.github/workflows/docs.yml` to build the root React web application (`npm run build`).
- Pin all dependencies in `package.json` to real, published npm registry versions (`react@^18.3.1`, `react-dom@^18.3.1`, `lucide-react@^0.468.0`, `vitest@^2.1.8`, `tailwindcss@^4.0.0`, `@tailwindcss/vite@^4.0.0`) and generate a valid `package-lock.json`.
- Separate `tsconfig.json` (used by `packages/*` with `NodeNext` and `noEmit: false`) from `tsconfig.app.json` (used by the React frontend and `api/` routes) so both `npm run build:packages` and `vite build` succeed.

### 2. Add New Real, Tested & Verified Skills
Add 5 more production-tested skills with complete `metadata.json`, `SKILL.md`, runnable code examples, and unit tests:
- **`anthropic-mcp`** (Model Context Protocol): Building MCP servers and tool handlers with `@modelcontextprotocol/sdk`.
- **`better-sqlite3`** (Databases): High-performance synchronous SQLite in Node.js with WAL mode and prepared statements.
- **`zod`** (Developer Tools / Validation): TypeScript-first schema declaration, `.safeParse()`, `.transform()`, and JSON schema coercion.
- **`playwright-test`** / **`bullmq-workflows`** / **`polar`** (Payments & Developer Billing): Modern open-source developer billing and webhook verification.
- **`upstash-ratelimit`** (Security / Serverless): Sliding window and token bucket rate limiting at the edge.

### 3. Re-Audit All Code & Remove Fake / Unverified Claims
- **Audit Dates**: Replace future placeholder dates (`2026-07-02`, `2026-07-03`) across skill metadata and UI components with real historical/current audit dates.
- **Real Measured Metrics**:
  - Replace hardcoded latency text in `HomeView.tsx`, `TerminalSimulator.tsx`, and `DocumentationView.tsx` with actual measured benchmark timings from `build:packages` + `dogfood.ts` (`performance.now()` execution time for schema validation, registry load, and in-memory search).
- **Synchronize Golden Snapshots & Integrity**:
  - Run `npm run build:packages`, `npx tsx scripts/dev/dogfood.ts --update-snapshots`, `npm run generate-integrity`, and `npm test` (Vitest) to verify 100% test pass rate.

---

## Verification Plan
1. Run `npm run build:packages` and confirm all 7 workspace packages emit `dist/` artifacts.
2. Run `node packages/cli/dist/bin.js validate` (`npm run validate:skills`) and confirm all skills pass schema validation.
3. Run `npx tsx scripts/dev/dogfood.ts` and confirm golden snapshot parity.
4. Run `npm test` (Vitest) across all workspace packages and skill tests.
5. Run `compile_applet` (`npm run build`) and `lint_applet` (`npm run lint`) to verify the React + Vercel production build.
