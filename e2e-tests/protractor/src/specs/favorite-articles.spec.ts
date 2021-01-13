import { articleDetailsPage } from 'src/pages/article-details.po';
import { headerNavBar } from 'src/pages/header-nav-bar.po';
import { myProfilePage } from 'src/pages/my-profile.po';
import { newArticlePage } from 'src/pages/new-article.po';
import { registerPage } from 'src/pages/register.po';
import { generateRandomString } from 'src/utils';
import { ArticleInterface } from 'types';

describe('Favorite articles', () => {
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
    await articleDetailsPage.waitForArticleToBePublished(articleDetails.title);
  });

  it('should be displayed in Favorited Articles section', async () => {
    await myProfilePage.navigateToMyProfilePage(userId);
    await myProfilePage.clickFavoriteArticle();
    await myProfilePage.openFavoritedArticles();

    expect(await myProfilePage.isArticlePresent(articleDetails.title)).toBe(
      true,
      'Article is not correctly displayed on Favorited Articles feed.'
    );
  });
});
