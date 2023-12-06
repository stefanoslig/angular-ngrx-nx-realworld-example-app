import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { generateRandomString } from '../../support/generate-random-string';

let userId = '';
let articleTitle = '';

beforeEach(() => {
  userId = generateRandomString();
  articleTitle = generateRandomString();
});

Given('I am logged in to the system  so I can test the new article functionality', () => {
  cy.loginApi(userId);
});

When('I am on New Post page', () => {
  cy.visit('/editor');
});

When('I input the title of the article', () => {
  cy.get("[placeholder='Article Title']").clear().type(articleTitle);
});

When('I input the summary of the article', () => {
  cy.get('[placeholder="What\'s this article about?"]').clear().type('How to do automation testing');
});

When('I input the body of the article', () => {
  cy.get("[placeholder='Write your article (in markdown)']").clear().type('Automation testing description');
});

When('I input tags of the article', () => {
  cy.get("[placeholder='Enter Tags']").clear().type('testing').blur();
});

When('I click Publish button', () => {
  cy.contains('Publish Article').click();
});

Then('a new article is published', () => {
  cy.getByE2eId('article-title').should('have.text', articleTitle);
});

Then('the new article is displayed in My Articles section', () => {
  cy.getByE2eId('article-title').should('have.text', articleTitle); // wait for the article to be created, before continue with the rest of the steps

  cy.getByE2eId('loggedin-user').click();
  cy.getByE2eId('article-list-title').should('have.text', articleTitle);
});

Then('the new article is displayed in Global Feed', () => {
  cy.getByE2eId('article-title').should('have.text', articleTitle); // wait for the article to be created, before continue with the rest of the steps

  cy.contains('Home').click();
  cy.contains('Global Feed').click();
  cy.getByE2eId('article-list-title').first().should('have.text', articleTitle);
});
