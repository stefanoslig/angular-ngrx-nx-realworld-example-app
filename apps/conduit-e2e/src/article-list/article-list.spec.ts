import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/home');  
  await page.getByTestId('global-feed').click();
});


test('Navigate to a specific article', async ({ page }) => {
  const firstArticle = page.getByTestId('article-list-title').first();
  await firstArticle.click();

  const articleTitleElement = page.getByTestId('article-title');

  expect(articleTitleElement).toBeTruthy();
  await expect(page).toHaveURL(/\/article\//);
  await expect(articleTitleElement).toBeVisible();
});

test('View article\'s author', async ({ page }) => {
  const firstArticle = page.getByTestId('article-list-title').first();
  await firstArticle.click();

  await expect(page).toHaveURL(/\/article\//);
  const articleAuthorElement = page.getByTestId('article-author').first();
  await expect(articleAuthorElement).toBeVisible();

  const authorElementText = await articleAuthorElement.textContent();
  await articleAuthorElement.click();

  await expect(page).toHaveURL(/\/profile\//);
  await expect(page.getByTestId('article-author-profile')).toHaveText(authorElementText ?? '');
});
