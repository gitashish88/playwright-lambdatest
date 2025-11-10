import { expect, Locator, Page } from "@playwright/test";

export class InputFormSubmitPage {

    readonly page: Page;
    readonly nameInputField: Locator;
    readonly emailInputField: Locator;
    readonly passwordInputField: Locator;
    readonly companyInputField: Locator;
    readonly websiteInputField: Locator;
    readonly countryDropdown: Locator;
    readonly cityInputField: Locator;
    readonly address1InputField: Locator;
    readonly address2InputField: Locator;
    readonly stateInputField: Locator;
    readonly zipCodeInputField: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInputField = page.locator('#name');
        this.emailInputField = page.locator('#inputEmail4');
        this.passwordInputField = page.locator('#inputPassword4');
        this.companyInputField = page.locator('#company');
        this.websiteInputField = page.locator('#websitename');
        this.countryDropdown = page.locator("select[name='country']");
        this.cityInputField = page.locator('#inputCity');
        this.address1InputField = page.getByRole('textbox', { name: 'Address 1' });
        this.address2InputField = page.getByRole('textbox', { name: 'Address 2' });
        this.stateInputField = page.locator("#inputState");
        this.zipCodeInputField = page.locator('#inputZip');
        this.submitButton = page.locator('button').filter({ hasText: 'Submit' });
    }

    // Validate the required field error for name input
    async ValidateNameRequiredError(message: string) {
        // Check if the name input field is valid
        const isValid = await this.nameInputField.evaluate(el => (el as HTMLInputElement).checkValidity());
        //Get the validation message and compare with expected message
        const validationMessage = await this.nameInputField.evaluate(el => (el as HTMLInputElement).validationMessage);
        expect(validationMessage).toMatch(message);
    }

    // Fill the form with provided details
    async FillForm(details: {
        name: string;
        email: string;
        password: string;
        company: string;
        website: string;
        country: string;
        city: string;
        address1: string;
        address2: string;
        state: string;
        zipCode: string;
    }) {
        await this.nameInputField.fill(details.name);
        await this.emailInputField.fill(details.email);
        await this.passwordInputField.fill(details.password);
        await this.companyInputField.fill(details.company);
        await this.websiteInputField.fill(details.website);
        await this.countryDropdown.selectOption({ label: details.country });
        await this.cityInputField.fill(details.city);
        await this.address1InputField.fill(details.address1);
        await this.address2InputField.fill(details.address2);
        await this.stateInputField.fill(details.state);
        await this.zipCodeInputField.fill(details.zipCode);
    }

    // Click the submit button to submit the form
    async ClickSubmitForm() {
        await this.submitButton.click();
    }

    // Validate the thank you message after form submission
    async ValidateThanksMessage(expectedText: string) {
        await expect(this.page.getByText(expectedText)).toBeVisible();
        await expect(this.page.getByText(expectedText)).toHaveText(expectedText);
    }

}