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
