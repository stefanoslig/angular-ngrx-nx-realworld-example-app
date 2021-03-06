import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { generateRandomString } from '../../support/generate-random-string';

let userId = '';

beforeEach(() => {
  userId = generateRandomString();
});

Given('I am logged in to the system', () => {
  cy.loginApi(userId);
});

And('I am on Home page', () => {
  cy.visit('#/');
});

And('I select the Global feed', () => {
  cy.getByE2eId('global-feed').click();
});

When('I click on the first article', () => {
  const firstArticle = cy.getByE2eId('article-list-title').first();
  firstArticle.then((title) => {
    cy.wrap(title.text()).as('articleTitle');
    title.click();
  });
});

Then('I navigate to the clicked article', () => {
  cy.get('@articleTitle').then((articleTitle) => {
    cy.url().should('include', `/article/`);
    cy.getByE2eId('article-title').should('have.text', articleTitle);
  });
});

Then('I can see the title of an article', () => {
  cy.getByE2eId('article-list-title').first().should('not.be.empty');
});

When("I click on the first article's author name", () => {
  cy.getByE2eId('article-author')
    .first()
    .then((authorName) => {
      cy.wrap(authorName.text()).as('author');
    });
  cy.getByE2eId('article-author').first().click();
});

Then("I navigate to the author's profile page", () => {
  cy.get('@author').then((authorName) => {
    cy.url().should('include', `/profile/`);
    cy.getByE2eId('article-author-profile').should('have.text', authorName);
  });
});

When('I click on the second page', () => {
  cy.getByE2eId('pagination-link').eq(1).click();
});

Then('I navigate to the second page of the list', () => {
  cy.getByE2eId('pagination-item').eq(1).should('have.class', 'active');
});
