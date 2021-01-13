import { app } from 'src/pages/app.po';
import { headerNavBar } from 'src/pages/header-nav-bar.po';
import { registerPage } from 'src/pages/register.po';
import { settingsPage } from 'src/pages/settings.po';
import { generateRandomString } from 'src/utils';

describe('Create new account', () => {
  let userId: string;

  beforeEach(async () => {
    await registerPage.navigateToRegisterPage();
  });

  describe('Click on Sign Up button on Register page', () => {
    it('should bring the user to the Home page, after entering correct information', async () => {
      userId = generateRandomString();

      await registerPage.createNewAccount(userId);
      expect(await headerNavBar.isUserLoggedIn(userId)).toBe(
        true,
        'A new user is not created.'
      );
    });

    it('should display error message, after entering incorrect information', async () => {
      userId = generateRandomString();

      // create one account and then try creating a new account with the same credentials
      await registerPage.createNewAccount(userId);
      await headerNavBar.waitForLoginInfo(userId);
      await settingsPage.logout();
      await app.navigateToApp();
      await registerPage.navigateToRegisterPage();
      await registerPage.createNewAccount(userId);

      expect(await registerPage.getErrorMessage()).toEqual([
        'email has already been taken',
        'username has already been taken',
      ]);
    });
  });
});
