import { $, browser, by, element } from 'protractor';
import { AccountInterface } from 'types';

const usernameField = $("[placeholder='Username']");
const passwordField = $("[placeholder='Password']");
const signInButton = element(by.buttonText('Sign in'));
const errorMessage = element(by.e2eId('error'));

export const signInPage = {
  async navigateToSignInPage() {
    await browser.get(`${browser.baseUrl}#/login`);
  },

  async signIn(accountCred: AccountInterface) {
    await usernameField.clear();
    await passwordField.clear();

    await usernameField.sendKeys(`${accountCred.username}@example.com`);
    await passwordField.sendKeys(accountCred.password);

    await signInButton.click();
  },

  async getErrorMessage(): Promise<string> {
    return await errorMessage.getText();
  },
};
