# Task 020: Calendar interaction tests

**Status**: Backlog
**Phase**: 5 - E2E Tests
**Priority**: Medium
**Labels**: testing, e2e
**Depends On**: 019

## Goal

Create Playwright tests for calendar day clicking behavior.

## Acceptance Criteria

- [x] `packages/e2e/tests/calendar.spec.ts` created
- [x] Test: day click cycles through states
- [x] Test: multiple days can have different states
- [x] Test: future days are not clickable
- [x] All tests pass

## Implementation

### calendar.spec.ts
```typescript
import { test, expect } from '@playwright/test';

test.describe('Calendar interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear localStorage for clean state
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('day click cycles through states', async ({ page }) => {
    const day1 = page.locator('.day-cell').first();

    // Initial: no state class
    await expect(day1).not.toHaveClass(/day-cell--success/);

    // Click 1: success
    await day1.click();
    await expect(day1).toHaveClass(/day-cell--success/);

    // Click 2: warning
    await day1.click();
    await expect(day1).toHaveClass(/day-cell--warning/);

    // Click 3: fail
    await day1.click();
    await expect(day1).toHaveClass(/day-cell--fail/);

    // Click 4: back to none
    await day1.click();
    await expect(day1).not.toHaveClass(/day-cell--success|day-cell--warning|day-cell--fail/);
  });

  test('multiple days can have different states', async ({ page }) => {
    const day1 = page.locator('.day-cell').first();
    const day2 = page.locator('.day-cell').nth(1);

    await day1.click(); // success
    await day2.click(); // success
    await day2.click(); // warning

    await expect(day1).toHaveClass(/day-cell--success/);
    await expect(day2).toHaveClass(/day-cell--warning/);
  });

  test('future days are not clickable', async ({ page }) => {
    const disabledDay = page.locator('.day-cell--disabled').first();

    await expect(disabledDay).toBeDisabled();
  });
});
```

## Verification

```bash
pnpm --filter @frossen/e2e test
# All tests pass
```

## Progress Log

**Completed**: 2026-01-21
- Created `packages/e2e/tests/calendar.spec.ts` with all four test cases
- Test 1: Day click cycles through states (none -> success -> warning -> fail -> none) ✓
- Test 2: Multiple days can have different states independently ✓
- Test 3: Future days (disabled) are not clickable ✓
- All 3 tests passed successfully in `pnpm --filter @frossen/e2e test` execution
- All acceptance criteria completed
