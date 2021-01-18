import { headerNavBar } from 'src/pages/header-nav-bar.po';
import { myProfilePage } from 'src/pages/my-profile.po';
import { newArticlePage } from 'src/pages/new-article.po';
import { registerPage } from 'src/pages/register.po';
import { generateRandomString } from 'src/utils';
import { ArticleInterface } from 'src/types';
import { signInPage } from 'src/pages/sign-in.po';

describe('Favorite articles', () => {
  let userId: string;
  const articleDetails: ArticleInterface = {
    title: 'Automation Testing Favorites',
    summary: 'How to do automation testing',
    body: 'Automation testing description',
  };

  beforeEach(async () => {
    userId = generateRandomString();
    await registerPage.registerAccountAPI(userId);
    await signInPage.signIn({ username: userId, password: userId });
    await newArticlePage.publishArticleAPI(userId, articleDetails);
  });

  it('should be displayed in Favorited Articles section', async () => {
    await headerNavBar.clickMyProfile(userId);
    await myProfilePage.clickFavoriteArticle();
    await myProfilePage.openFavoritedArticles();

    expect(await myProfilePage.isArticlePresent(articleDetails.title)).toBe(
      true,
      'Article is not correctly displayed on Favorited Articles feed.'
    );
  });
});
