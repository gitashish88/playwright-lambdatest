import { expect, test } from '@playwright/test';

test.describe('Handle inputs and buttons', () => {
    test('basic interactions demo', async ({ page }) => {

        await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
        const userMessageInput = page.locator("input#user-message");
        console.log(await userMessageInput.getAttribute("placeholder")); // Get attribute value
        await expect(userMessageInput).toHaveAttribute('placeholder', 'Please enter your Message'); // Assert attribute value
        console.log("Before entering the data: " + await userMessageInput.inputValue()); // Get input value
        await userMessageInput.fill('Hello, LambdaTest!');
        console.log("After entering the data: " + await userMessageInput.inputValue()); // Get input value
    });

    test('sumation demo', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
        const firstNumberInput = page.locator("input#sum1");
        const secondNumberInput = page.locator("input#sum2");
        const getTotalButton = page.locator("//button[text()='Get Sum']");
        const resultText = page.locator("p#addmessage");

        let num1 = 10;
        let num2 = 20;
        await firstNumberInput.fill("" + num1);
        await secondNumberInput.fill("" + num2);
        await getTotalButton.click();
        console.log("Result: " + await resultText.textContent());
        let addition = num1 + num2;
        await expect(resultText).toHaveText('' + addition);
    });

    test('checkbox demo', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/checkbox-demo');
        const singleCheckbox = page.locator("//label[normalize-space()='Click on check box']/input");
        await expect(singleCheckbox).not.toBeChecked();
        await singleCheckbox.check();
        await expect(singleCheckbox).toBeChecked();
    });
});