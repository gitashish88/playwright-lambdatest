import { test, expect, chromium } from '@playwright/test';

test.describe('Demo for test context', () => {

    test('open the browser and set context', async () => {

        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://ecommerce-playground.lambdatest.io/');
        await page.hover("a[data-toggle='dropdown'] span:has-text('My account')");
        await page.click("span:has-text('Login')");
        await page.fill("input[name='email']", "a.r.sharma111@gmail.com");
        await page.fill("input[name='password']", "ashish@88");
        await page.click("input[value='Login']");
        await page.waitForLoadState('networkidle');
        await page.hover("a[data-toggle='dropdown'] span:has-text('My account')");
        await page.click('span:has-text("Logout")');
        
        // const page1 = await context.newPage();
        // await page1.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');

        // const newContext = await browser.newContext();
        // const newPage = await newContext.newPage();
        // await newPage.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');

        // newPage.close();
        // page1.close();

        page.close();
        await browser.close();
    })
})
