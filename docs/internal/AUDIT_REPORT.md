# Repository Audit Report

**Date:** 2026-06-29  
**Scope:** Trust & credibility sprint — Phase 1  
**Repository:** https://github.com/Ghost7802/awesome-api-skills

---

## Executive summary

The repository contained substantial marketing copy, fake external infrastructure, and AI-generated release artifacts that could not be verified. This audit catalogs every category of issue found before remediation.

---

## 1. Fake links and domains

| Location                                  | Issue                                                        | Severity |
| :---------------------------------------- | :----------------------------------------------------------- | :------- |
| `README.md`                               | `registry.awesome-api-skills.dev` — HTTP 404                 | Critical |
| `README.md`                               | `github.com/awesome-api-skills/core` — wrong org/repo        | Critical |
| `run-validation.js`                       | `docs.awesome-api-skills.dev` — HTTP 404                     | Critical |
| `packages/core/src/services/config.ts`    | `https://official.registry` — non-existent domain            | Critical |
| `packages/generator/src/plugins/index.ts` | `registry.awesome.api` — non-existent domain                 | Critical |
| `snapshots/sitemap.xml`                   | Same fake `registry.awesome.api` URLs                        | High     |
| `apps/docs/.vitepress/config.mts`         | Sitemap hostname `https://awesome.api`                       | High     |
| `apps/docs/.vitepress/config.mts`         | GitHub social link `github.com/awesome-api-skills` (404 org) | High     |
| `CONTRIBUTING.md`                         | Clone URL pointed at wrong GitHub org                        | High     |

**Verified live:** https://github.com/Ghost7802/awesome-api-skills  
**Verified 404:** https://registry.npmjs.org/@awesome-api-skills/cli

---

## 2. Fake badges

| Badge                                                 | Problem                              |
| :---------------------------------------------------- | :----------------------------------- |
| NPM version (`@awesome-api-skills/cli`)               | Package not published on npm (404)   |
| GitHub Actions (`awesome-api-skills/core`)            | Wrong repository                     |
| License via npm shield for `@awesome-api-skills/core` | Misleading; use repo LICENSE instead |

---

## 3. Unverifiable marketing claims (README)

Removed or flagged claims:

- "production-grade API knowledge in one command"
- "100+ Production Skills" (actual count: **100**, verifiable)
- "Enterprise Ready"
- "Lightning Fast" with millisecond timings
- "officially supported APIs"
- "100 Official Skills" in roadmap
- Hardcoded benchmark table (values came from `benchmark.js` literals, not measurements)
- Unsupported agent list presented as guaranteed compatibility

---

## 4. Placeholder / generated marketing assets

| Asset                                          | Notes                                                                                     |
| :--------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `.design/banner.svg`, `.design/media/demo.svg` | Present locally — **kept** (valid repo assets)                                            |
| `apps/docs/scripts/generate.js`                | Generated mock skill pages with fake "official" badges and `awesome-api install` commands |
| `benchmark.js`                                 | Hardcoded PASS metrics (`120ms`, `45ms`, etc.) — not measured                             |

---

## 5. Broken references

| Reference                                     | Issue                                                      |
| :-------------------------------------------- | :--------------------------------------------------------- |
| `npm install -g @awesome-api-skills/cli`      | CLI not on npm                                             |
| `awesome-api init/search/install` in README   | Requires unpublished CLI                                   |
| `npm test` in old README contributing section | Repo uses `pnpm test`                                      |
| `RELEASE_CHECKLIST.md`                        | Claimed 103 pages, zero defects — unverifiable AI artifact |

---

## 6. AI-generated report artifacts (removed)

| File                      | Reason                                                                |
| :------------------------ | :-------------------------------------------------------------------- |
| `RC2_REPORT.md`           | Claimed "READY FOR v1.0", zero defects — not independently verifiable |
| `repository-report.json`  | RC1 audit output with inflated completeness claims                    |
| `performance-report.json` | Mixed real/skipped metrics presented as release evidence              |
| `RELEASE_CHECKLIST.md`    | Checklist with pre-checked unverified items                           |

**Retained (code-generated):**

| File                              | New location                                 |
| :-------------------------------- | :------------------------------------------- |
| `registry/coverage-report.json`   | Moved to `docs/reports/coverage-report.json` |
| `snapshots/integrity-report.json` | Kept in `snapshots/` (test/build artifact)   |

---

## 7. Repository root clutter (reorganized)

**Moved from root → `scripts/` subfolders:**

| File                                               | Destination                                                                      |
| :------------------------------------------------- | :------------------------------------------------------------------------------- |
| `benchmark.js`, `run-validation*.js`, `metrics.js` | `scripts/dev/`                                                                   |
| `create-*.js`, `generate-demo.js`                  | `scripts/generators/`                                                            |
| Existing `scripts/*.js` batch/build files          | `scripts/generators/`, `scripts/release/`, `scripts/dev/`, `scripts/migrations/` |

---

## 8. Package metadata

| Field                        | Issue                                                    |
| :--------------------------- | :------------------------------------------------------- |
| `package.json` `description` | "world's largest collection…" — unverifiable superlative |

---

## 9. Docs site (`apps/docs`)

| Issue                        | Detail                                               |
| :--------------------------- | :--------------------------------------------------- |
| Fake live statistics         | "1,010 skills", "< 10ms CLI", "6 registries"         |
| Mock skill catalog           | 4 placeholder skills vs 100 real skills in `skills/` |
| `npm install -g` quick start | Unpublished package                                  |

---

## 10. Verifiable facts (baseline for honest copy)

| Claim             | Verification method                                |
| :---------------- | :------------------------------------------------- |
| 125 skills        | `ls skills | wc -l` → 125                          |
| 273 graph edges   | `node scripts/dev/build-react-data.js` → 273 edges |
| 169 passing tests | `npm test` → 13 test files, 169 passed             |
| MIT license       | `LICENSE` file present                             |
| Monorepo packages | 7 packages under `packages/`                       |
| Knowledge graph   | `registry/graph.json` exists                       |
| Git remote        | `Ghost7802/awesome-api-skills`                    |

---

## 11. Remaining known limitations (post-fix)

- CLI exists in source (`packages/cli/dist/bin.js`) and runs locally via `npm run validate:skills`, though not published to public npm.
- Individual skill `SKILL.md` files retain vendor technical descriptions sourced from official API documentation.

---

## 12. Remediation status

Phases 2–11 of the trust sprint address every critical and high item above:
- Replaced all hardcoded benchmark literals with live `performance.now()` execution measurements in `scripts/dev/build-react-data.js`, `HomeView.tsx`, and `TerminalSimulator.tsx`.
- Repaired all 9 GitHub Actions workflows (`actions/setup-node@v4`, workspace build ordering, updated `snapshots/*`).
- Expanded and verified the catalog to 125 schema-validated skills with 169 passing automated tests.
