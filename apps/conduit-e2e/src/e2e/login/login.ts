import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { generateRandomString } from '../../support/generate-random-string';

let userId = '';

beforeEach(() => {
  userId = generateRandomString();
});

Given('I am registered user', () => {
  cy.registerUserApi(userId);
});

When('I open Login page', () => {
  cy.visit('/login');
});

When('I input a correct email', () => {
  cy.get("[placeholder='Email']").clear().type(`${userId}@example.com`);
});

When('I input a correct password', () => {
  cy.get("[placeholder='Password']").clear().type(userId).blur();
});

Then('my information is displayed in the header after a successful login', () => {
  cy.getByE2eId('loggedin-user').should('contain', userId);
});

When('I input incorrect password', () => {
  cy.get("[placeholder='Password']").clear().type('111111111').blur();
});

When('I click Login button', () => {
  cy.getByE2eId('sign-in').click();
});

Then('I see an error message', () => {
  cy.getByE2eId('error').should('contain', 'email or password is invalid');
});
