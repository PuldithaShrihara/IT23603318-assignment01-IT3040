import { test, expect } from '@playwright/test';

test('Pos_Fun_0017: adding a Currency value', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
    const singlishInput = 'meeka Rs. 5343 venavaa.';
    const expectedSinhala = 'මේක Rs. 5343 වෙනවා.';

    const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
    await expect(inputField).toBeVisible();

    await inputField.fill('');
    await inputField.pressSequentially(singlishInput, { delay: 50 });
    await expect(inputField).toHaveValue(singlishInput);

    const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);
    await expect(outputField).toHaveText(expectedSinhala, { timeout: 10000 });
});
