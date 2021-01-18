import { headerNavBar } from 'src/pages/header-nav-bar.po';
import { registerPage } from 'src/pages/register.po';
import { settingsPage } from 'src/pages/settings.po';
import { signInPage } from 'src/pages/sign-in.po';
import { generateRandomString } from 'src/utils';

describe('Authentication', () => {
  let userId: string;

  beforeEach(async () => {
    userId = generateRandomString();
    await registerPage.registerAccountAPI(userId);
  });

  describe('Click on Sign In button on Login page', () => {
    it('should bring the user to Home page, after entering correct information', async () => {
      await signInPage.signIn({ username: userId, password: userId });

      expect(await headerNavBar.isUserLoggedIn(userId)).toBe(
        true,
        'The user is not logged in.'
      );
    });

    it('should display error message, after entering incorrect information', async () => {
      await signInPage.signIn({ username: userId, password: '111111111' });

      expect(await signInPage.getErrorMessage()).toEqual(
        'email or password is invalid'
      );
    });
  });

  describe('Click on Logout button on Settings page', () => {
    it('should bring the user to Login page', async () => {
      await signInPage.signIn({ username: userId, password: userId });
      await headerNavBar.waitForLoginInfo(userId); // need to explicitly wait here, so that we are sure that the user is logged in
      await settingsPage.logout();

      expect(await headerNavBar.isUserLoggedIn(userId)).toBe(
        false,
        'The user is still logged in.'
      );
    });
  });
});
