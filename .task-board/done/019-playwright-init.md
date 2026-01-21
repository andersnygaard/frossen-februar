# Task 019: Initialize Playwright

**Status**: Backlog
**Phase**: 5 - E2E Tests
**Priority**: Medium
**Labels**: testing, e2e
**Depends On**: 016

## Goal

Create @frossen/e2e package with Playwright configuration.

## Acceptance Criteria

- [x] `packages/e2e/package.json` with name "@frossen/e2e"
- [x] devDependencies: @playwright/test
- [x] `packages/e2e/playwright.config.ts`
- [x] baseURL: http://localhost:5173
- [x] webServer: start app dev server
- [x] `npx playwright install` for browsers
- [x] `pnpm --filter @frossen/e2e test` runs (no tests yet)

## Implementation

### package.json
```json
{
  "name": "@frossen/e2e",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}
```

### playwright.config.ts
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm --filter @frossen/app dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    cwd: '../../',
  },
});
```

### Setup
```bash
cd packages/e2e
npx playwright install
mkdir tests
```

## Verification

```bash
pnpm --filter @frossen/e2e test
# Should complete with "no tests found" or similar
```

## Progress Log

**Completed**: 2026-01-21

1. Created `packages/e2e/package.json` with @frossen/e2e naming, @playwright/test ^1.40.0 devDependency, and test/test:ui scripts
2. Created `packages/e2e/playwright.config.ts` with exact configuration including:
   - testDir: ./tests
   - baseURL: http://localhost:5173
   - webServer configured to start app dev server via `pnpm --filter @frossen/app dev`
   - HTML reporter enabled
   - Trace on first retry
3. Created `packages/e2e/tests/.gitkeep` to establish tests directory
4. Ran `pnpm install` - successfully installed @playwright/test as devDependency
5. Ran `npx playwright install chromium` - Chromium browser installed successfully
6. Verified `pnpm --filter @frossen/e2e test` runs with expected "No tests found" message

All acceptance criteria completed and verified.
