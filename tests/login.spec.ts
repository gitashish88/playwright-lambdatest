import { Page, test, expect } from "@playwright/test";
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

    test.afterEach(async () => {
        await page.close();
    });

    test('Login & logout with valid credentials', async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('a.r.sharma111@gmail.com', 'ashish@88');
        await page.waitForLoadState('networkidle');
        await myAccountPage.logoutUser();
    });

    // test('Login with invalid credentials', async () => {
    //     await loginPage.navigateToLoginPage();
    //     await loginPage.login('invalid@example.com', 'wrongpassword');
    //     await expect(loginPage.errorMessage).toBeVisible();
    // });

});