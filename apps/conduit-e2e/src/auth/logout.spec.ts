import { test, expect } from '@playwright/test';

test('Successful logout', async ({ page }) => {
  await page.goto('/settings');

  await page.getByText('Or click here to logout.').click();

  await expect(page.getByTestId('loggedin-user')).toBeHidden();
});
