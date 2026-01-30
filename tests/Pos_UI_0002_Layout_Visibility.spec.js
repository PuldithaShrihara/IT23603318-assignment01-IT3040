import { test, expect } from '@playwright/test';

test('Pos_UI_0002: Verify Layout Elements Visibility', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Verify Logo/Title
  // Adjust locators based on actual page structure if needed
  await expect(page).toHaveTitle("Singlish ↔ English Translator"); 

  // Verify Input Area
  await expect(page.locator('[placeholder="Input Your Singlish Text Here."]')).toBeVisible();

  // Verify Output Area
  // Using the locator strategy from existing tests
  const outputArea = page.locator('text=Sinhala').locator('..').locator('div').nth(1);
  await expect(outputArea).toBeVisible();

  console.log('UI_Test_001 executed successfully');
});