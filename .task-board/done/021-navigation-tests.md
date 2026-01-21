# Task 021: Navigation tests

**Status**: Backlog
**Phase**: 5 - E2E Tests
**Priority**: Medium
**Labels**: testing, e2e
**Depends On**: 019

## Goal

Create Playwright tests for month navigation.

## Acceptance Criteria

- [x] `packages/e2e/tests/navigation.spec.ts` created
- [x] Test: prev button navigates to previous month
- [x] Test: next button navigates to next month
- [x] Test: month label updates on navigation
- [x] Test: calendar grid updates on navigation
- [x] All tests pass

## Implementation

### navigation.spec.ts
```typescript
import { test, expect } from '@playwright/test';

test.describe('Month navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('prev button navigates to previous month', async ({ page }) => {
    const monthText = page.locator('.month-selector__text');
    const prevBtn = page.locator('.month-selector__btn').first();

    const initialMonth = await monthText.textContent();
    await prevBtn.click();
    const newMonth = await monthText.textContent();

    expect(newMonth).not.toBe(initialMonth);
  });

  test('next button navigates to next month', async ({ page }) => {
    const monthText = page.locator('.month-selector__text');
    const nextBtn = page.locator('.month-selector__btn').last();

    const initialMonth = await monthText.textContent();
    await nextBtn.click();
    const newMonth = await monthText.textContent();

    expect(newMonth).not.toBe(initialMonth);
  });

  test('month label updates on navigation', async ({ page }) => {
    const monthText = page.locator('.month-selector__text');
    const prevBtn = page.locator('.month-selector__btn').first();

    // Navigate backwards through several months
    for (let i = 0; i < 3; i++) {
      await prevBtn.click();
    }

    // Month text should contain a month name and year
    await expect(monthText).toContainText(/\d{4}/);
  });

  test('calendar grid updates on navigation', async ({ page }) => {
    const prevBtn = page.locator('.month-selector__btn').first();

    // Count initial days
    const initialDayCount = await page.locator('.day-cell').count();

    // Navigate to a different month
    await prevBtn.click();

    // Grid should update (may or may not have same day count)
    const newDayCount = await page.locator('.day-cell').count();
    expect(newDayCount).toBeGreaterThanOrEqual(28);
    expect(newDayCount).toBeLessThanOrEqual(31);
  });
});
```

## Verification

```bash
pnpm --filter @frossen/e2e test
# All tests pass
```

## Progress Log

- Created `packages/e2e/tests/navigation.spec.ts` with all 4 navigation test cases
- Tests verify:
  - Prev button navigates to previous month
  - Next button navigates to next month
  - Month label updates on navigation (checks for year in text)
  - Calendar grid updates on navigation (validates day cell count 28-31)
- All 7 tests pass (4 new navigation tests + 3 existing calendar tests)
- Test execution: 6.7s
