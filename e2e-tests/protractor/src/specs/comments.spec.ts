import { articleDetailsPage } from 'src/pages/article-details.po';
import { headerNavBar } from 'src/pages/header-nav-bar.po';
import { newArticlePage } from 'src/pages/new-article.po';
import { registerPage } from 'src/pages/register.po';
import { generateRandomString } from 'src/utils';
import { ArticleInterface } from 'types';

describe('Add comment', () => {
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

  it('should display the comment in the article', async () => {
    const comment = 'Just a test comment';
    await articleDetailsPage.postComment(comment);

    expect(await articleDetailsPage.isCommentPosted(comment)).toBe(
      true,
      'The comment is not posted.'
    );
  });
});
