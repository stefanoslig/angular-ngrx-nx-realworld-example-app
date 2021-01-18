import { browser, by, element, ExpectedConditions } from 'protractor';
import { TIME_OUT_MS } from 'src/consts';

const title = element(by.e2eId('article-title'));
const favoriteButton = element(by.e2eId('favorite-article'));
const favoritedArticles = element(by.linkText('Favorited Articles'));

export const myProfilePage = {
  async isArticlePresent(titleText: string) {
    try {
      await browser.wait(
        ExpectedConditions.textToBePresentInElement(title, titleText),
        TIME_OUT_MS,
        `${titleText} is not present in the Article's Title.`
      );
      return true;
    } catch {
      return false;
    }
  },

  async clickFavoriteArticle() {
    await favoriteButton.click();
  },

  async openFavoritedArticles() {
    await favoritedArticles.click();
  },

  async clickOnArticle(articleTitle: string) {
    const article = element(by.cssContainingText("[data-e2e-id='article-title']", articleTitle));
    await article.click();
  }
};
