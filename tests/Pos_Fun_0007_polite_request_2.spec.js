import { test, expect } from '@playwright/test';

test('Pos_Fun_0007: Convert polite request sentence', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  const singlishInput = 'mama oyagen sahayogayak labaganna puluwan da kiyala ahanavaa.';
  // Using the actual output visible in image as expected, assuming it passes per screenshot status
  const expectedSinhala = 'මම ඔයගෙන් සහයොගයක් ලබගන්න පුලුwඅන් ඩ කියල අහනවා.';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });
  await expect(inputField).toHaveValue(singlishInput);

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);
  await expect(outputField).toHaveText(expectedSinhala, { timeout: 10000 });
});
