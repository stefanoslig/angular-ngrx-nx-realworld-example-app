import { app } from 'src/pages/app.po';
import { articleDetailsPage } from 'src/pages/article-details.po';
import { globalFeedPage } from 'src/pages/global-feed.po';
import { headerNavBar } from 'src/pages/header-nav-bar.po';
import { homePage } from 'src/pages/home.po';
import { myProfilePage } from 'src/pages/my-profile.po';
import { newArticlePage } from 'src/pages/new-article.po';
import { registerPage } from 'src/pages/register.po';
import { generateRandomString } from 'src/utils';

describe('New article', () => {
  let userId: string;

  beforeEach(async () => {
    userId = generateRandomString();
    await registerPage.registerAccount(userId);
    await headerNavBar.waitForLoginInfo(userId);
    await newArticlePage.navigateToArticlePage();
  });

  it('should be published after pressing Publish button', async () => {
    await newArticlePage.publishArticle({
      title: 'Automation Testing',
      summary: 'How to do automation testing',
      body: 'Automation testing description',
    });

    expect(await articleDetailsPage.isTitlePresent('Automation Testing')).toBe(
      true,
      'Article is not correctly published.'
    );
  });

  it('should be displayed in My Articles section', async () => {
    await newArticlePage.publishArticle({
      title: 'Automation Testing 2',
      summary: 'How to do automation testing',
      body: 'Automation testing description',
    });
    await articleDetailsPage.waitForArticleToBePublished(
      'Automation Testing 2'
    );
    await myProfilePage.navigateToMyProfilePage(userId);

    expect(await myProfilePage.isArticlePresent('Automation Testing 2')).toBe(
      true,
      'Article is not correctly displayed on My Articles feed.'
    );
  });

  it('should be displayed in Global Feed', async () => {
    await newArticlePage.publishArticle({
      title: 'Automation Testing 3',
      summary: 'How to do automation testing',
      body: 'Automation testing description',
    });
    await articleDetailsPage.waitForArticleToBePublished(
      'Automation Testing 3'
    );
    await app.navigateToApp();
    await homePage.openGlobalFeed();

    expect(await globalFeedPage.isArticlePresent('Automation Testing 3')).toBe(
      true,
      'Article is not correctly displayed on Global feed.'
    );
  });
});
