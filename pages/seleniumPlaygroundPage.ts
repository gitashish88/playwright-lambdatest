import { Locator, Page } from "@playwright/test";

export class SeleniumPlaygroundPage {

    readonly page: Page;
    readonly simpleFormDemoLink: Locator;
    readonly inputFormSubmitLink: Locator;
    readonly dragAndDropSlidersLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.simpleFormDemoLink = page.getByRole('link', { name: 'Simple Form Demo' });
        this.inputFormSubmitLink = page.getByRole('link', { name: 'Input Form Submit' });
        this.dragAndDropSlidersLink = page.getByRole('link', { name: 'Drag & Drop Sliders' });
    }

    async navigateToSeleniumPlaygroungPage() {
        await this.page.goto('https://www.lambdatest.com/selenium-playground/');
    }

    //Click on Simple Form Demo link
    async ClickSimpleFormDemoLink() {
        await this.simpleFormDemoLink.click();
    }

    //Click on Input Form Submit link
    async ClickInputFormSubmitLink() {
        await this.inputFormSubmitLink.click();
    }

    //Click on Drag and Drop Sliders link
    async ClickDragAndDropSlidersLink() {
        await this.dragAndDropSlidersLink.click();
    }
}