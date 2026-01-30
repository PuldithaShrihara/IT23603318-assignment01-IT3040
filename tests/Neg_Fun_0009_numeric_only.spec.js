import { test, expect } from '@playwright/test';

test('Neg_Fun_0009: Invalid pronoun spacing causes ambiguity', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input: oya laa laa enavaa (Invalid pronoun split)
  const singlishInput = 'oya laa laa enavaa';
  const expectedOutput = 'ඔයාලා එනවා'; // Ideal Output

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect Ideal Output
  // This fails if Actual output is 'ඔයා ලා ලා එනවා'
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});
