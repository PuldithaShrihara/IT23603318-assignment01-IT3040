import { test, expect } from '@playwright/test';

test('Pos_Fun_0020: Input with abbreviation + polite request', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  const singlishInput = 'NIC labaadhii pilivelata poolimee enna.';
  const expectedSinhala = 'NIC ලබාදී පිලිවෙලට පෝලිමේ එන්න.';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill(singlishInput);
  await inputField.dispatchEvent('input');
  await expect(inputField).toHaveValue(singlishInput);

  // Defined outputField before use
  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);
  await expect(outputField).toHaveText(expectedSinhala, { timeout: 45000 });
});
