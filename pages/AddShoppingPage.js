const { expect } = require('@playwright/test');
class AddShoppingPage {

    constructor(page) {

        this.page = page;
        this.usernameInput = page.locator('#userEmail');
        this.passwordInput = page.locator('#userPassword');
        this.loginButton = page.getByRole("button",{name:'Login'});
        this.dashboardTitle = page.getByText('Automation Practice');
        this.cardTitle = page.locator('.card-body');
        this.card = page.locator("button[routerlink*='cart']")
        this.productName = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkout = page.getByRole("button",{name:'Checkout'});
        this.VerifyEmail = page.locator(".user__name [type='text']").first();
        this.enterCountry =  page.locator("[placeholder*='Select Country']");
        this.CountryDropdown = page.locator("section[class *='ta-results list']");
        this.placeOrder = page.locator("xpath =//a[@class='btnn action__submit ng-star-inserted']");
        this.wishvisiting = page.locator('h1.hero-primary');
        this.orderID = page.locator('.em-spacer-1 .ng-star-inserted');
        this.orderHistory =  page.locator("label[routerlink='/dashboard/myorders']");
        this.OrderRow =  page.locator(".ng-star-inserted [scope='row']");
        this.viewOrder = page.locator("button[class='btn btn-primary']");
        this.orderDetailsID = page.locator('.col-text.-main');
        this.BillAddress = page.locator('div.content-title').first();
        this.OrderSummaryEmailId = page.locator('div.content-title,p.text').nth(1);
        this.OrderSummaryCountry = page.locator('div.content-title,p.text').nth(2);
        this.OrderMenu = page.locator("button[routerlink='/dashboard/myorders']");
        this.DeleteOrders = page.getByRole("button",{name:'Delete'});
        this.OrderSuccessfullyDelete = page.getByRole('alert', { name: 'Orders Deleted Successfully' });
    }

    async navigateToLoginPage() {

        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async enterUsername(username) {

        await this.usernameInput.fill(username);
    }

    async enterPassword(password) {

        await this.passwordInput.fill(password);
    }

    async clickLogin() {

        await this.loginButton.click();
    }

    async verifyDashboard() {

        await this.dashboardTitle.waitFor({
            state: 'visible'
        });

        const title = await this.dashboardTitle.textContent();

        if (title !== 'Automation Practice') {
            throw new Error('Dashboard is not displayed');
        }
    }

 async selectProduct(){
          await this.cardTitle.nth(1).waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.cardTitle.filter({hasText:"ZARA COAT 3"}).getByRole("button", {name: ' Add To Cart'}).click()
        await this.card.click()
    }
 async  checkoutOrder(){

    await this.productName.waitFor({
        state :"visible",
        timeout:10000
    });
   const OrderProduct =  await this.productName.textContent()
   expect(OrderProduct).toBeTruthy()
    await this.checkout.click()
 }
 async verifyEmailId(){
    expect(await this.VerifyEmail).toHaveText("anandkadtan123@gmail.com")
  
 }
 async ClickCountryName(){
    await this.enterCountry.click()
    
 }
 async enterCountryName(countryentername){
    await this.enterCountry.pressSequentially(countryentername)
 }
 async SelectDropdwonCountryName(){

     await this.CountryDropdown.filter({hasText:" India"}).locator("xpath=//span[@class='ng-star-inserted']").nth(1).click()
 }
 async clickPlaceOrder(){
   await this.placeOrder.click()
 }
 async ThankYouVisiting(){

    await expect(await this.wishvisiting).toHaveText("Thankyou for the order.")
    
 }
async OrderHistoryclick(){

    this.orderid  = await this.orderID.innerText()
    console.log(this.orderid)
  await this.orderHistory.click()
  
}
async Order_History_Page_Verify_OrderID(){
await this.OrderRow.last().waitFor()
const OrderCount = await this.OrderRow.count()
for(let i = 0 ; i < OrderCount ; ++i){
    const OrderIDRow = await this.OrderRow.nth(i).textContent();
if(this.orderid.includes(OrderIDRow))
{
   await  this.viewOrder.nth(i).click();
   break;
}
}
const orderdetailID = await this.orderDetailsID.innerText();
await expect(this.orderid).toContain(orderdetailID);

}

async Bill_Address_Reverify(){
await expect(this.BillAddress).toBeTruthy()
 expect( await this.OrderSummaryEmailId).toContainText("anandkadtan123@gmail.com")
const ordersummarycountry = await this.OrderSummaryCountry.textContent()
const CountryName = ordersummarycountry.split("-")[1]
await expect(CountryName).toContain("India")

}

async Click_On_Orders(){

await this.OrderMenu.click()

}

async Generate_Order_is_Deleted(){
await this.OrderRow.last().waitFor(); 
const orderNo = this.orderid.trim();
 const Order_Count = await this.OrderRow.count()
 for(let j = 0 ; j < Order_Count; j++){
 const OrderNoRow =  await this.OrderRow.nth(j).textContent()
 if(orderNo.includes(OrderNoRow)){
   await this.DeleteOrders.nth(j).click()
   break;
 }
 }
 const DeleteToastMessage = await this.OrderSuccessfullyDelete.textContent()
 console.log(DeleteToastMessage)
 //await expect(await this.OrderSuccessfullyDelete).toBeVisible()

}

}

module.exports = AddShoppingPage;