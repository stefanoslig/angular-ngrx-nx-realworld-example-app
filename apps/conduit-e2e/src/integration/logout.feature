Feature: Logout

    As a user,
    I want to be able to logout of the application,
    so that no one else can use my account.

    Scenario: Successful logout
        Given I am logged in to the system
        And I open Settings page
        When I press on Logout button
        Then my credentials are not displayed in the header anymore
