import { test, expect } from '@playwright/test';

test('Neg_Fun_0002: Past tense not correctly identified', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input length type: S
  const singlishInput = 'mama iiyee enavaa';
  const expectedOutput = 'මම ඉයේ ආවා';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect correct past tense
  // This fails if Actual output is 'මම ඉයේ එනවා'
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});
