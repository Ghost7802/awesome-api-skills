# Vercel AI SDK Skill

## Overview
The Vercel AI SDK (`ai`) is the standard TypeScript toolkit for building AI applications, agents, and streaming user interfaces across OpenAI, Anthropic, Google Gemini, DeepSeek, and Groq using a unified provider architecture.

## Installation
```bash
npm install ai zod @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/google
```

## Authentication
Each model provider loads its corresponding environment variable automatically on the server:
- `OPENAI_API_KEY` for `@ai-sdk/openai`
- `ANTHROPIC_API_KEY` for `@ai-sdk/anthropic`
- `GOOGLE_GENERATIVE_AI_API_KEY` for `@ai-sdk/google`

## Core Concepts
- **`generateText` / `streamText`**: Unified text generation and token streaming with multi-step tool calling (`maxSteps`).
- **`generateObject` / `streamObject`**: Deterministic structured JSON generation validated against a `zod` schema.
- **`useChat` / `useCompletion`**: React hooks for streaming UI states and tool invocations.

## Common Workflows
1. Define a route handler `/api/chat` using `streamText`.
2. Configure `tools` with `zod` parameter schemas and `execute` async handlers.
3. Return `result.toDataStreamResponse()` to stream text and tool calls to the frontend.

## AI Pitfalls
- **Hallucinating v2/v3 APIs**: Never import `OpenAIStream` or `StreamingTextResponse`. Those were removed in AI SDK v4. Always use `streamText` and `result.toDataStreamResponse()`.
- **Missing `maxSteps` on agentic loops**: When tools have an `execute` function, set `maxSteps: 5` on `streamText` so the SDK automatically feeds tool outputs back to the model.
- **Unvalidated JSON**: Use `generateObject({ model, schema: z.object(...) })` rather than regex-parsing markdown code blocks.

## Production Checklist
- [ ] Using `ai` v4+ core primitives (`streamText`, `generateObject`)
- [ ] Provider packages (`@ai-sdk/openai`, `@ai-sdk/anthropic`) installed and configured server-side
- [ ] Route handlers return `result.toDataStreamResponse()`
- [ ] `maxDuration` exported in serverless route files to prevent timeout on long streams

---
> **Last Verified:** 2026-10-21
