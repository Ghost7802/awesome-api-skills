# Cloudflare D1 Serverless SQL Skill

## Overview
Cloudflare D1 is a globally distributed serverless SQL database built on SQLite and tightly integrated with Cloudflare Workers and Pages.

## Configuration (`wrangler.toml`)
```toml
[[d1_databases]]
binding = "DB"
database_name = "prod-app-db"
database_id = "xxxx-xxxx-xxxx-xxxx"
```

## Core Concepts
- **`env.DB.prepare(sql)`**: Compiles a parameterized SQL statement.
- **`.bind(...values)`**: Safely binds positional `?` or `?1` parameters.
- **`.all()` / `.first()` / `.run()`**: Executes read or write statements.
- **`env.DB.batch([...])`**: Executes an array of prepared statements in a single atomic transaction.

## AI Pitfalls
- **Interactive SQL Transactions**: D1 does not allow `BEGIN TRANSACTION` over HTTP/Worker bindings. Always use `await env.DB.batch([stmt1, stmt2])` for atomic rollbacks.
- **Unbound Parameters**: Never template variables into SQL strings. Always chain `.bind(val1, val2)`.

## Production Checklist
- [ ] All queries use `.prepare().bind()`
- [ ] Atomic writes use `env.DB.batch([])`
- [ ] Schema migrations managed via `wrangler d1 migrations apply`

---
> **Last Verified:** 2026-10-21
