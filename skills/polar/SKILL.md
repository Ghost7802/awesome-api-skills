# Polar Billing & Merchant of Record Skill

## Overview
Polar (`@polar-sh/sdk`) provides developer-first billing, subscriptions, automated license keys, and global tax compliance (Merchant of Record).

## Installation
```bash
npm install @polar-sh/sdk
```

## AI Pitfalls
- **Sandbox vs Production Server**: When testing with Sandbox tokens, explicitly pass `server: 'sandbox'` to `new Polar({ accessToken, server: 'sandbox' })`.
- **Webhook Signature Verification**: Always pass the raw request string body and headers to `validateEvent` from `@polar-sh/sdk/webhooks`.

## Production Checklist
- [ ] `POLAR_ACCESS_TOKEN` and `POLAR_WEBHOOK_SECRET` stored in server environment
- [ ] Webhook handler verifies signatures via `validateEvent`
- [ ] Checkout sessions pass `products: [productId]` array

---
> **Last Verified:** 2026-10-21
