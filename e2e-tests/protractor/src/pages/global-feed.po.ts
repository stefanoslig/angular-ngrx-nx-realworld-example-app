import { by, element } from 'protractor';

const title = element.all(by.e2eId('article-title'));

export const globalFeedPage = {
  async isArticlePresent(titleText: string) {
    const titles: string[] = [];

    await title.each(async (el) => {
      titles.push((await el?.getText()) as string);
    });

    return titles.includes(titleText) ? true : false;
  },
};
