import { app } from 'src/pages/app.po';
import { articleDetailsPage } from 'src/pages/article-details.po';
import { globalFeedPage } from 'src/pages/global-feed.po';
import { headerNavBar } from 'src/pages/header-nav-bar.po';
import { homePage } from 'src/pages/home.po';
import { myProfilePage } from 'src/pages/my-profile.po';
import { newArticlePage } from 'src/pages/new-article.po';
import { registerPage } from 'src/pages/register.po';
import { generateRandomString } from 'src/utils';
import { ArticleInterface } from 'types';

describe('Delete article', () => {
  let userId: string;

  beforeEach(async () => {
    userId = generateRandomString();
    await registerPage.registerAccount(userId);
    await headerNavBar.waitForLoginInfo(userId);
    await newArticlePage.navigateToArticlePage();
  });

  it('should remove the article from My Articles section', async () => {
    const articleDetails: ArticleInterface = {
      title: 'Automation Testing My Feed',
      summary: 'How to do automation testing',
      body: 'Automation testing description',
    };

    await newArticlePage.publishArticle(articleDetails);
    await articleDetailsPage.clickDeleteArticle();
    await myProfilePage.navigateToMyProfilePage(userId);

    expect(await myProfilePage.isArticlePresent(articleDetails.title)).toBe(
      false,
      'Article is still present on My Articles feed.'
    );
  });

  it('should remove the article from the Global Feed', async () => {
    const articleDetails: ArticleInterface = {
      title: 'Automation Testing Global Feed',
      summary: 'How to do automation testing',
      body: 'Automation testing description',
    };

    await newArticlePage.publishArticle(articleDetails);
    await articleDetailsPage.clickDeleteArticle();
    await app.navigateToApp();
    await homePage.openGlobalFeed();

    expect(await globalFeedPage.isArticlePresent(articleDetails.title)).toBe(
      false,
      'Article is still present on Global feed.'
    );
  });
});
