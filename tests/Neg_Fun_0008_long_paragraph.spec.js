import { test, expect } from '@playwright/test';

test('Neg_Fun_0008: Long paragraph loses structure', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input length type: L (300+ chars) - constructed to simulate "Long paragraph-style Singlish text"
  const singlishInput = 'mama gedhara yanavaa. oyaath enavadha? api denna ekata yamu. ' +
    'heta ude paandara nagitinna oone. mokada api dura gamanak yana nisaa. ' +
    'bus eke yanakota sindu ahanna puluvan. oyaa kemathi sindu monavadha? ' +
    'mata nam kemathi parana sindu valata. eeva harima lassanayi. ' +
    'api gihin bath kaalaa tea ekak bomu. eta passe api vidhuruvak balamu. ' +
    'gedhara kattiyath ekka kathaa karanna puluvan. ' +
    'mehema digata liyanakota system eka slow venavadha kiyala balanna oone. ' +
    'thava tikak liyamu neda? ov ow thava liyamu. ' +
    'mama vitharak nemei oyaath enna.';

  // Ideally, it should preserve the sentences and spacing logic.
  // We can't easily check rigorous exact matching for a long dynamic text unless we know the exact ideal output.
  // HOWEVER, the user specified:
  // Expected: "Proper Sinhala paragraph with preserved line breaks and sentence boundaries."
  // Actual: "Long Sinhala text with broken spacing merged sentences and lost formatting."

  // To trigger this failure mode (Strict), we need an assertion that fails on "broken spacing".
  // A simple way is to expect ANY exact correct translation (which we don't have perfectly).
  // But given the previous tests pattern, let's assume we expect at least the first meaningful sentences to be PERFECT.

  const expectedPartial = 'මම ගෙදර යනවා. ඔයාත් එනවද? අපි දෙන්නා එකට යමු.';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 10 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect strict formatting on the first few sentences
  // This likely fails if spacing is broken or sentences merged.
  await expect(outputField).toContainText(expectedPartial, { timeout: 5000 });
});
