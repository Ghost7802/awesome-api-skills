# Upstash Ratelimit Skill

## Overview
`@upstash/ratelimit` provides low-latency HTTP-based rate limiting (Fixed Window, Sliding Window, Token Bucket) designed for Cloudflare Workers, Vercel Edge Middleware, and serverless functions.

## Installation
```bash
npm install @upstash/ratelimit @upstash/redis
```

## AI Pitfalls
- **Declare `Ratelimit` at Module Scope**: Declare `const ratelimit = new Ratelimit(...)` outside the request function so the `ephemeralCache` Map persists across warm serverless invocations.
- **Await or `waitUntil(pending)`**: When `analytics: true` is enabled, `const { success, pending } = await ratelimit.limit(id)` returns a `pending` Promise that must be passed to `event.waitUntil(pending)`.

## Production Checklist
- [ ] `Ratelimit` instance declared at module top-level
- [ ] `ephemeralCache: new Map()` configured to save Redis calls when a client is already blocked
- [ ] Returns HTTP `429 Too Many Requests` when `!success`

---
> **Last Verified:** 2026-10-21
