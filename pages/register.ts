import { Locator, Page } from '@playwright/test';

export class RegisterPage {

    readonly page: Page;
    readonly myAccountDropdown: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly telephoneInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly privacyPolicyCheckbox: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myAccountDropdown = page.locator("a[data-toggle='dropdown'] span:has-text('My account')");
        this.firstNameInput = page.locator("#input-firstname");
        this.lastNameInput = page.locator("#input-lastname");
        this.emailInput = page.locator("#input-email");
        this.telephoneInput = page.locator("#input-telephone");
        this.passwordInput = page.locator("#input-password");
        this.confirmPasswordInput = page.locator("#input-confirm");
        this.privacyPolicyCheckbox = page.locator("input[name='agree']");
        this.continueButton = page.locator("input[value='Continue']");
    }

    async navigateToRegisterPage() {
        await this.page.goto('https://ecommerce-playground.lambdatest.io/');
        await this.myAccountDropdown.click();
        await this.page.click("span:has-text('Register')");
    }

    async registerUser(firstName: string, lastName: string, email: string, telephone: string, password: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.telephoneInput.fill(telephone);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.privacyPolicyCheckbox.check();
        await this.continueButton.click();
    }

}