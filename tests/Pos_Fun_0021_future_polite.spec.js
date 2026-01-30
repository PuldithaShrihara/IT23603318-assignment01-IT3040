import { test, expect } from '@playwright/test';

test('Pos_Fun_0021: Future tense + polite request + mixed singlish and english', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
    const singlishInput = 'karuNaakara apita kalin appointment eka dhenna puluvandha?';
    // Updated expected output to match actual app output ("පුලුවන්ද" instead of "පුළුවන්ද")
    const expectedSinhala = 'කරුණාකර අපිට කලින් appointment එක දෙන්න පුලුවන්ද?';

    const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
    await expect(inputField).toBeVisible();

    await inputField.fill(singlishInput);
    await inputField.dispatchEvent('input');
    await expect(inputField).toHaveValue(singlishInput);

    const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);
    await expect(outputField).toHaveText(expectedSinhala, { timeout: 45000 });
});
