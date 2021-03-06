// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     *  Window object with additional properties used during test.
     */
    window(options?: Partial<Loggable & Timeoutable>): Chainable<CustomWindow>;

    registerUserApi(userId: string): void;

    getByE2eId(selector: string, ...args): Chainable<HtmlElement>;

    loginApi(userId: string): void;
  }
}
