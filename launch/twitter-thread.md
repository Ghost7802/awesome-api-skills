# Twitter / X Thread

Post as a numbered thread. Each block is one tweet (under 280 chars where possible).

---

**1/8**

We just shipped Awesome API Skills v1.0.0.

100 structured API skill packages for AI coding agents — markdown, examples, metadata.

Not hype. Count the folders. MIT licensed.

https://github.com/Ghost7802/awesome-api-skills

---

**2/8**

The idea is simple:

Instead of hoping your agent memorizes Stripe's API, give it `skills/stripe/SKILL.md`.

Same for PostgreSQL, Next.js, Twilio, AWS S3, Pinecone — 96 more.

---

**3/8**

Each skill is a directory:

• SKILL.md — what the agent reads
• examples/ — code samples
• metadata.json — categories + relationships

Copy a folder into your project. Point the agent at the file.

---

**4/8**

There's also a knowledge graph (`registry/graph.json`).

Skills declare dependencies — drizzle → postgresql, nestjs → express, etc.

Relationships are in metadata, not guessed at runtime.

---

**5/8**

Monorepo includes validator, registry tooling, generator, and a CLI.

Important: the CLI is **not on npm yet**. Clone, `pnpm install`, `pnpm build`.

We're not pretending otherwise.

---

**6/8**

Before launch we ran a trust sprint:

• removed fake domains and npm badges
• rewrote README for verifiable claims only
• deleted AI-generated "release ready" reports

`docs/internal/TRUST_REPORT.md` documents all of it.

---

**7/8**

Quick start:

```
git clone https://github.com/Ghost7802/awesome-api-skills
pnpm install && pnpm build && pnpm dev
```

Local docs on :5173. 28 tests passing.

---

**8/8**

If you use Cursor or Claude Code with APIs daily, try one skill this week.

Contributions welcome — `CONTRIBUTING.md`

⭐ if this saves you a hallucinated webhook handler.

https://github.com/Ghost7802/awesome-api-skills
