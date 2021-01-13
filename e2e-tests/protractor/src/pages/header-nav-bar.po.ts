import { element, by, browser, ExpectedConditions } from 'protractor';
import { TIME_OUT_MS } from 'src/consts';

export const headerNavBar = {
  async isUserLoggedIn(userId: string): Promise<boolean> {
    try {
      await this.waitForLoginInfo(userId);
      return true;
    } catch {
      return false;
    }
  },

  async waitForLoginInfo(userId: string) {
    const userIdButton = element(by.linkText(userId));

    await browser.wait(
      ExpectedConditions.presenceOf(userIdButton),
      TIME_OUT_MS,
      'The User ID is not displayed on the screen.'
    );
  },
};
