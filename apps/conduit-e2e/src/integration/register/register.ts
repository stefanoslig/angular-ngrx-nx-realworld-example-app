import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { generateRandomString } from '../../support/generate-random-string';

let userId = '';

beforeEach(() => {
  userId = generateRandomString();
});

Given('I open Register page', () => {
  cy.visit('#/register');
});

When('@register I input correct username', () => {
  cy.get("[placeholder='Username']").clear().type(userId);
});

And('@register I input correct email', () => {
  cy.get("[placeholder='Email']").clear().type(`${userId}@example.com`);
});

And('@register I input correct password', () => {
  cy.get("[placeholder='Password']").clear().type(userId);
});

And('@register I click Sign up button', () => {
  cy.getByE2eId('sign-up').click();
});

Then('@home my information is displayed in the header', () => {
  cy.getByE2eId('logedin-user').should('contain', userId);
});

When('@register I input username that already exists', () => {
  cy.registerUserApi(userId);
  cy.get("[placeholder='Username']").clear().type(userId);
});

And('@register I input email that already exists', () => {
  cy.get("[placeholder='Email']").clear().type(`${userId}@example.com`);
});

Then(`@register an error message {string} is displayed`, (error: string) => {
  cy.getByE2eId('error').should('contain', error);
});
