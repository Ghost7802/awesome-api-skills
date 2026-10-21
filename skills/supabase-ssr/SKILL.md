# Supabase SSR Auth & Cookie Management Skill

## Overview
`@supabase/ssr` enables secure, cookie-based authentication across Server Components, Server Actions, Middleware, and Edge Route Handlers.

## Installation
```bash
npm install @supabase/supabase-js @supabase/ssr
```

## AI Pitfalls
- **Never use `@supabase/auth-helpers-nextjs`**: That package is officially deprecated. Always use `@supabase/ssr`.
- **Never trust `getSession()` on the server**: `supabase.auth.getSession()` reads unverified cookies directly. Always call `const { data: { user } } = await supabase.auth.getUser()` to revalidate the JWT against Supabase Auth servers.
- **Use `getAll` / `setAll`**: Do not use legacy `get`, `set`, `remove` cookie handlers.

## Production Checklist
- [ ] `@supabase/ssr` installed and configured with `getAll` and `setAll`
- [ ] Protected routes call `await supabase.auth.getUser()`
- [ ] Middleware refreshes expired auth tokens on incoming requests

---
> **Last Verified:** 2026-10-21
