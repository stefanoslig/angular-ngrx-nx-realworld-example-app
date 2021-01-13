import { $, browser, by, element } from 'protractor';

const usernameField = $("[placeholder='Username']");
const emailField = $("[placeholder='Email']");
const passwordField = $("[placeholder='Password']");
const signUpButton = element(by.buttonText('Sign up'));
const errorMessages = element.all(by.e2eId('error'));

export const registerPage = {
  async fillRegisterForm(userId: string) {
    await usernameField.sendKeys(userId);
    await emailField.sendKeys(`${userId}@example.com`);
    await passwordField.sendKeys(userId);
  },

  async createNewAccount(userId: string) {
    await this.fillRegisterForm(userId);
    await signUpButton.click();
  },

  async navigateToRegisterPage() {
    await browser.get(`${browser.baseUrl}#/register`);
  },

  async getErrorMessage(): Promise<string[]> {
    const errors: string[] = [];

    await errorMessages.each(async (el) => {
      errors.push((await el?.getText()) as string);
    });

    return errors;
  },

  async registerAccount(userId: string) {
    await this.navigateToRegisterPage();
    await this.createNewAccount(userId);
  },
};
