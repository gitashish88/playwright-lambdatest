import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';        //npm install dotenv --save-dev

//lambdatest-capabilities
const capabilities = {
    browserName: "Chrome",
    browserVersion: "latest",
    "LT:Options": {
        platform: "WINDOWS 10",
        build: "Playwright Test from config",
        name: "Playwright Test - Config File",
        user: "arsharma111",
        accessKey: "LT_7odLgeLge64DAjA29czpWghXmy208Iw3RcPPJFAdy67DJ7I",
        network: true,
        video: true,
        console: true,
        tunnel: false,
        tunnelName: "",
        geoLocation: "",
        visual: true,
    },
};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// Read from ".env" file
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    ['dot']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
 
  use: {
    connectOptions: {
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=
            ${encodeURIComponent(JSON.stringify(capabilities))}`,
    },
    baseURL: process.env.BASE_URL || 'https://ecommerce-playground.lambdatest.io/', // Example usage
    headless: process.env.CI ? true : false,
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'on',
    video: 'on',
  },

  grep: /@RegressionTests/,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
