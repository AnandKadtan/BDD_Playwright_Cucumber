require('dotenv').config();

const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;
const countryentername = process.env.TEST_COUNTRY;
const {
    Given,
    When,
    Then
} = require('@cucumber/cucumber');

const AddShoppingPage = require('../../pages/AddShoppingPage');

Given('User navigates to the login page', async function () {
    this.addshoppingpage = new AddShoppingPage(this.page);
    await this.addshoppingpage.navigateToLoginPage();
});
When('User enters valid username and password', async function () {
    await this.addshoppingpage.enterUsername(username);
    await this.addshoppingpage.enterPassword(password);
});
When('User clicks on Login button', async function () {
    await this.addshoppingpage.clickLogin();
});
When('User should be redirected to dashboard', async function () {
    await this.addshoppingpage.verifyDashboard();
    console.log('Login successful');
});
When('User clicks on Product &  Add To button', async function () {
    await this.addshoppingpage.selectProduct();
    console.log("Product added to cart");
});
When('User Click on Checkout', async function () {
    await this.addshoppingpage.checkoutOrder()
    console.log("Order Checkout");
});
When('User Payment Getway Verify Email ID',async function () {

await this.addshoppingpage.verifyEmailId();
console.log("Verify that the Email Id");
});

When('User Payment Getway Select Address',async function () {
await this.addshoppingpage.ClickCountryName()
await this.addshoppingpage.enterCountryName(countryentername);
await this.addshoppingpage.SelectDropdwonCountryName()
});
When('Click on Place Orders',async function () {
await this.addshoppingpage.clickPlaceOrder()
});
When('User should be Orders successful Thank You Visiting', async function (){
    await this.addshoppingpage.ThankYouVisiting()
});
When('Order ID Reverify to Order History Page', async function() {
    await this.addshoppingpage.OrderHistoryclick()
    await this.addshoppingpage.Order_History_Page_Verify_OrderID()
} );
When('Bill Address verify Orders Summary Page.',async function(){

  await this.addshoppingpage.Bill_Address_Reverify()

});
Then('Placed Orders Should Deleted',async function() {
    await this.addshoppingpage.Click_On_Orders()
    await this.page.pause()
    await this.addshoppingpage.Generate_Order_is_Deleted()
});