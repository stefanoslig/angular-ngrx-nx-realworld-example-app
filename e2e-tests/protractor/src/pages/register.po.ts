import { $, by, element } from 'protractor';
import { app } from './app.po';
import axios from 'axios';

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

  async getErrorMessage(): Promise<string[]> {
    const errors: string[] = [];

    await errorMessages.each(async (el) => {
      errors.push((await el?.getText()) as string);
    });

    return errors;
  },

  async registerAccountAPI(userId: string) {
    await app.navigateToApp();

    try {
      await axios({
        method: 'post',
        url: 'https://conduit.productionready.io/api/users',
        headers: { 
          'Content-Type': 'application/json', 
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: JSON.stringify({"user":{"email":`${userId}@example.com`,"password":userId,"username":userId}})
      });
    } catch (e) {
      console.error(
        `Could not register user`
      );
      throw e;
    }
  },
};
