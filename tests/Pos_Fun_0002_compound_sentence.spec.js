import { test, expect } from '@playwright/test';

test('Pos_Fun_0002: Convert compound sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  const singlishInput = 'mama vaeda karanavaa saha oyaa kathaa karanavaa.';
  const expectedSinhala = 'මම වැඩ කරනවා සහ ඔයා කතා කරනවා.';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.fill(singlishInput);
  await inputField.dispatchEvent('input');
  await expect(inputField).toHaveValue(singlishInput);

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);
  await expect(outputField).toHaveText(expectedSinhala, { timeout: 30000 });
});
