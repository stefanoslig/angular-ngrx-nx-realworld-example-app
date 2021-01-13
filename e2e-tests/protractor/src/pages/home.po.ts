import { by, element } from 'protractor';

const globaLFeedLink = element(by.linkText('Global Feed'));

export const homePage = {
  async openGlobalFeed() {
    await globaLFeedLink.click();
  },
};
