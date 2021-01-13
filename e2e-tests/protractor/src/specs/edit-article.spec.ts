import { articleDetailsPage } from 'src/pages/article-details.po';
import { headerNavBar } from 'src/pages/header-nav-bar.po';
import { newArticlePage } from 'src/pages/new-article.po';
import { registerPage } from 'src/pages/register.po';
import { generateRandomString } from 'src/utils';
import { ArticleInterface } from 'types';

describe('Edit articles', () => {
  let userId: string;
  const articleDetails: ArticleInterface = {
    title: 'Automation Testing',
    summary: 'How to do automation testing',
    body: 'Automation testing description',
  };

  beforeEach(async () => {
    userId = generateRandomString();
    await registerPage.registerAccount(userId);
    await headerNavBar.waitForLoginInfo(userId);
    await newArticlePage.navigateToArticlePage();
    await newArticlePage.publishArticle(articleDetails);
  });

  it('should displayed the new changes after the edit', async () => {
    await articleDetailsPage.clickEditArticle();
    await newArticlePage.publishArticle({
      ...articleDetails,
      title: 'Automation Testing EDITED',
    });

    expect(
      await articleDetailsPage.isTitlePresent('Automation Testing EDITED')
    ).toBe(true, 'Article is not correctly published, after editing.');
  });
});
