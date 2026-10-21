# Reddit Post

**Suggested subreddits:** r/cursor, r/ClaudeAI, r/programming, r/opensource

**Title:** I open-sourced 100 structured API skill packages for AI coding agents (markdown + examples, no npm CLI yet)

---

**Body:**

I've been working on a repo called **Awesome API Skills** and just tagged v1.0.0.

**What it is:** 100 directories under `skills/`, each covering one API or tool (Stripe, PostgreSQL, Next.js, Vercel, Twilio, etc.). Every skill has:

- `SKILL.md` — structured reference text meant for an LLM to read
- `examples/` — code samples
- `metadata.json` — categories and relationships to other skills

**How I use it:** I copy or symlink a skill into my project (e.g. `skills/stripe/`) and tell Cursor or Claude Code to follow `SKILL.md` when working on payment code. It's not a magic plugin — it's organized markdown that stays in your repo context.

**What's actually in the monorepo:** validator, registry JSON, knowledge graph (`registry/graph.json`), VitePress docs, and a CLI package. The CLI is **not published to npm** — you clone and `pnpm build`. I wanted to be upfront about that because the README used to claim otherwise and we cleaned that up before launch.

**Numbers you can verify yourself:**

- 100 skill folders (just `ls skills | wc -l`)
- 28 tests in the workspace packages
- MIT license

**Before this release** we did a "trust sprint" — removed fake registry URLs, npm install instructions for unpublished packages, and AI-generated release reports. There's a `docs/internal/AUDIT_REPORT.md` and `docs/internal/TRUST_REPORT.md` if you're curious.

**Clone:**

```bash
git clone https://github.com/Ghost7802/awesome-api-skills.git
cd awesome-api-skills
pnpm install
pnpm build
pnpm dev   # local docs at localhost:5173
```

Repo: https://github.com/Ghost7802/awesome-api-skills

Happy to answer questions about the skill format (`SPECIFICATION.md`) or how relationships in the graph are defined.

**Edit:** CLI on npm is on the roadmap but not part of v1.0.0. No `$ npm install -g` yet.
