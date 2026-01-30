import { test, expect } from '@playwright/test';

test('Neg_Fun_0007: Excess punctuation not normalized', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input length type: S
  const singlishInput = 'oyaa enavadha???';
  const expectedOutput = 'ඔයා එනවද?';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect normalized punctuation
  // This fails if Actual output is 'ඔයා එනවද???' (retains excessive punctuation)
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});
