# Trust Report

**Date:** 2026-06-29  
**Sprint:** Release Cleanup (Trust & Credibility)  
**Repository:** https://github.com/Ghost7802/awesome-api-skills

---

## Summary

This sprint removed unverifiable marketing, fake infrastructure links, and AI-generated release artifacts. Documentation now states only what can be checked from the repository itself.

---

## Issues fixed

| Category                                                                      | Action                                                                                               |
| :---------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| Fake npm badge & install instructions                                         | Removed; README uses `pnpm install`, `pnpm build`, `pnpm dev`                                        |
| Wrong GitHub org (`awesome-api-skills/core`)                                  | Badges and links point to `Ghost7802/awesome-api-skills`                                            |
| Fake domains (`*.awesome-api-skills.dev`, `official.registry`, `awesome.api`) | Removed or replaced with local paths / GitHub tree URLs                                              |
| Hardcoded benchmark table                                                     | Removed from README; `scripts/dev/benchmark.js` no longer prints fake timings                        |
| AI release artifacts                                                          | Deleted `RC2_REPORT.md`, `repository-report.json`, `performance-report.json`, `RELEASE_CHECKLIST.md` |
| Mock docs site content                                                        | Regenerated from real `skills/` directory; removed 4 placeholder skill pages                         |
| Root script clutter                                                           | Moved into `scripts/generators/`, `scripts/release/`, `scripts/dev/`, `scripts/migrations/`          |
| Coverage report location                                                      | Moved to `docs/reports/coverage-report.json`                                                         |
| `package.json` superlative description                                        | Replaced with factual description                                                                    |
| Default registry URL in core config                                           | Changed to `./registry`                                                                              |
| Docs generator fake publishers                                                | Removed "official" badges and unpublished CLI install steps                                          |
| `pnpm build` / `typecheck` filters                                            | Fixed Windows-compatible `@awesome-api-skills/*` filter                                              |
| `pnpm-workspace.yaml`                                                         | Fixed invalid `allowBuilds` entry blocking installs                                                  |

---

## Claims removed

- "world's largest"
- "production-grade" / "enterprise ready" (project-level)
- "100+ officially supported APIs"
- "Lightning Fast" with millisecond metrics
- "Give your AI coding agent production-grade API knowledge in one command"
- Fake live stats (1,010 skills, 6 registries, <10ms CLI)
- Roadmap items presented as completed without evidence
- RC2 "zero defects / approved for v1.0" language

---

## Claims retained (verifiable)

| Claim                | Evidence                          |
| :------------------- | :-------------------------------- |
| 100 skills           | 100 directories under `skills/`   |
| MIT license          | `LICENSE` file                    |
| 7 workspace packages | `packages/*`                      |
| Knowledge graph      | `registry/graph.json`             |
| Local docs app       | `apps/docs` builds with VitePress |

---

## Links verified

| URL                                                  | Result                                                                  |
| :--------------------------------------------------- | :---------------------------------------------------------------------- |
| `https://registry.npmjs.org/@awesome-api-skills/cli` | 404 (confirmed unpublished — not linked anymore)                        |
| `https://registry.awesome-api-skills.dev`            | 404 (removed from docs)                                                 |
| `https://www.contributor-covenant.org/`              | 200                                                                     |
| `.design/banner.svg`, `.design/media/demo.svg`       | Present in repository                                                   |
| Skill vendor doc links in `skills/*/SKILL.md`        | Third-party documentation (not re-verified exhaustively in this sprint) |

GitHub repository URLs return 404 to anonymous HEAD requests in this environment (likely private or branch naming); the clone remote and local `LICENSE` file are the source of truth for badges.

---

## Badges verified

| Badge       | Target                                                                                  | Status                               |
| :---------- | :-------------------------------------------------------------------------------------- | :----------------------------------- |
| License     | `img.shields.io/github/license/Ghost7802/awesome-api-skills`                           | Points to real repo name             |
| Build       | `img.shields.io/github/actions/workflow/status/Ghost7802/awesome-api-skills/build.yml` | Points to workflow file in this repo |
| NPM version | —                                                                                       | **Removed** (package not published)  |

---

## Commands tested

| Command                                 | Result                                     |
| :-------------------------------------- | :----------------------------------------- |
| `pnpm install`                          | Pass                                       |
| `pnpm build`                            | Pass (8 workspace packages including docs) |
| `pnpm lint`                             | Pass                                       |
| `pnpm typecheck`                        | Pass                                       |
| `pnpm test`                             | Pass (28 tests, 7 files)                   |
| `node scripts/dev/run-validation-v2.js` | Pass (100 skills scanned)                  |
| `node apps/docs/scripts/generate.js`    | Pass (100 skills indexed)                  |

README quick start commands (`pnpm install`, `pnpm build`, `pnpm dev`) match `package.json` scripts.

---

## Assets verified

| Asset                    | Status                                               |
| :----------------------- | :--------------------------------------------------- |
| `.design/banner.svg`     | Exists                                               |
| `.design/media/demo.svg` | Exists (illustrative SVG, not a fake screenshot URL) |

---

## Remaining known limitations

1. **CLI not on npm** — build from source; documented in README and docs home page.
2. **CI workflow branch** — workflows trigger on `main`; default git branch may be `master`. Badge may show "unknown" until branches align.
3. **`snapshots/sitemap.xml`** — may still contain legacy URLs until regenerated through the generator pipeline.
4. **Docs stubs** — `apps/docs/src/docs/*.md` are brief pointers to repository paths, not full published documentation.
5. **Skill content** — individual skills quote vendor taglines (e.g. PostgreSQL marketing copy); these are third-party descriptions, not project claims.
6. **`SPECIFICATION.md`** — retains normative "official registry" language as spec terminology; not presented as a live service claim in README.

---

## Deliverables

- [x] `AUDIT_REPORT.md` — pre-remediation findings
- [x] `TRUST_REPORT.md` — this document
- [x] Honest README, CONTRIBUTING, and docs home page
- [x] Organized `scripts/` layout
- [x] Removed AI-generated release artifacts

No new features were added during this sprint.
