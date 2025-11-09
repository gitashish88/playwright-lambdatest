import { Page, test } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { MyAccountPage } from "../pages/my-account-page";

test.describe('Login Tests', () => {

    let page: Page;
    let loginPage: LoginPage;
    let myAccountPage: MyAccountPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        myAccountPage = new MyAccountPage(page);
    });

    test.afterEach(async ({ browser }) => {
        await page.close();
        await browser.close();
    });

    test('Login & logout with valid credentials',{ tag: ['@RegressionTests'] }, async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('a.r.sharma111@gmail.com', 'ashish@88');
        await page.waitForLoadState('networkidle');
        await myAccountPage.logoutUser();
    });

});