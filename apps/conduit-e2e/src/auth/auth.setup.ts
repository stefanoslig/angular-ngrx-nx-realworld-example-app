import { test as setup } from '@playwright/test';
import { generateRandomString } from '../helpers/generate-random-string';
import { registerUserApi } from '../helpers/register-user';
import { loginUserApi } from '../helpers/login-user';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request }) => {
  const userId = generateRandomString();
  await registerUserApi(userId);
  await loginUserApi(userId);
  await request.storageState({ path: authFile });
});
