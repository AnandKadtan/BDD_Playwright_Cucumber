Feature: End to End Shopping Functionality
  Scenario: Verify End to End Orders placed successful
    Given User navigates to the login page
    When User enters valid username and password
    And User clicks on Login button
    And User should be redirected to dashboard
    And User clicks on Product &  Add To button
    And User Click on Checkout
    And User Payment Getway Verify Email ID
    And User Payment Getway Select Address
    And Click on Place Orders 
    And User should be Orders successful Thank You Visiting
    And Order ID Reverify to Order History Page
    And Bill Address verify Orders Summary Page.
    Then Placed Orders Should Deleted
    