
const fs = require('fs');
const path = require('path');

const {
    BeforeAll,
    Before,
    After,
    AfterAll,
    setDefaultTimeout
} = require('@cucumber/cucumber');

const { chromium } = require('playwright');
const AddShoppingPage = require('../pages/AddShoppingPage');
setDefaultTimeout(1000000);

let browser;

BeforeAll(async function () {

    browser = await chromium.launch({

        channel: 'chrome',

        headless: false,
        args: ['--start-maximized']

    });

});

Before(async function () {

    this.context = await browser.newContext({
                viewport: null

    });

    this.page = await this.context.newPage();
    this.addshoppingpage = new AddShoppingPage(this.page);
});
After(async function (scenario) {

    if (scenario.result.status === 'FAILED') {

        const screenshotDir = path.join(
            process.cwd(),
            'reports',
            'screenshots'
        );

        fs.mkdirSync(screenshotDir, { recursive: true });

        const screenshotPath = path.join(
            screenshotDir,
            `failure-${Date.now()}.png`
        );

        const screenshot = await this.page.screenshot({
            path: screenshotPath,
            fullPage: true
        });

        await this.attach(screenshot, 'image/png');

        console.log('Screenshot saved:', screenshotPath);
    }

    await this.context.close();

});

AfterAll(async function () {

    if (browser) {

        await browser.close();

    }

});



