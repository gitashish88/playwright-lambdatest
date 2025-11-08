import { Locator, Page } from "@playwright/test";

export class LoginPage {
    
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator("input[name='email']");
        this.passwordInput = page.locator("input[name='password']");
        this.loginButton = page.locator("input[value='Login']");
    }

    async navigateToLoginPage() {
        await this.page.goto('https://ecommerce-playground.lambdatest.io/');
        await this.page.hover("a[data-toggle='dropdown'] span:has-text('My account')");
        await this.page.click("span:has-text('Login')");
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}