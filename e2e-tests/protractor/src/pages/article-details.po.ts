import { $, browser, by, element, ExpectedConditions } from 'protractor';
import { TIME_OUT_MS } from 'src/consts';

const title = element(by.e2eId('article-title'));
const editButton = element(by.e2eId('edit-article'));
const deleteButton = element(by.e2eId('delete-article'));
const commentField = $("[placeholder='Write a comment...']");
const postCommentButton = element(by.buttonText('Post Comment'));
const postedCommentSection = element(by.e2eId('comment-block'));

export const articleDetailsPage = {
  async isTitlePresent(titleText: string) {
    try {
      await this.waitForArticleToBePublished(titleText);
      return true;
    } catch {
      return false;
    }
  },

  async waitForArticleToBePublished(titleText: string) {
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(title, titleText),
      TIME_OUT_MS,
      `${titleText} is not present in the Article's Title.`
    );
  },

  async clickEditArticle() {
    await editButton.click();
  },

  async clickDeleteArticle() {
    await deleteButton.click();
  },

  async postComment(comment: string) {
    await commentField.clear();
    await commentField.sendKeys(comment);
    await postCommentButton.click();
  },

  async isCommentPosted(comment: string) {
    try {
      await browser.wait(
        ExpectedConditions.textToBePresentInElement(
          postedCommentSection,
          comment
        ),
        TIME_OUT_MS,
        `${comment} is not present in comment section area.`
      );
      return true;
    } catch {
      return false;
    }
  },
};
