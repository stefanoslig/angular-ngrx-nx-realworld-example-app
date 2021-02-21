import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { generateRandomString } from '../../support/generate-random-string';

let userId = '';

beforeEach(() => {
  userId = generateRandomString();
});

Given('I am registered user', () => {
  cy.registerUserApi(userId);
});

And('I open Login page', () => {
  cy.visit('#/login');
});

When('I input a correct username', () => {
  cy.get("[placeholder='Username']").clear().type(`${userId}@example.com`);
});

And('I input a correct password', () => {
  cy.get("[placeholder='Password']").clear().type(userId);
});

And('I click Login button', () => {
  cy.getByE2eId('sign-in').click();
});

Then('my information is displayed in the header', () => {
  cy.getByE2eId('logedin-user').should('contain', userId);
});

And('I input incorrect password', () => {
  cy.get("[placeholder='Password']").clear().type('111111111');
});

Then('I see an error message', () => {
  cy.getByE2eId('error').should('contain', 'email or password is invalid');
});
