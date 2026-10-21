---
title: 'Shipping structured API skills for AI agents (and cleaning up our README first)'
published: false
tags: ai, open-source, typescript, cursor
cover_image: https://raw.githubusercontent.com/Ghost7802/awesome-api-skills/main/social-preview.png
---

LLMs are good at writing code. They are noticeably worse at remembering which Stripe webhook events exist, which PostgreSQL isolation level you need, or whether your Next.js route should be a Server Action.

Paste five pages of docs into the chat? Works once. Paste them every session? Expensive and inconsistent.

We shipped **Awesome API Skills v1.0.0** — a different approach: **structured skill packages** your agent can read from the repository.

## What a "skill" is

A skill is a folder:

```
skills/stripe/
├── SKILL.md          # instructions for the agent
├── metadata.json     # categories, relationships
├── examples/         # code samples
└── prompts/          # optional prompt templates
```

There are **100** of these — Stripe, AWS S3, Supabase, Pinecone, Twilio, PostgreSQL, Next.js, and more.

The agent does not need a proprietary plugin. If your tool reads markdown (Cursor, Claude Code, etc.), you point it at `SKILL.md`.

## Knowledge graph

Skills declare relationships in `metadata.json`. The compiled graph lives in `registry/graph.json`.

Example: a database ORM skill can declare that it depends on a database skill. The graph is data, not prose — you can inspect it directly.

## Monorepo architecture

The repository is a pnpm workspace:

| Package              | Role                         |
| -------------------- | ---------------------------- |
| `packages/validator` | Schema validation for skills |
| `packages/registry`  | Registry resolution          |
| `packages/generator` | Artifact generation          |
| `packages/cli`       | CLI (source only today)      |
| `apps/docs`          | VitePress documentation      |

## Try it locally

```bash
git clone https://github.com/Ghost7802/awesome-api-skills.git
cd awesome-api-skills
pnpm install
pnpm build
pnpm dev
```

Open `http://localhost:5173` for the docs site.

To use a skill in your project:

```bash
cp -r skills/stripe .skills/stripe
```

Then reference `.skills/stripe/SKILL.md` in your agent instructions.

Run the test suite:

```bash
pnpm test    # 28 tests
pnpm lint
pnpm typecheck
```

## What we fixed before launch

Early versions of this repo had problems we were not comfortable shipping:

- npm badges for a package that does not exist on npm
- Links to domains that returned 404
- Hardcoded "performance benchmarks" that were never measured
- AI-generated release reports claiming zero defects

We ran a trust sprint, documented findings in `docs/internal/AUDIT_REPORT.md`, and fixed the README to state only verifiable facts. See `docs/internal/TRUST_REPORT.md` for verification results.

## Known limitations (v1.0.0)

1. **CLI is not on npm** — build from source
2. **No hosted docs URL** — run VitePress locally
3. **No vendor endorsement** — skills quote public API docs; the repo does not claim official status

## Contributing

The skill format is specified in `SPECIFICATION.md`. New skills should include real examples and valid relationship targets.

Repository: [github.com/Ghost7802/awesome-api-skills](https://github.com/Ghost7802/awesome-api-skills)

If you maintain API tooling or agent workflows, I'd appreciate issues and PRs — especially skills for APIs we have not covered yet.

---

_License: MIT. This post describes v1.0.0 — presentation and documentation polish only; no new runtime features in the launch sprint._
