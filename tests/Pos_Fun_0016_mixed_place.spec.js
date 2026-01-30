import { test, expect } from '@playwright/test';

test('Pos_Fun_0016: Mixed language input , Place name in English', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
    const singlishInput = 'siiyaa Colombo yanna hadhannee.';
    const expectedSinhala = 'සීයා Colombo යන්න හදන්නේ.';

    const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
    await expect(inputField).toBeVisible();

    await inputField.fill('');
    await inputField.pressSequentially(singlishInput, { delay: 50 });
    await expect(inputField).toHaveValue(singlishInput);

    const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);
    await expect(outputField).toHaveText(expectedSinhala, { timeout: 10000 });
});
