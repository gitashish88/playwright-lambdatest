import { Page, test } from "@playwright/test";
import { SeleniumPlaygroundPage } from "../pages/seleniumPlaygroundPage";
import { DragAndDropSlidersPage } from "../pages/dragAndDropSlidersPage";


test.describe("Playwright 102 Certification Tests - Drag and Drop Sliders", () => {

    let page: Page;
    let seleniumPlaygroundPage: SeleniumPlaygroundPage;
    let dragAndDropSlidersPage: DragAndDropSlidersPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        seleniumPlaygroundPage = new SeleniumPlaygroundPage(page);
        dragAndDropSlidersPage = new DragAndDropSlidersPage(page);
    });

    test.afterEach(async ({ browser }) => {
        await page.close();
        await browser.close();
    });

    test("Drag and Drop Sliders - Move Slider Test", { tag: ['@RegressionTests'] }, async () => {

        await seleniumPlaygroundPage.navigateToSeleniumPlaygroungPage();
        await seleniumPlaygroundPage.ClickDragAndDropSlidersLink();
        await dragAndDropSlidersPage.MoveSlider(95);

    });

});