import { getGreeting } from '../support/app.po';

describe('myworkspace', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to myworkspace!');
  });
});
