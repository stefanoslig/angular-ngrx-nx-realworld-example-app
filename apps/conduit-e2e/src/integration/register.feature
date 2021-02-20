Feature: Register

    As a user,
    I want to be able to create a new account,
    so that I can use the application for publishing articles.

    Background: 
        Given I open Register page

    Scenario: Successfull registration
        When @register I input correct username
        And @register I input correct email
        And @register I input correct password
        And @register I click Sign up button
        Then @home my information is displayed in the header

    Scenario: Invalid registration
        When @register I input username that already exists
        And @register I input email that already exists
        And @register I input correct password
        And @register I click Sign up button
        Then @register an error message 'email has already been taken' is displayed
        Then @register an error message 'username has already been taken' is displayed
