import { expect, Locator, Page } from "@playwright/test";

export class DragAndDropSlidersPage {

    readonly page: Page;
    readonly dragAndDropSlidersLink: Locator;
    readonly defaultValue15Slider: Locator;
    readonly rangeSuccess: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dragAndDropSlidersLink = page.getByRole('link', { name: 'Drag & Drop Sliders' });
        this.defaultValue15Slider = page.locator("//input[@type='range'][@value='15']");
        this.rangeSuccess = page.locator("#rangeSuccess");
    }

    async ClickDragAndDropSlidersLink() {
        //Navigate to Drag and Drop Sliders page
        await this.dragAndDropSlidersLink.click();
    }

    async MoveSlider(value: number) {
        
        //Elements for slider and value output
        const slider = this.defaultValue15Slider;
        const output = this.rangeSuccess;

        //Check and focus on slider
        await expect(slider).toBeVisible();
        await slider.focus();
        let currentVal = Number(await output.textContent());
        let tries = 0;

        //Move slider to desired value
        while (currentVal !== value && tries < 200) {
            if (currentVal < value) {
                await slider.press('ArrowRight');
            } else {
                await slider.press('ArrowLeft');
            }
            currentVal = Number(await output.textContent());
            tries++;
        }

        //Verify the output value
        await expect(output).toHaveText(String(value));
    }

}