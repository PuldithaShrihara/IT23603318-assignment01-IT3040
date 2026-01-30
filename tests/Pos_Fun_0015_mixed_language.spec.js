import { test, expect } from '@playwright/test';

test('Pos_Fun_0015: Mixed language input', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  const singlishInput = 'Zoom meeting ekak thiyennee, link eka share karalaa aethi.';
  const expectedSinhala = 'Zoom meeting එකක් තියෙන්නේ, link එක share කරලා ඇති.';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });
  await expect(inputField).toHaveValue(singlishInput);

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);
  await expect(outputField).toHaveText(expectedSinhala, { timeout: 10000 });
});
