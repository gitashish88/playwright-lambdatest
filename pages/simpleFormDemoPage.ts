import { expect, Locator, Page } from "@playwright/test";

export class SimpleFormDemoPage {
    
    readonly page: Page;
    readonly enterMessageInputField: Locator;
    readonly getCheckedValueButton: Locator;
    readonly yourMessageText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.enterMessageInputField = page.getByPlaceholder('Please enter your Message');
        this.getCheckedValueButton = page.locator('#showInput');
        this.yourMessageText = page.locator('#message');
    }

    // Validate URL to contain expected string
    async ValidateURL(expectedURL: string) {
        expect(this.page.url()).toContain(expectedURL);
    }

    // Enter message in input field
    async EnterMessage(message: string) {
        await this.enterMessageInputField.fill(message);
    }

    // Click on Get Checked Value button
    async ClickGetCheckedValueButton() {
        await this.getCheckedValueButton.click();
    }

    // Validate Your Message text to contain expected text
    async ValidateYourMessageText(expectedText: string) {
        await expect(this.yourMessageText).toHaveText(expectedText);
    }
    
}