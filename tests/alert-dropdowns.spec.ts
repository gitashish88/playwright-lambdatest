import { test, expect } from '@playwright/test';

test.describe('Handle alerts and dropdowns', () => {
    test('alert demo', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');
        const alertButton = page.locator("button:has-text('Click Me')").first();
        page.on('dialog', async (dialog) => {
            console.log("Alert message: " + dialog.message());
            await dialog.accept();
        });
        await alertButton.click();
    });

    test('confirm demo', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');
        const confirmButton = page.locator("button:has-text('Click Me')").nth(1);
        page.on('dialog', async (dialog) => {
            console.log("Confirm message: " + dialog.message());
            await dialog.dismiss();
        });
        await confirmButton.click();
        await expect(page.locator("p#confirm-demo")).toHaveText('You pressed Cancel!');
    });

    test('prompt demo', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo');
        const promptButton = page.locator("button:has-text('Click Me')").last();
        const inputText = "Playwright Test";
        page.on('dialog', async (dialog) => {
            console.log("Prompt Input message Before: " + dialog.defaultValue());
            await dialog.accept(inputText);
        });
        await promptButton.click();
        await expect(page.locator("p#prompt-demo")).toContainText(inputText);
    });

    test('bootstrap modal demo', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo');
        const launchModalButton = page.locator("button:has-text('Launch Modal')").first();
        await launchModalButton.click();
        await page.locator("button:has-text('Save changes')").first().click();

    });


    test('single dropdown demo', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
        await page.selectOption("select#select-demo", 'Friday');
        await page.selectOption("select#select-demo", {
            //label: 'Monday'
            //index: 2
            value: 'Monday'
        });
        await page.selectOption("select#multi-select", [
            { value: 'California' },
            { label: 'Ohio' },
            { index: 2 }
        ]);
    });

    test('bootstrap dropdown demo', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo');
        await SelectCountry("India");
        await SelectCountry("Denmark");
        await SelectCountry("South Africa");
        await page.waitForTimeout(2000);

        async function SelectCountry(name: string) {
            await page.click("select#country+span");
            await page.locator("ul#select2-country-results").locator(`li:has-text('${name}')`).click();
        }
    });

});

