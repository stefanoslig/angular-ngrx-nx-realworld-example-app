import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { generateRandomString } from '../../support/generate-random-string';

let userId = '';

beforeEach(() => {
  userId = generateRandomString();
});

Given('I open Register page', () => {
  cy.visit('/register');
});

When('I input correct username', () => {
  cy.get("[placeholder='Username']").clear().type(userId);
});

When('I input correct email', () => {
  cy.get("[placeholder='Email']").clear().type(`${userId}@example.com`);
});

When('I input correct password', () => {
  cy.get("[placeholder='Password']").clear().type(userId).blur();
});

When('I click Sign up button', () => {
  cy.getByE2eId('sign-up').click();
});

Then('my information is displayed in the header', () => {
  cy.getByE2eId('loggedin-user').should('contain', userId);
});

When('I input username that already exists', () => {
  cy.registerUserApi(userId);
  cy.get("[placeholder='Username']").clear().type(userId);
});

When('I input email that already exists', () => {
  cy.get("[placeholder='Email']").clear().type(`${userId}@example.com`).blur();
});

Then(`an error message {string} is displayed`, (error: string) => {
  cy.getByE2eId('error').should('contain', error);
});
