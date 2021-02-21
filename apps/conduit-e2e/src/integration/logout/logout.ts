import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { generateRandomString } from '../../support/generate-random-string';

let userId;

beforeEach(() => {
  userId = generateRandomString();
});

Given('I am logged in to the system', () => {
  cy.login(userId);
});

And('I open Settings page', () => {
  cy.contains('Settings').click();
});

When('@settings I press on Logout button', () => {
  cy.contains('Or click here to logout.').click();
});

Then('@home my credentials are not displayed in the header anymore', () => {
  cy.getByE2eId('logedin-user').should('not.exist');
});
