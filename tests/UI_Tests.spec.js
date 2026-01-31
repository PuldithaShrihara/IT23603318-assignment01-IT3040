import { test, expect } from '@playwright/test';


test('Pos_UI_0001: Sinhala output updates automatically in real-time', async ({ page }) => {
  // Objective: Verify that the output updates as the user types without pressing a button.
  
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  const inputField = page.locator('[placeholder="Input Your Singlish Text Here."]');
  await expect(inputField).toBeVisible();

  const outputField = page.locator('text=Sinhala').locator('..').locator('div').nth(1);

  // Step 1: Type partially
  await inputField.pressSequentially('mama ', { delay: 200 });
  await page.waitForTimeout(3000); // Wait for API response
  // Verify partial conversion (e.g., ' man ' -> 'මන් ')
  await expect(outputField).toContainText('මම', { timeout: 10000 });

  // Step 2: Complete the sentence
  await inputField.pressSequentially('gedhara yanavaa', { delay: 100 });
  
  // Step 3: Verify full output
  const expectedOutput = 'මම ගෙදර යනවා';
  await expect(outputField).toContainText(expectedOutput, { timeout: 5000 });

  console.log('Pos_UI_0001: Real-time update verified');
});


test('Pos_UI_0002: Verify Layout Elements Visibility', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

  // Verify Logo/Title
  // Adjust locators based on actual page structure if needed
  await expect(page).toHaveTitle("Singlish ↔ English Translator"); 

  // Verify Input Area
  await expect(page.locator('[placeholder="Input Your Singlish Text Here."]')).toBeVisible();

  // Verify Output Area
  // Using the locator strategy from existing tests
  const outputArea = page.locator('text=Sinhala').locator('..').locator('div').nth(1);
  await expect(outputArea).toBeVisible();

  console.log('UI_Test_001 executed successfully');
});
