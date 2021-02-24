Feature: Login

    As a user, 
    I want to be able to login to the application only when I input valid credentials,
    so that I can use the application to publish articles. 

    Background: 
        Given I am registered user
        And I open Login page
        When I input a correct username

    Scenario: Valid login    
        And I input a correct password
        And I click Login button
        Then my information is displayed in the header

    Scenario: Invalid login
        And I input incorrect password
        And I click Login button
        Then I see an error message
