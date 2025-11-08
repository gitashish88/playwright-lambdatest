import { test, expect, chromium } from '@playwright/test';

//lambdatest-capabilities
const capabilities = {
    browserName: "Chrome",
    browserVersion: "latest",
    "LT:Options": {
        platform: "WINDOWS 10",
        build: "Playwright Test Build",
        name: "Playwright Test",
        user: "arsharma111",
        accessKey: "LT_7odLgeLge64DAjA29czpWghXmy208Iw3RcPPJFAdy67DJ7I",
        network: true,
        video: true,
        console: true,
        tunnel: false,
        tunnelName: "",
        geoLocation: "",
    },
};

test.describe('Demo for test context', () => {

    test('open the browser and set context', async () => {

        const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=
            ${encodeURIComponent(JSON.stringify(capabilities))}`);
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(process.env.URL || '');
        await page.hover("a[data-toggle='dropdown'] span:has-text('My account')");
        await page.click("span:has-text('Login')");
        await page.fill("input[name='email']", "a.r.sharma111@gmail.com");
        await page.fill("input[name='password']", "ashish@88");
        await page.click("input[value='Login']");
        await page.close();
        await browser.close();
    })
})
