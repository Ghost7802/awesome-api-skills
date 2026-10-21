# Model Context Protocol (MCP) Skill

## Overview
The Model Context Protocol (`@modelcontextprotocol/sdk`) standardizes how AI applications and coding agents connect to external data sources, tools, and prompt templates over `stdio` or HTTP SSE/Streamable transports.

## Installation
```bash
npm install @modelcontextprotocol/sdk zod
```

## Core Concepts
- **`McpServer`**: High-level server coordinator for registering tools, resources, and prompts.
- **`StdioServerTransport`**: Standard input/output JSON-RPC transport used by Claude Desktop, Claude Code, and Cursor.
- **`server.tool()`**: Registers an executable tool with a Zod input schema.

## AI Pitfalls
- **Corrupting `stdio` with `console.log()`**: When using `StdioServerTransport`, `process.stdout` carries JSON-RPC 2.0 messages. Calling `console.log()` breaks the protocol parser. Always use `console.error()` for logging.
- **Unstructured Tool Errors**: Catch errors inside tool handlers and return `{ content: [{ type: "text", text: err.message }], isError: true }` so the LLM can self-correct.

## Production Checklist
- [ ] Zero `console.log` calls in `stdio` server path (`console.error` only)
- [ ] Tool schemas validated with `zod` raw shape objects
- [ ] Graceful shutdown on `SIGINT` / `SIGTERM`

---
> **Last Verified:** 2026-10-21
