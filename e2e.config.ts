import { PlaywrightTestConfig, devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
    testDir: 'tests/e2e/',
    timeout: 60_000,
    retries: 0,
    fullyParallel: true,
    expect: {
        timeout: 5_000
    },
    use: {
        headless: true,
        viewport: {
            width: 1280,
            height: 720
        },
        actionTimeout: 10_000,
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure'
    },
    projects: [
        { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'Webkit', use: { ...devices['Desktop Safari'] } },
        { name: 'MobileChromium', use: { ...devices['Pixel 5'] } }
    ],
    reporter: [
        [
            'allure-playwright',
            {
                detail: true,
                outputFolder: 'allure-results',
                suiteTitle: true
            }
        ]
    ]
}

export default config
