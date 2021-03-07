Feature: Article List

  As a user,
  I want to be able view the list of the available articles,
  so that I can click on them and navigate to a specific article.

  Background:
    Given I am logged in to the system
    And I am on Home page
    And I select the Global feed

  Scenario: Navigate to a specific article
    When I click on the first article
    Then I navigate to the clicked article

  Scenario: View article's information
    Then I can see the title of an article

  Scenario: View article's author
    When I click on the first article's author name
    Then I navigate to the author's profile page

  Scenario: Navigate to a new page
    When I click on the second page
    Then I navigate to the second page of the list
