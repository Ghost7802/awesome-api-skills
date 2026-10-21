# better-sqlite3 Skill

## Overview
`better-sqlite3` provides a high-speed synchronous C++ binding for SQLite in Node.js, outperforming asynchronous drivers by eliminating mutex locking and event-loop roundtrips.

## Installation
```bash
npm install better-sqlite3
npm install -D @types/better-sqlite3
```

## AI Pitfalls
- **Synchronous API**: Never `await` `stmt.get()`, `stmt.all()`, or `stmt.run()`. They return results synchronously.
- **No `async` in `db.transaction()`**: `db.transaction(fn)` immediately commits or rolls back when `fn` returns. Passing an `async` function causes the transaction to commit before the Promise resolves!
- **Enable WAL Mode**: Always run `db.pragma('journal_mode = WAL')` immediately upon database initialization.

## Production Checklist
- [ ] `db.pragma('journal_mode = WAL')` enabled
- [ ] `db.pragma('foreign_keys = ON')` enabled
- [ ] Bulk inserts wrapped in `db.transaction()`

---
> **Last Verified:** 2026-10-21
