# Contributing to Awesome API Skills

Thank you for your interest in contributing.

## Development setup

Use Node.js 22.19+ (22.x), 24.x, or 26+ and npm.

```bash
git clone https://github.com/Ghost7802/awesome-api-skills.git
cd awesome-api-skills
npm ci
npm run build
npm test
npm run lint
```

## Adding a new skill

1. Scaffold with the generator:

   ```bash
   node scripts/generators/build-skill-v4.js
   ```

2. Write production-quality content in `SKILL.md`.

3. Add runnable examples under `examples/`.

4. Define relationships in `metadata.json`.

5. Rebuild registry artifacts:

   ```bash
   node scripts/dev/build-registry-v1.js
   node scripts/dev/build-knowledge-graph.js
   ```

6. Validate:

   ```bash
   node scripts/dev/run-validation-v2.js
   ```

## Quality standards

- Every skill must contain real, actionable content.
- No placeholder text or TODO sections.
- Code examples should be runnable or clearly scoped as snippets.
- Relationship targets must reference existing skill IDs.

## Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct.

## Regression checks

Run `npm run typecheck`, `npm run validate:skills`, and `npm run test:snapshots` after changes. To deliberately refresh artifact snapshots after reviewing generator changes, run `npx tsx scripts/dev/dogfood.ts --update-snapshots`, then run the snapshot check again.

## npm releases

The release workflow prepares version pull requests on the default `master` branch. Publishing to npm requires the `NPM_TOKEN` GitHub Actions repository secret, containing an npm token with permission to publish the `@awesome-api-skills` packages.

Without that secret, the workflow records that npm publishing was skipped and can still prepare release pull requests. After configuring the secret, the next release workflow run can publish unpublished package versions. Invalid or expired credentials still fail the publish step so release failures remain visible.
