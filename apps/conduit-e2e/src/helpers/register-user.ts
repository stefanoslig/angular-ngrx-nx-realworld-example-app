import { APIRequestContext } from '@playwright/test';

export async function registerUserApi(userId: string, requestContext: APIRequestContext) {
  const response = await requestContext.post('https://real-world-app-39656dff2ddc.herokuapp.com/api/users', {
    data: {
      user: {
        email: `${userId}@example.com`,
        password: userId,
        username: userId,
      },
    },
  });

  if (!response.ok()) {
    throw new Error(`Failed to register user: ${await response.text()}`);
  }

  return response.json(); // Return response data if needed
}
