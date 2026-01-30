import { test, expect } from '@playwright/test';

test('Neg_Fun_0001: Joined words not separated', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input length type: S
  const singlishInput = 'mamageDharayanavaa';
  const expectedOutput = 'මම ගෙදර යනවා';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect correct segmentation
  // This fails if Actual output is 'මමගෙදරයනවා'
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});
