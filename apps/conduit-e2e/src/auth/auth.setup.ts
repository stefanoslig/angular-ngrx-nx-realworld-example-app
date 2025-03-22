import { test as setup, request } from '@playwright/test';
import { generateRandomString } from '../helpers/generate-random-string';
import { registerUserApi } from '../helpers/register-user';
import { loginUserApi } from '../helpers/login-user';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async () => {
  const userId = generateRandomString();
  const requestContext = await request.newContext();
  await registerUserApi(userId, requestContext);
  await loginUserApi(userId, requestContext);
  await requestContext.storageState({ path: authFile });
});
