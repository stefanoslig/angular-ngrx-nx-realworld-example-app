import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { generateRandomString } from '../../support/generate-random-string';

let userId = '';

beforeEach(() => {
  userId = generateRandomString();
});

Given('I am logged in to the system so I can test the logout functionality', () => {
  cy.loginApi(userId);
});

When('I open Settings page where the logout button is located', () => {
  cy.visit('/settings');
});

When('I press on Logout button', () => {
  cy.contains('Or click here to logout.').click();
});

Then('my credentials are not displayed in the header anymore', () => {
  cy.getByE2eId('loggedin-user').should('not.exist');
});
