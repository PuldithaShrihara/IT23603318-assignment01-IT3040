const fs = require('fs');
const path = require('path');

const testsDir = path.join(process.cwd(), 'tests');
const posTarget = path.join(testsDir, 'Positive_Functional_Tests.spec.js');
const negTarget = path.join(testsDir, 'Negative_Functional_Tests.spec.js');
const uiTarget = path.join(testsDir, 'UI_Tests.spec.js');

const header = "import { test, expect } from '@playwright/test';\n\n";

// Correct content for Neg_Fun_0003
const negFun0003Content = `
test('Neg_Fun_0003: Random Symbols', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  const inputSymbol = '!@#$%^&*()';
  // Assuming the system preserves the symbols or has specific behavior.
  // For now, we will expect it to be visible in input and check output if needed.
  
  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  await inputField.fill('');
  await inputField.pressSequentially(inputSymbol, { delay: 50 });
  await expect(inputField).toHaveValue(inputSymbol);

  // Add verification for output if known, otherwise just checking no crash/error
  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);
  await expect(outputField).toBeVisible();
});
`;

function mergeFiles(pattern, targetFile, fixMap = {}) {
    const files = fs.readdirSync(testsDir).filter(f => f.match(pattern)).sort();
    let content = header;

    files.forEach(file => {
        if (fixMap[file]) {
            console.log(`Injecting fix for ${file}`);
            content += fixMap[file] + "\n";
        } else {
            console.log(`Merging ${file}`);
            let fileContent = fs.readFileSync(path.join(testsDir, file), 'utf8');
            // Remove imports
            fileContent = fileContent.replace(/import {.*?}.*?;\r?\n?/g, '');
            content += fileContent + "\n";
        }
    });

    fs.writeFileSync(targetFile, content);
    console.log(`Created ${targetFile}`);
}

// 1. Positive Functional Tests (Pos_Fun_0001 - 0024)
mergeFiles(/^Pos_Fun_\d{4}.*\.spec\.js$/, posTarget);

// 2. Negative Functional Tests (Neg_Fun_0001 - 0010)
mergeFiles(/^Neg_Fun_\d{4}.*\.spec\.js$/, negTarget, {
    'Neg_Fun_0003_random_symbols.spec.js': negFun0003Content
});

// 3. UI Tests (Pos_UI_*)
mergeFiles(/^Pos_UI_.*\.*spec\.js$/, uiTarget);
