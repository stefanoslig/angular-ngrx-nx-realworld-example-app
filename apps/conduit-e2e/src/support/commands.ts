// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable<Subject> {
    registerUserApi(userId: string): void;
    getByE2eId(selector: string, ...args): HTMLElement;
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
