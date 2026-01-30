import { test, expect } from '@playwright/test';

test('Pos_Fun_0023: Convert polite request sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  const singlishInput = 'traffic thiyena nisaa api poddak enna late venavaa.';
  const expectedSinhala = 'traffic තියෙන නිසා අපි පොඩ්ඩක් එන්න late වෙනවා.';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });
  await expect(inputField).toHaveValue(singlishInput);

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);
  await expect(outputField).toHaveText(expectedSinhala, { timeout: 10000 });
});
