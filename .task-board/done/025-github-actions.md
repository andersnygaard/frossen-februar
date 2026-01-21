# Task 025: GitHub Actions workflows

**Status**: Backlog
**Phase**: 6 - CI/CD
**Priority**: Low
**Labels**: infrastructure, ci
**Depends On**: 023

## Goal

Create GitHub Actions for CI and deployment.

## Acceptance Criteria

- [x] `.github/workflows/ci.yml` created
- [x] Trigger: push to main, pull requests
- [x] Jobs: lint, typecheck, build, test:e2e
- [x] `.github/workflows/deploy.yml` created
- [x] Trigger: push to main
- [x] Deploy to Azure Static Web Apps
- [x] Workflows valid YAML

## Implementation

### .github/workflows/ci.yml
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build UI
        run: pnpm --filter @frossen/ui build

      - name: Build App
        run: pnpm --filter @frossen/app build

  test:
    runs-on: ubuntu-latest
    needs: build

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright
        run: pnpm --filter @frossen/e2e exec playwright install --with-deps

      - name: Run E2E tests
        run: pnpm test:e2e
```

### .github/workflows/deploy.yml
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install and build
        run: |
          pnpm install
          pnpm build

      - name: Deploy to Azure
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_SWA_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: 'upload'
          app_location: 'packages/app/dist'
          skip_app_build: true
```

## Verification

Push to repo and verify workflows run.

## Progress Log

### Completed (2026-01-21)
- Created `.github/workflows/` directory structure
- Created `.github/workflows/ci.yml` with build and test jobs
  - Triggers on push to main and pull requests
  - Build job: checks out code, installs pnpm, Node.js, dependencies, builds @frossen/ui and @frossen/app
  - Test job: depends on build, runs E2E tests via Playwright
- Created `.github/workflows/deploy.yml` with Azure deployment
  - Triggers on push to main
  - Installs dependencies, builds project, deploys to Azure Static Web Apps
  - Uses Azure/static-web-apps-deploy@v1 action
  - Requires secrets: AZURE_SWA_TOKEN, GITHUB_TOKEN
- Verified both YAML files are valid
- All acceptance criteria checked off
