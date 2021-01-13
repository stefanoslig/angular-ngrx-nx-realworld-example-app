import { browser } from 'protractor';

export const app = {
  async navigateToApp() {
    await browser.get(browser.baseUrl);
    await browser.waitForAngularEnabled(true);
  },
};
