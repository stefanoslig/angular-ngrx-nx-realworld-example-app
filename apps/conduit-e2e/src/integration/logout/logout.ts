import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { generateRandomString } from '../../support/generate-random-string';

let userId = '';

beforeEach(() => {
  userId = generateRandomString();
});

Given('I am logged in to the system', () => {
  cy.loginApi(userId);
});

And('I open Settings page', () => {
  cy.visit('#/settings');
});

When('I press on Logout button', () => {
  cy.contains('Or click here to logout.').click();
});

Then('my credentials are not displayed in the header anymore', () => {
  cy.getByE2eId('logedin-user').should('not.exist');
});
