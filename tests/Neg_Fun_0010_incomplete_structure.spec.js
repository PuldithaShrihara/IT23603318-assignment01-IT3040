import { test, expect } from '@playwright/test';

test('Neg_Fun_0010: Heavy typos produce unreadable Sinhala', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input length type: S
  const singlishInput = 'mta gdhr ynva';
  const expectedOutput = 'මට ගෙදර යනවා';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect correction of typos
  // This fails if Actual output is 'මට ගදහ්ර යනව' (literal garbled mapping)
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});
