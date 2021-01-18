import axios from 'axios';
import { $, by, element } from 'protractor';
import { ArticleInterface } from 'src/types';
import { getAccessToken } from 'src/utils';
import { headerNavBar } from './header-nav-bar.po';
import { myProfilePage } from './my-profile.po';

const titleField = $("[placeholder='Article Title']");
const summaryField = $('[placeholder="What\'s this article about?"]');
const bodyField = $("[placeholder='Write your article (in markdown)']");
const tagsField = $("[placeholder='Enter Tags']");
const publishButton = element(by.buttonText('Publish Article'));

export const newArticlePage = {
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

  async publishArticleAPI(userId: string, article: ArticleInterface) {
    const token = await getAccessToken(userId);

    try {
      await axios({
        method: 'post',
        url: 'https://conduit.productionready.io/api/articles',
        headers: { 
          'Content-Type': 'application/json', 
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Token ${token}`
        },
        data: JSON.stringify({"article":{"title":article.title,"description":article.summary,"body":article.body,"tagList":article.tags}})
      });
    } catch (e) {
      console.error(
        `Could not publish an article`
      );
      throw e;
    }
  },

  async openArticle(userId: string, title: string) {
    await headerNavBar.clickMyProfile(userId);
    await myProfilePage.clickOnArticle(title);
  }
};
