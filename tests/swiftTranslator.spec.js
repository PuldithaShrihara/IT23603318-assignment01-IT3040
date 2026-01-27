const { test, expect } = require('@playwright/test');

test('Swift Translator – valid input', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  // Enter Singlish text
  await page.fill('textarea', 'mama gedara yanawa');

  // Click Translate
  await page.click('button');

  // Wait for translation to process
  await page.waitForTimeout(2000);

  // Verify that translation produced Sinhala output somewhere on page
  await expect(page.locator('body')).toContainText(/[අ-ෆ]/);
});

test('Swift Translator – empty input does not crash', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  // Click Translate with empty input
  await page.click('button');

  // Wait briefly
  await page.waitForTimeout(1000);

  // Verify page is still visible and textarea exists
  await expect(page.locator('textarea')).toBeVisible();
});
