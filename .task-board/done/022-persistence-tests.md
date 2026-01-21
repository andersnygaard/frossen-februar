# Task 022: Persistence tests

**Status**: Backlog
**Phase**: 5 - E2E Tests
**Priority**: Medium
**Labels**: testing, e2e
**Depends On**: 019

## Goal

Create Playwright tests for localStorage persistence.

## Acceptance Criteria

- [x] `packages/e2e/tests/persistence.spec.ts` created
- [x] Test: data persists after page reload
- [x] Test: data persists across months
- [x] All tests pass

## Implementation

### persistence.spec.ts
```typescript
import { test, expect } from '@playwright/test';

test.describe('Data persistence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('data persists after page reload', async ({ page }) => {
    const day1 = page.locator('.day-cell').first();

    // Set a state
    await day1.click();
    await expect(day1).toHaveClass(/day-cell--success/);

    // Reload the page
    await page.reload();

    // State should persist
    const day1After = page.locator('.day-cell').first();
    await expect(day1After).toHaveClass(/day-cell--success/);
  });

  test('data persists across months', async ({ page }) => {
    const day1 = page.locator('.day-cell').first();
    const prevBtn = page.locator('.month-selector__btn').first();
    const nextBtn = page.locator('.month-selector__btn').last();

    // Set a state
    await day1.click();
    await expect(day1).toHaveClass(/day-cell--success/);

    // Navigate away and back
    await prevBtn.click();
    await nextBtn.click();

    // State should still be there
    const day1After = page.locator('.day-cell').first();
    await expect(day1After).toHaveClass(/day-cell--success/);
  });

  test('stats update correctly', async ({ page }) => {
    const day1 = page.locator('.day-cell').first();
    const successStat = page.locator('.stats-card--success .stats-card__value');

    // Initially 0
    await expect(successStat).toHaveText('0');

    // Click day to success
    await day1.click();
    await expect(successStat).toHaveText('1');

    // Click to warning (no longer success)
    await day1.click();
    await expect(successStat).toHaveText('0');
  });
});
```

## Verification

```bash
pnpm --filter @frossen/e2e test
# All tests pass
```

## Progress Log

**Implementation Complete**

- Created `packages/e2e/tests/persistence.spec.ts` with all 3 test cases:
  - Test 1: "data persists after page reload" - Validates state persists through page reload
  - Test 2: "data persists across months" - Validates state persists when navigating between months
  - Test 3: "stats update correctly" - Validates stats card updates correctly when day state changes
- All tests pass successfully (10/10 passing)
- Bonus test included as specified in task file (stats update correctly)
- Test implementation follows project conventions (beforeEach setup, locator patterns, class assertions)
