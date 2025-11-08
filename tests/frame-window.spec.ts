import { test, expect } from '@playwright/test';

test.describe('Handle frames and windows', () => {

    test('frame demo', async ({ page }) => {
        await page.goto('https://letcode.in/frame');

        const frames = page.frames();
        console.log("Total number of frames: " + frames.length);

        const firstFrame = page.frameLocator("iframe#firstFr");
        await firstFrame?.locator("input[placeholder='Enter name']").fill('Ashish');
        await firstFrame?.locator("input[placeholder='Enter email']").fill('test@test.com');
        expect(await firstFrame?.locator("//p[@class='title has-text-info']").textContent()).toContain('Ashish');

        const secondFrame = firstFrame.frameLocator("iframe[src='innerframe']");
        await secondFrame?.locator("input[placeholder='Enter email']").fill('LambdaTestt@test.com');
    });

    test('new tab/window demo', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo');
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.click("'Follow On Twitter'"),
        ]);
        console.log("New page URL: " + newPage.url());
        console.log("New page title: " + await newPage.title());
        await newPage.close();
    });

    test('multiple tabs/windows demo', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/window-popup-modal-demo');
        const [multiPages] = await Promise.all([
            page.waitForEvent('popup'),
            page.click("#followall"),
        ]);

        const pages = multiPages.context().pages();
        console.log("Total pages: " + pages.length);
        for (const pg of pages) {
            console.log("Page URL: " + pg.url());
            console.log("Page Title: " + await pg.title());
        }
        let facebookPage = pages.find(p => p.url().includes('facebook'));
        console.log("Facebook Page URL: " + facebookPage?.url());
        await facebookPage?.close();
    });
});