import { test, expect } from '@playwright/test';

test('Neg_Fun_0005: Slang sentence meaning distorted', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input length type: M
  const singlishInput = 'adoo machan eka poddak amaaruyi vagee';
  const expectedOutput = 'අඩෝ මචන් ඒක පොඩ්ඩක් අමාරුයි වගේ';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect correct colloquialism
  // This fails if Actual output is 'අඩෝ මචන් එක පොඩ්ඩක් අමාරුයි වගේ' (misses 'ඒක')
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});
