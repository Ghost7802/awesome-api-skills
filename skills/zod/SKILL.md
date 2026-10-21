# Zod Schema Validation Skill

## Overview
Zod is a TypeScript-first schema declaration and validation library used across API route handlers, tRPC procedures, environment variable checks, and AI structured output schemas.

## Installation
```bash
npm install zod
```

## Core Concepts
- **`z.object()`**: Defines object validation schemas and strips unknown keys by default.
- **`.safeParse(input)`**: Returns `{ success: true, data }` or `{ success: false, error }` without throwing exceptions.
- **`z.infer<typeof Schema>`**: Extracts the exact static TypeScript type from a runtime schema.

## AI Pitfalls
- **OpenAI Structured Outputs Compatibility**: OpenAI's strict JSON schema mode rejects `.optional()` fields unless they are `.nullable()`. Use `z.string().nullable()` when passing Zod schemas to LLM structured output helpers.
- **Query String Coercion**: URL search params are always strings. Use `z.coerce.number().int().positive()` for pagination parameters like `?page=2`.

## Production Checklist
- [ ] HTTP route handlers use `.safeParse()` and return `400 Bad Request` with `result.error.flatten()`
- [ ] Environment variables validated at startup via an `EnvSchema`
- [ ] Types exported via `type Payload = z.infer<typeof PayloadSchema>`

---
> **Last Verified:** 2026-10-21
