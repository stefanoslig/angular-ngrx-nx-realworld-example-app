Feature: Settings

    As a user,
    I want to be able to update my account settings.

    Background:
        Given I am logged in to the system
        And I open Settings page
        And I wait for current username to appear

    Scenario: Successfull settings update
        When I input new username
        And I input new bio
        And I click Update Settings button
        Then I am redirected to profile
        Then my new username is displayed in the header
        Then I open Settings page
        Then I see new username
        Then I see new bio

