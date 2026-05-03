import { test, expect } from '@playwright/test';

test.describe('VoteBuddy E2E Tests', () => {
  test('homepage loads with correct stats', async ({ page }) => {
    await page.goto('/');
    
    // Check if hero title is present
    await expect(page.locator('h1')).toContainText('Indian Elections');
    
    // Check if stats are not 0 (StatCounter animates)
    // Wait for animation to finish or check for presence
    const stat = page.locator('[data-testid="stat-counter"]').first();
    await expect(stat).not.toHaveText('0');
  });

  test('navigation to all main pages works', async ({ page }) => {
    await page.goto('/');
    
    const pages = [
      { name: 'Elections', url: '/elections' },
      { name: 'States', url: '/states' },
      { name: 'Booth Finder', url: '/booth-finder' },
      { name: 'Voter Services', url: '/voter' },
      { name: 'ECI Guidelines', url: '/eci-rules' },
      { name: 'Results', url: '/results' },
      { name: 'AI Chat', url: '/ai-assistant' },
    ];

    for (const p of pages) {
      await page.click(`text=${p.name}`);
      await expect(page).toHaveURL(p.url);
      // Verify no 404
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    }
  });

  test('State Explorer shows all 28 states', async ({ page }) => {
    await page.goto('/states');
    const stateCards = page.locator('.glass-card-hover'); // Assuming this class is used for state cards
    // Wait for elements to load
    await expect(stateCards).toHaveCount(36); // 28 states + 8 UTs
  });

  test('Booth Finder search input accepts EPIC format', async ({ page }) => {
    await page.goto('/booth-finder');
    const input = page.locator('input[placeholder*="EPIC"]');
    await input.fill('ABC1234567');
    await expect(input).toHaveValue('ABC1234567');
    
    await page.click('button:has-text("Search")');
    // Verify results appear
    await expect(page.locator('text=Results')).toBeVisible();
  });

  test('AI Chat sends a message and receives a response', async ({ page }) => {
    await page.goto('/ai-assistant');
    
    const input = page.locator('textarea, input[placeholder*="Ask"]');
    await input.fill('When is the next election?');
    await page.click('button:has-text("Send"), button[type="submit"]');
    
    // Wait for response
    const response = page.locator('.assistant-message, .ai-message'); // Adjust selector as needed
    await expect(response).toBeVisible({ timeout: 10000 });
  });

  test('language toggle switches UI text', async ({ page }) => {
    await page.goto('/');
    
    // Switch to Hindi
    await page.click('[data-testid="lang-toggle"]');
    
    // Check for Hindi text
    await expect(page.locator('h1')).toContainText('चुनाव');
    
    // Switch back to English
    await page.click('[data-testid="lang-toggle"]');
    await expect(page.locator('h1')).toContainText('Elections');
  });
});
