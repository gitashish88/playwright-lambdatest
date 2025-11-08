import { Locator, Page } from "@playwright/test";

export class MyAccountPage {

    readonly page: Page;
    readonly accountInformation: Locator;
    readonly changePassword: Locator;
    readonly myAccountDropdown: Locator;
    readonly logout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountInformation = page.locator("a[href='https://ecommerce-playground.lambdatest.io/index.php?route=account/account']");
        this.changePassword = page.locator("a[href='https://ecommerce-playground.lambdatest.io/index.php?route=account/password']");
         this.myAccountDropdown = page.locator("a[data-toggle='dropdown'] span:has-text('My account')");
        this.logout = page.locator("//span[normalize-space()='Logout']");
    }

    async navigateToAccountInformation() {
        await this.accountInformation.click();
    }

    async navigateToChangePassword() {
        await this.changePassword.click();
    }

    async logoutUser() {
        await this.myAccountDropdown.hover();
        await this.logout.click();
    }

    async clickSpecialHotMenuItem(itemText: string) {
        const menuItem = this.page.locator(`a:has-text('${itemText}')`);
        await menuItem.click();
    }

}