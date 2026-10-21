# GitHub Repository Profile

Use these values when configuring the repository on GitHub.

---

## Description

Structured API skills for AI coding agents — 100 markdown skill packages with examples and metadata.

---

## Website (Homepage)

Leave blank until a public docs site is deployed.

For local docs after clone:

```bash
pnpm install && pnpm build && pnpm dev
```

Then open `http://localhost:5173`.

---

## Topics

Copy-paste into GitHub **Topics**:

```
ai-agents
cursor
claude
api-documentation
developer-tools
markdown
monorepo
typescript
open-source
llm
coding-assistant
skills
```

---

## Social preview

1. Open **Settings → General → Social preview**
2. Upload `social-preview.png` from the repository root (1200×630)
3. Confirm the preview shows the typography-first card before saving

Source files:

- `social-preview.png` — GitHub upload asset
- `.design/social-preview.svg` — editable vector source
- `.design/banner.svg` — README banner

---

## About section (sidebar)

| Field       | Value                                      |
| :---------- | :----------------------------------------- |
| Description | Structured API skills for AI coding agents |
| Website     | _(empty until published)_                  |
| Topics      | See list above                             |
| Releases    | Enable **Releases**                        |
| Packages    | _(none until npm publish)_                 |

---

## Default branch

**Recommended:** `main`

CI workflows in `.github/workflows/` trigger on `main`. If the default branch is `master`, either:

- Rename the default branch to `main` on GitHub, or
- Update workflow `branches` filters to match your default branch

---

## License

| Check                  | Status                                  |
| :--------------------- | :-------------------------------------- |
| `LICENSE` file present | Yes — MIT                               |
| SPDX in GitHub UI      | Set to **MIT** under Settings → General |

---

## README links audit

| Link              | Target                                     | Notes                                   |
| :---------------- | :----------------------------------------- | :-------------------------------------- |
| Banner            | `.design/banner.svg`                       | Local asset                             |
| License badge     | `Ghost7802/awesome-api-skills`            | Verify repo is public for badge         |
| Build badge       | `build.yml` workflow                       | Requires `main` branch + successful run |
| Clone URL         | `github.com/Ghost7802/awesome-api-skills` | Matches remote                          |
| `skills/` links   | Local paths                                | Verifiable in repo                      |
| `CONTRIBUTING.md` | Local                                      | Verifiable                              |
| `LICENSE`         | Local                                      | Verifiable                              |

---

## First release checklist

- [ ] Default branch aligned with CI (`main`)
- [ ] Social preview uploaded
- [ ] Description and topics set
- [ ] License set to MIT in GitHub UI
- [ ] Create release `v1.0.0` using `launch/github-release.md` as the body
- [ ] Attach no binaries unless you publish packages later
