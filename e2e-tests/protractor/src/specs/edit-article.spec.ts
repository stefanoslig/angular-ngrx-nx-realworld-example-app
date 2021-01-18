import { articleDetailsPage } from 'src/pages/article-details.po';
import { newArticlePage } from 'src/pages/new-article.po';
import { registerPage } from 'src/pages/register.po';
import { generateRandomString } from 'src/utils';
import { ArticleInterface } from 'src/types';
import { signInPage } from 'src/pages/sign-in.po';

describe('Edit articles', () => {
  let userId: string;
  const articleDetails: ArticleInterface = {
    title: 'Automation Testing Edit',
    summary: 'How to do automation testing',
    body: 'Automation testing description',
  };

  beforeEach(async () => {
    userId = generateRandomString();
    await registerPage.registerAccountAPI(userId);
    await signInPage.signIn({ username: userId, password: userId });
    await newArticlePage.publishArticleAPI(userId, articleDetails);
    await newArticlePage.openArticle(userId, articleDetails.title);
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
