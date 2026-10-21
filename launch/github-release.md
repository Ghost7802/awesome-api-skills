# Awesome API Skills v1.0.0

We're releasing **Awesome API Skills** — a repository of structured API knowledge for AI coding agents.

## What's in the box

- **100 skills** in `skills/` — Stripe, PostgreSQL, Next.js, AWS S3, Twilio, and 95 more
- Each skill includes `SKILL.md`, runnable examples, and `metadata.json`
- A **knowledge graph** (`registry/graph.json`) linking related skills
- Workspace packages for validation, registry tooling, and a CLI (source-only today)
- Local **VitePress docs** — `pnpm dev` after build

## Quick start

```bash
git clone https://github.com/Ghost7802/awesome-api-skills.git
cd awesome-api-skills
pnpm install
pnpm build
```

Use a skill by pointing your agent at `skills/<name>/SKILL.md`, or copy the folder into your project.

## Not included yet

- The CLI is **not on npm** — clone and build from source
- No hosted documentation site — run docs locally for now

## License

MIT. Contributions welcome — see `CONTRIBUTING.md`.

**Repository:** https://github.com/Ghost7802/awesome-api-skills
