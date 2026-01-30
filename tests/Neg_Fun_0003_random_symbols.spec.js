import { test, expect } from '@playwright/test';

test('Neg_Fun_0003: Negative meaning weakened', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input length type: S
  const singlishInput = 'mata eeka karanna baee';
  const expectedOutput = 'මට ඒක කරන්න බැහැ';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect strong negation
  // This fails if Actual output is 'මට ඒක කරන්න බෑ'
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});
