Feature: Login

    As a user, 
    I want to be able to login to the application only when I input valid credentials,
    so that I can use the application to publish articles. 

    Background: 
        Given I am registered user
        And I open Login page
        When @login I input a correct username

    Scenario: Valid login    
        And @login I input a correct password
        And @login I click Login button
        Then @home my information is displayed in the header

    Scenario: Invalid login
        And @login I input incorrect password
        And @login I click Login button
        Then @login I see an error message
