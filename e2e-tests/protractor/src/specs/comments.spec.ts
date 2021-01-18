import { articleDetailsPage } from 'src/pages/article-details.po';
import { newArticlePage } from 'src/pages/new-article.po';
import { registerPage } from 'src/pages/register.po';
import { generateRandomString } from 'src/utils';
import { ArticleInterface } from 'src/types';
import { signInPage } from 'src/pages/sign-in.po';

describe('Add comment', () => {
  let userId: string;
  const articleDetails: ArticleInterface = {
    title: 'Automation Testing Comment',
    summary: 'How to do automation testing',
    body: 'Automation testing description',
  };

  beforeEach(async () => {
    userId = generateRandomString();
    await registerPage.registerAccountAPI(userId);
    await signInPage.signIn({ username: userId, password: userId });
    await newArticlePage.publishArticleAPI(userId, articleDetails);
    await newArticlePage.openArticle(userId, articleDetails.title)
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
