

import { request } from '@playwright/test';

export async function loginUserApi(userId: string) {
  const requestContext = await request.newContext();
  const response = await requestContext.post('https://real-world-app-39656dff2ddc.herokuapp.com/api/users/login', {
    data: {
      user: {
        email: `${userId}@example.com`,
        password: userId,
      },
    },
  });

  if (!response.ok()) {
    throw new Error(`Failed to register user: ${await response.text()}`);
  }

  return response.json(); // Return response data if needed
}
