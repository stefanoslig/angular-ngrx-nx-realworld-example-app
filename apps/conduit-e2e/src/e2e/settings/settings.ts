import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { generateRandomString } from '../../support/generate-random-string';

let userId = '';
let newUserId = '';
let bio = '';

beforeEach(() => {
  userId = generateRandomString();
  newUserId = generateRandomString();
  bio = generateRandomString();
});

Given('I am logged in to the system so I can test the settings functionality', () => {
  cy.loginApi(userId);
});

When('I open Settings page', () => {
  cy.visit('/settings');
});

When('I wait for current username to appear', () => {
  cy.get("[placeholder='Your Name']").should('have.value', userId);
});

When('I input new username', () => {
  cy.get("[placeholder='Your Name']").clear().type(newUserId);
});

When('I input new bio', () => {
  cy.get("[placeholder='Short bio about you']").clear().type(bio);
});

When('I click Update Settings button', () => {
  cy.contains('button', 'Update Settings').click();
});

Then('I am redirected to profile', () => {
  cy.url().should('include', '/profile');
});

Then('my new username is displayed in the header', () => {
  cy.getByE2eId('loggedin-user').should('contain', newUserId);
});

Then('I see new username', () => {
  cy.get("[placeholder='Your Name']").should('have.value', newUserId);
});

Then('I see new bio', () => {
  cy.get("[placeholder='Short bio about you']").should('have.value', bio);
});
