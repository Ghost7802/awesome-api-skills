# Launch Announcement

**Subject:** Awesome API Skills v1.0.0 — structured API knowledge for AI coding agents

---

Today we're publishing **Awesome API Skills v1.0.0**, an open-source collection of API reference material designed for AI coding agents.

### The problem

When agents work with APIs, they often guess SDK versions, invent endpoints, and mix deprecated patterns. Pasting raw documentation into a chat is slow and inconsistent.

### What we built

A repository of **100 skills** — one directory per API or tool. Each skill contains:

- `SKILL.md` — structured instructions an agent can read
- `examples/` — code samples in common languages
- `metadata.json` — categories, relationships, and links

Skills cover payments (Stripe), databases (PostgreSQL, Neon), frameworks (Next.js), cloud APIs (AWS S3, Vercel), communications (Twilio), and more.

A **knowledge graph** in `registry/graph.json` records how skills relate — for example, ORMs linking to database skills.

### How to use it

```bash
git clone https://github.com/Ghost7802/awesome-api-skills.git
cd awesome-api-skills
pnpm install
pnpm build
```

Point your agent at `skills/stripe/SKILL.md`, or copy a skill folder into your project.

Works with any agent that reads markdown — Cursor, Claude Code, and similar tools.

### What's honest about this release

- **100 skills** — count the directories under `skills/`
- **MIT licensed**
- **28 tests** in the monorepo
- **CLI exists in source** but is **not published to npm yet**

We removed unverifiable marketing and fake infrastructure links before launch. See `docs/internal/TRUST_REPORT.md` for the full audit.

### Get involved

- Repository: https://github.com/Ghost7802/awesome-api-skills
- Contributing: see `CONTRIBUTING.md`
- Specification: see `SPECIFICATION.md`

Thank you to everyone who reviewed skills and tooling before this release.
