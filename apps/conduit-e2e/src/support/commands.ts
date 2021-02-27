// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable<Subject> {
    registerUserApi(userId: string): void;
    getByE2eId(selector: string, ...args): HTMLElement;
    getFirstByE2eId(selector: string, ...args): HTMLElement;
    loginApi(userId: string): void;
  }
}

Cypress.Commands.add('registerUserApi', (userId: string) => {
  cy.request('POST', 'https://conduit.productionready.io/api/users', {
    user: { email: `${userId}@example.com`, password: userId, username: userId },
  });
});

Cypress.Commands.add('getByE2eId', (selector: string, ...args) => {
  return cy.get(`[data-e2e-id=${selector}]`, ...args);
});

Cypress.Commands.add('getFirstByE2eId', (selector: string, ...args) => {
  return cy.get(`[data-e2e-id=${selector}]`, ...args).first();
});

Cypress.Commands.add('loginApi', (userId: string) => {
  cy.registerUserApi(userId);
  cy.request('POST', 'https://conduit.productionready.io/api/users/login', {
    user: { email: `${userId}@example.com`, password: userId },
  }).then((response: any) => {
    window.localStorage.setItem('jwtToken', response.body.user.token);
  });
});
