import { test, expect } from '@playwright/test';

test('Neg_Fun_0004: Invalid repetition causes incorrect output', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input: hariharihari lassanayiii (Invalid repetition + malformed)
  const singlishInput = 'hariharihari lassanayiii';
  const expectedOutput = 'හරි හරි හරි ලස්සනයි'; // Ideal Output

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect Ideal Output
  // This fails if Actual output is 'හරිහරිහරි ලස්සනයියි'
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});
