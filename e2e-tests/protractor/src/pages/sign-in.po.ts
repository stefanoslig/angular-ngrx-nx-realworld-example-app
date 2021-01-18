import { $, by, element } from 'protractor';
import { AccountInterface } from 'src/types';
import { headerNavBar } from './header-nav-bar.po';

const usernameField = $("[placeholder='Username']");
const passwordField = $("[placeholder='Password']");
const signInButton = element(by.buttonText('Sign in'));
const errorMessage = element(by.e2eId('error'));

export const signInPage = {
  async signIn(accountCred: AccountInterface) {
    await headerNavBar.clickSignIn();

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
