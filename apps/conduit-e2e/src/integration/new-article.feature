Feature: New article

    As a user,
    I want to be able to publish an article,
    so that I can share it with the other users.

    Background:
        Given I am logged in to the system 
        And I am on New Post page
        When I input the title of the article
        And I input the summary of the article
        And I input the body of the article
        And I input tags of the article
        And I click Publish button

    Scenario: Publishing article
        Then a new article is published

    Scenario: New article in My Articles section
        Then the new article is displayed in My Articles section

    Scenario: New article in Global Feed
        Then the new article is displayed in Global Feed
