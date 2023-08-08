import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { generateRandomString } from '../../support/generate-random-string';

let userId = '';
let newUserId = '';
let bio = '';

beforeEach(() => {
  userId = generateRandomString();
  newUserId = generateRandomString();
  bio = generateRandomString();
});

Given('I am logged in to the system', () => {
  cy.loginApi(userId);
});

And('I open Settings page', () => {
  cy.visit('/settings');
});

And('I wait for current username to appear', () => {
  cy.get("[placeholder='Your Name']").should('have.value', userId);
});

When('I input new username', () => {
  cy.get("[placeholder='Your Name']").clear().type(newUserId);
});

And('I input new bio', () => {
  cy.get("[placeholder='Short bio about you']").clear().type(bio);
});

And('I click Update Settings button', () => {
  cy.contains('button', 'Update Settings').click();
});

Then('I am redirected to profile', () => {
  cy.url().should('include', '/profile');
});

Then('my new username is displayed in the header', () => {
  cy.getByE2eId('logedin-user').should('contain', newUserId);
});

Then('I open Settings page', () => {
  cy.visit('/settings');
});

Then('I see new username', () => {
  cy.get("[placeholder='Your Name']").should('have.value', newUserId);
});

Then('I see new bio', () => {
  cy.get("[placeholder='Short bio about you']").should('have.value', bio);
});
