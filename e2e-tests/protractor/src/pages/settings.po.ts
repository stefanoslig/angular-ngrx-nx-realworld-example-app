import { browser, by, element } from 'protractor';

const logoutButton = element(by.buttonText('Or click here to logout.'));

export const settingsPage = {
  async navigateToSettingsPage() {
    await browser.get(`${browser.baseUrl}#/settings`);
  },

  async logout() {
    await this.navigateToSettingsPage();
    await logoutButton.click();
  },
};
