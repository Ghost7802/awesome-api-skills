<div align="center">

![Awesome API Skills — Visual Overview](https://raw.githubusercontent.com/ashish7802/awesome-api-skills/master/media/banner.png)

# Awesome API Skills

### Production-ready, schema-validated `SKILL.md` context specifications that teach AI coding agents how to work with real-world APIs without hallucinating.

<p>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/skills-120%20verified-38bdf8?style=flat-square" alt="120 verified skills">
  <img src="https://img.shields.io/badge/graph-260%20edges-818cf8?style=flat-square" alt="260 graph edges">
  <img src="https://img.shields.io/badge/runtime-React%20%2B%20Vite-10b981?style=flat-square" alt="React + Vite">
</p>

<p>
  <a href="./index.html"><strong>🔍 Interactive Web Application</strong></a> · 
  <a href="./docs/BENCHMARKS_AND_EXAMPLES.md"><strong>📊 Benchmarks & Diffs</strong></a> · 
  <a href="./docs/CLI_USAGE.md"><strong>💻 CLI Reference</strong></a> · 
  <a href="#quick-start"><strong>🚀 Quick Start</strong></a> · 
  <a href="#contributing"><strong>🤝 Contributing</strong></a>
</p>

</div>

---

## 💡 The Problem & The Solution

When AI coding agents (**Claude Code**, **Cursor**, **Cline**, **Continue**, **Windsurf**, or **OpenAI Codex**) generate code for modern APIs, they frequently introduce critical defects caused by stale training data:

* ❌ **Broken Webhook Verification**: Parsing raw request bodies with `express.json()` before verifying cryptographic signatures (e.g. Stripe, Svix, Paddle), causing `SignatureVerificationError`.
* ❌ **Deprecated SDK Methods**: Generating legacy SDK constructors or middleware (e.g. Clerk v4 `authMiddleware` instead of v5 `clerkMiddleware`, outdated Vercel AI SDK v2 `OpenAIStream` instead of v4 `streamText`).
* ❌ **Unbatched HTTP Loops**: Executing unbatched loops against transactional APIs (Resend, SendGrid, Twilio), resulting in `HTTP 429 Too Many Requests`.
* ❌ **Missing Connection Pooling**: Spawning unpooled database connections inside Serverless functions (Neon, Supabase, PostgreSQL), exhausting connection limits.

`awesome-api-skills` resolves this by providing **120 curated, schema-validated `SKILL.md` context files**. Dropping a skill into your workspace (`.claude/skills/`, `.cursor/skills/`, `.agents/skills/`) provides deterministic parameters, anti-hallucination checklists, and battle-tested code patterns before a single line of code is generated.

---

## ⚡ Real-World Impact: Before vs. After

| Integration Domain | ❌ Without Skill (LLM Guessing) | ✅ With `SKILL.md` (Context Injected) |
| :--- | :--- | :--- |
| **Stripe Webhooks** | Parses JSON with `express.json()`, corrupting raw payload buffer and failing signature verification. | Injects `express.raw({ type: 'application/json' })` so `stripe.webhooks.constructEvent()` verifies authentic HMAC signatures. |
| **DeepSeek R1 / V3** | Attempts standard OpenAI chat format without routing reasoning tokens, losing chain-of-thought traces. | Configures `baseURL: "https://api.deepseek.com"` and separates `delta.reasoning_content` from `delta.content`. |
| **Qdrant Vector DB** | Upserts embeddings with dimension mismatch against collection configurations. | Enforces exact vector dimension matching and pre-creates payload indexes on filtered fields. |
| **Clerk Next.js Auth** | Generates deprecated `authMiddleware({ publicRoutes })` causing App Router runtime crashes. | Uses `clerkMiddleware()` with `createRouteMatcher()` matching Next.js App Router specifications. |
| **Resend Emails** | Runs a naive `for...of` loop with individual `send()` calls, taking minutes and hitting rate limits. | Packages payloads into `resend.batch.send([])`, sending up to 500 emails in a single low-latency HTTP roundtrip. |
| **Inngest Workflows** | Calls non-deterministic functions (e.g. `Date.now()`, random UUIDs) directly in handler bodies. | Wraps all side-effects and external operations inside `step.run()` for step memoization and durable recovery. |

> 📖 **Review complete runnable diffs in [docs/BENCHMARKS_AND_EXAMPLES.md](./docs/BENCHMARKS_AND_EXAMPLES.md).**

---

## 🚀 Quick Start

### 1. Direct Copy into Your Project (Zero Dependencies)

Copy the desired skill directory directly into your AI coding agent's configuration:

```bash
# Clone the repository shallowly
git clone --depth 1 https://github.com/ashish7802/awesome-api-skills.git

# Copy Stripe skill to Claude Code
cp -r awesome-api-skills/skills/stripe .claude/skills/

# Copy DeepSeek skill to Cursor
cp -r awesome-api-skills/skills/deepseek .cursor/skills/

# Copy Qdrant & Inngest skills to generic agent workspace
cp -r awesome-api-skills/skills/qdrant .agents/skills/
cp -r awesome-api-skills/skills/inngest .agents/skills/
```

Then prompt your assistant:
> *"Use `.claude/skills/stripe/SKILL.md` and `.claude/skills/inngest/SKILL.md` to implement subscription webhooks."*

---

### 2. Using the CLI & NPM Package

You can search, validate, and inspect skills directly using the CLI:

```bash
# Search for skills matching keywords
npx @awesome-api-skills/cli search "embeddings vector rag"

# Validate all skills in your workspace
npx @awesome-api-skills/cli validate

# Diagnose repository & schema integrity
npx @awesome-api-skills/cli doctor
```

---

## 📚 Skill Catalog (116 Verified Skills)

Our catalog covers **116 verified skills** across 15 core technical domains:

| Category | Skills Included |
| :--- | :--- |
| **AI, LLM & Reasoning** | `deepseek`, `openai`, `anthropic`, `gemini`, `groq`, `mistral`, `cohere`, `elevenlabs`, `replicate`, `ollama`, `vllm`, `langchain`, `llamaindex` |
| **Vector DB & Search** | `qdrant`, `weaviate`, `pinecone`, `meilisearch`, `typesense`, `algolia`, `xquik` |
| **Payments & Billing** | `stripe`, `paddle`, `lemon-squeezy`, `braintree`, `revenuecat`, `plaid` |
| **Workflows & Background** | `inngest`, `trigger-dev`, `bullmq`, `kafka`, `rabbitmq`, `nats`, `redis-streams` |
| **Auth & Security** | `svix`, `unkey`, `clerk`, `auth0`, `okta`, `better-auth`, `jwt`, `oauth2`, `openid-connect` |
| **Databases & ORMs** | `postgresql`, `mysql`, `sqlite`, `mongodb-atlas`, `planetscale`, `neon`, `turso`, `drizzle`, `prisma` |
| **Caching & KV** | `redis`, `upstash` |
| **Cloud & Object Storage** | `aws-s3`, `aws-dynamodb`, `azure-blob-storage`, `google-cloud-storage` |
| **Communications & Email** | `resend`, `postmark`, `sendgrid`, `twilio`, `novu`, `slack`, `discord` |
| **Backend Frameworks** | `express`, `fastapi`, `nestjs`, `hono`, `trpc` |
| **Frontend Frameworks** | `react`, `vue`, `nextjs`, `nuxt`, `sveltekit` |
| **Deployment & Edge** | `vercel`, `railway`, `render`, `fly`, `digitalocean`, `cloudflare`, `cloudflare-workers`, `deno-deploy` |
| **Infrastructure & DevOps** | `docker`, `kubernetes`, `helm`, `terraform`, `pulumi`, `argo-cd`, `github-actions`, `traefik`, `nginx`, `caddy`, `turborepo` |
| **Observability & Analytics**| `datadog`, `sentry`, `prometheus`, `grafana`, `loki`, `jaeger`, `opentelemetry`, `mixpanel`, `posthog` |
| **Dev Tools & Platforms** | `eslint`, `prettier`, `biome`, `vitest`, `playwright`, `git`, `github`, `shopify`, `mapbox`, `convex` |

> 🌐 **Browse the searchable interactive directory at [docs/index.html](./docs/index.html).**

---

## 🏗️ Monorepo Architecture

`awesome-api-skills` is organized as a high-performance TypeScript workspace:

```
├── skills/                     # 116 SKILL.md specs & metadata.json contracts
├── packages/
│   ├── cli/                    # Production CLI binary (search, validate, doctor)
│   ├── core/                   # Orchestration runtime and workspace validation
│   ├── validator/              # JSON Schema & Zod structural validation engine
│   ├── registry/               # Knowledge graph index (248 edges) & search resolver
│   ├── generator/              # Template engine & SKILL.md compiler
│   ├── sdk/                    # Programmatic Node.js SDK
│   └── shared-types/           # Shared TypeScript interfaces & types
├── apps/
│   └── docs/                   # Dark-mode VitePress documentation & Skill Studio
├── scripts/
│   ├── dev/                    # Benchmark suite & verification scripts
│   └── generators/             # Graph and metadata update utilities
└── vercel.json                 # Zero-configuration Vercel deployment spec
```

---

## 🎯 Verification & Quality Assurance

Every skill in this repository is strictly governed by automated verification pipelines:

1. **Deterministic Schema Enforcement**: 100% of skills validate against the `SKILL.md v1.0` schema specification via `packages/validator`.
2. **Automated Unit Tests**: 38 comprehensive tests run across all packages in CI with Vitest.
3. **Verified Knowledge Graph**: 248 validated relationship edges map out prerequisites, alternatives, and full-stack integration recipes.
4. **Sub-16ms Performance**: In-memory search indexing and relationship traversals execute in under 16ms.

---

## 🤝 Contributing

We welcome contributions of new API skills and improvements to existing documentation!

1. **Fork and clone** the repository:
   ```bash
   git clone https://github.com/ashish7802/awesome-api-skills.git
   cd awesome-api-skills
   npm ci
   npm run build:packages
   ```
2. **Create your skill** under `skills/<skill-name>/` containing `SKILL.md` and `metadata.json`.
3. **Run schema validation & test suite**:
   ```bash
   npm run validate:skills
   npm test
   ```
4. **Submit a Pull Request**. Our automated GitHub Actions workflow will review and validate the submission.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full style guidelines and scoring rules.

---

## 📄 License

Distributed under the [MIT License](./LICENSE). © 2026 Awesome API Skills Team.
