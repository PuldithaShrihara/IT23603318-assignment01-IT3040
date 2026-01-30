import { test, expect } from '@playwright/test';

test('Neg_Fun_0006: Invalid abbreviation and typos break conversion', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input: mata ASAPPP email ekk evnn oone (Invalid abbreviation + typos)
  const singlishInput = 'mata ASAPPP email ekk evnn oone';
  const expectedOutput = 'මට ASAP email එකක් එවන්න ඕනේ'; // Ideal Output

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect Ideal Output
  // This fails if Actual output is 'මට ASAPPP email එක එවන්න ඕන'
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});
