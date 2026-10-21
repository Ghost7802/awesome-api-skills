# LangGraph Agent Orchestration Skill

## Overview
LangGraph models agent workflows as stateful graphs with nodes, directed edges, conditional routing, and persistent checkpointers for reliable cyclic reasoning and human-in-the-loop interrupts.

## Installation
```bash
npm install @langchain/langgraph @langchain/core @langchain/openai
pip install langgraph langchain-openai
```

## Core Concepts
- **`StateGraph`**: Defines shared state channels and reducers across nodes.
- **Nodes**: Async functions taking `(state, config)` and returning a partial state update.
- **Conditional Edges**: Dynamic routing functions (`addConditionalEdges`) deciding the next node or `END`.
- **Checkpointers**: Persist graph state at every super-step for time-travel and thread resumption.

## AI Pitfalls
- **Direct State Mutation**: Never mutate `state.messages.push(...)` directly. Return `{ messages: [newMessage] }` so the `messagesStateReducer` appends cleanly.
- **Missing `thread_id`**: When a graph is compiled with `{ checkpointer }`, every `.invoke()` or `.stream()` call must pass `{ configurable: { thread_id: "..." } }`.
- **Infinite Loops**: Always enforce a `recursionLimit` in config and ensure conditional edges have a guaranteed path to `END`.

## Production Checklist
- [ ] State channels use explicit reducer annotations (`Annotation.Root` in TS / `add_messages` in Python)
- [ ] Every cyclic path has a conditional exit to `END`
- [ ] Checkpointer backed by durable storage (`PostgresSaver`) in production

---
> **Last Verified:** 2026-10-21
