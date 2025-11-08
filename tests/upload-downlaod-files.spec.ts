import { test, expect } from '@playwright/test';

test.describe('Download & Upload Files', () => {
    
    test('Download Files', async ({ page }) => {
        await page.goto('https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo');
        await page.fill("textarea#textbox", "This is a sample text file generated using Playwright");
        await page.click("button#create");
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.click("a#link-to-download") // Triggers the download
        ]);

        // path where the file is downloaded
        const path = await download.path();
        console.log("Downloaded file path: " + path);
        // file name of the downloaded file
        const filename = download.suggestedFilename();
        console.log("Downloaded file name: " + filename);
        // Save downloaded file to a specific location
        await download.saveAs(`./${filename}`);

        // Verify file name
        expect(download.suggestedFilename()).toBe("Lambdainfo.txt");
         
    });

    test('Upload Files - element type is file', async ({ page }) => {
        await page.goto('https://blueimp.github.io/jQuery-File-Upload/');
        const filePath = './Lambdainfo.txt';
        await page.setInputFiles('input[type="file"]', [filePath]);
        await page.waitForTimeout(2000); // wait for 2 seconds to see the file uploaded in UI
    });

    test('Upload Files - element type is not file', async ({ page }) => {
        await page.goto('https://blueimp.github.io/jQuery-File-Upload/');
        const [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser'),
            page.click("input[type='file']") // button that triggers file selection
        ]);
        console.log("Multiple files allowed: " + fileChooser.isMultiple());
        const filePath = './Lambdainfo.txt';
        await fileChooser.setFiles([filePath]);
        await page.waitForTimeout(2000); // wait for 2 seconds to see the file uploaded in UI
    });

});
