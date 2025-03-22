import { test, expect, request } from '@playwright/test';
import { generateRandomString } from '../helpers/generate-random-string';
import { registerUserApi } from '../helpers/register-user';

test.use({ storageState: { cookies: [], origins: [] } });
const userId = generateRandomString();

test.beforeEach(async () => {
  const requestContext = await request.newContext();
  await registerUserApi(userId, requestContext);
});

test('Successful login', async ({ page }) => {
  await page.goto('/login');

  await page.locator("[placeholder='Email']").fill(`${userId}@example.com`);
  await page.locator("[placeholder='Password']").fill(userId);
  await page.locator("[placeholder='Password']").blur();
  await page.getByTestId('sign-in').click();

  await expect(page.getByTestId('loggedin-user')).toContainText(userId);
});

test('Unsuccessful login', async ({ page }) => {
  await page.goto('/login');

  await page.locator("[placeholder='Email']").fill(`${userId}@example.com`);
  await page.locator("[placeholder='Password']").fill('111111111');
  await page.locator("[placeholder='Password']").blur();
  await page.getByTestId('sign-in').click();

  await expect(page.getByTestId('error')).toContainText('message User not found');
});
