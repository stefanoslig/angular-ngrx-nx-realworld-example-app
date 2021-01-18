import { element, by, browser, ExpectedConditions } from 'protractor';
import { TIME_OUT_MS } from 'src/consts';

const signInButton = element(by.linkText('Sign in'));
const signUpButton = element(by.linkText('Sign up'));
const newPostButton = element(by.partialLinkText('New Post'));
const settingsButton = element(by.partialLinkText('Settings'));

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

  async clickSignIn() {
    await signInButton.click();
  },

  async clickSignUp() {
    await signUpButton.click();
  },

  async clickNewPost() {
    await newPostButton.click();
  },

  async clickMyProfile(userId: string) {
    await element(by.linkText(userId)).click();
  },

  async clickSettings() {
    await settingsButton.click();
  },
};
