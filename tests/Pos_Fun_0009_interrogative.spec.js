import { test, expect } from '@playwright/test';

test('Pos_Fun_0009: Interrogative form', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  const singlishInput = 'meeka hariyata vaeda karanavaadha?';
  const expectedSinhala = 'මේක හරියට වැඩ කරනවාද?';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });
  await expect(inputField).toHaveValue(singlishInput);

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);
  // Using toContainText to be robust or haveText if we are confident. Image shows exact match.
  await expect(outputField).toHaveText(expectedSinhala, { timeout: 10000 });
});
