import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/editor');
});

test('Create a new article', async ({ page }) => {
  await test.step('Fill in article details', async () => {
    await page.getByTestId('title-input').fill('E2E Test Article');
    await page.getByTestId('description-input').fill('This is a test article created during E2E testing.');
    await page.getByTestId('body-textarea').fill('This article is created to test the article creation functionality.');
    await page.getByTestId('tags-textarea').fill('e2e, testing, playwright');
    await page.getByTestId('publish-article-button').click();
  });

  await test.step('Verify article creation', async () => {
    await expect(page).toHaveURL(/\/article\//);
    await expect(page.getByTestId('article-title')).toHaveText('E2E Test Article');
    await expect(page.getByTestId('article-body')).toHaveText(
      'This article is created to test the article creation functionality.',
    );
  });
});
