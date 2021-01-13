import { $, browser, by, element } from 'protractor';
import { ArticleInterface } from 'types';

const titleField = $("[placeholder='Article Title']");
const summaryField = $('[placeholder="What\'s this article about?"]');
const bodyField = $("[placeholder='Write your article (in markdown)']");
const tagsField = $("[placeholder='Enter Tags']");
const publishButton = element(by.buttonText('Publish Article'));

export const newArticlePage = {
  async navigateToArticlePage() {
    await browser.get(`${browser.baseUrl}#/editor`);
  },

  async writeArticle(article: ArticleInterface) {
    await titleField.clear();
    await titleField.sendKeys(article.title);

    await summaryField.clear();
    await summaryField.sendKeys(article.summary);

    await bodyField.clear();
    await bodyField.sendKeys(article.body);

    await tagsField.clear();
    if (article.tags) {
      await tagsField.sendKeys(article.tags);
    }
  },

  async publishArticle(article: ArticleInterface) {
    await this.writeArticle(article);
    await publishButton.click();
  },
};
