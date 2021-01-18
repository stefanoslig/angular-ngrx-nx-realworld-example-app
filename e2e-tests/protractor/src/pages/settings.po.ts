import { by, element } from 'protractor';
import { headerNavBar } from './header-nav-bar.po';

const logoutButton = element(by.buttonText('Or click here to logout.'));

export const settingsPage = {
  async logout() {
    await headerNavBar.clickSettings();
    await logoutButton.click();
  },
};
