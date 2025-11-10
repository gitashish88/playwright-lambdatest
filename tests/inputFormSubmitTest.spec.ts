import { Page, test } from "@playwright/test";
import { SeleniumPlaygroundPage } from "../pages/seleniumPlaygroundPage";
import { InputFormSubmitPage } from "../pages/inputFormSubmitPage";

test.describe("Playwright 102 Certification Tests - Input Form Submit", () => {

    let page: Page;
    let seleniumPlaygroundPage: SeleniumPlaygroundPage;
    let inputFormSubmitPage: InputFormSubmitPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        seleniumPlaygroundPage = new SeleniumPlaygroundPage(page);
        inputFormSubmitPage = new InputFormSubmitPage(page);
    });

    test.afterEach(async ({ browser }) => {
        await page.close();
        await browser.close();
    });

    test("Input Form Submit - Validate Form Submission", { tag: ['@RegressionTests'] }, async () => {

        const thanksMessage = "Thanks for contacting us, we will get back to you shortly."

        await seleniumPlaygroundPage.navigateToSeleniumPlaygroungPage();
        await seleniumPlaygroundPage.ClickInputFormSubmitLink();
        await inputFormSubmitPage.ClickSubmitForm();
        await inputFormSubmitPage.ValidateNameRequiredError("Please fill out this field.");
        await inputFormSubmitPage.FillForm({
            name: "John Doe",
            email: "john.doe@example.com",
            password: "SecurePass123",
            company: "Example Corp",
            website: "www.example.com",
            country: "United States",
            city: "New York",
            address1: "123 Main St",
            address2: "Suite 400",
            state: "NY",
            zipCode: "10001"
        });
        await inputFormSubmitPage.ClickSubmitForm();
        await inputFormSubmitPage.ValidateThanksMessage(thanksMessage);

    });

});