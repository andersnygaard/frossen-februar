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
