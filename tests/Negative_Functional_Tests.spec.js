import { test, expect } from '@playwright/test';


test('Neg_Fun_0001: Joined words not separated', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input length type: S
  const singlishInput = 'mamageDharayanavaa';
  const expectedOutput = 'මම ගෙදර යනවා';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect correct segmentation
  // This fails if Actual output is 'මමගෙදරයනවා'
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});


test('Neg_Fun_0002: Past tense not correctly identified', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input length type: S
  const singlishInput = 'mama iiyee enavaa';
  const expectedOutput = 'මම ඉයේ ආවා';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect correct past tense
  // This fails if Actual output is 'මම ඉයේ එනවා'
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});



test('Neg_Fun_0003: Weak negation handling', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input length type: S
  const singlishInput = 'mata eeka karanna baee';
  const expectedFormalOutput = 'මට ඒක කරන්න බැහැ'; // Expected Strong/Formal Negation

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect strong negation "බැහැ"
  // This test is EXPECTED TO FAIL if the system returns the informal "බෑ"
  await expect(outputField).toHaveText(expectedFormalOutput, { timeout: 5000 });
});



test('Neg_Fun_0004: Invalid repetition causes incorrect output', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input: hariharihari lassanayiii (Invalid repetition + malformed)
  const singlishInput = 'hariharihari lassanayiii';
  const expectedOutput = 'හරි හරි හරි ලස්සනයි'; // Ideal Output

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect Ideal Output
  // This fails if Actual output is 'හරිහරිහරි ලස්සනයියි'
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});


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


test('Neg_Fun_0007: Excess punctuation not normalized', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input length type: S
  const singlishInput = 'oyaa enavadha???';
  const expectedOutput = 'ඔයා එනවද?';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect normalized punctuation
  // This fails if Actual output is 'ඔයා එනවද???' (retains excessive punctuation)
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});


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


test('Neg_Fun_0009: Invalid pronoun spacing causes ambiguity', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input: oya laa laa enavaa (Invalid pronoun split)
  const singlishInput = 'oya laa laa enavaa';
  const expectedOutput = 'ඔයාලා එනවා'; // Ideal Output

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect Ideal Output
  // This fails if Actual output is 'ඔයා ලා ලා එනවා'
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});


test('Neg_Fun_0010: Heavy typos produce unreadable Sinhala', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Input length type: S
  const singlishInput = 'mta gdhr ynva';
  const expectedOutput = 'මට ගෙදර යනවා';

  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(singlishInput, { delay: 50 });

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Verification: Expect correction of typos
  // This fails if Actual output is 'මට ගදහ්ර යනව' (literal garbled mapping)
  await expect(outputField).toHaveText(expectedOutput, { timeout: 5000 });
});

