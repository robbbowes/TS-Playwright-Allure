import { test, expect } from '@playwright/test'

test.describe('Visual regression test', () => {
    test('Full page snapshot', async ({ page }) => {
        await page.goto('https://www.example.com')
        expect(await page.screenshot()).toMatchSnapshot('homepage.png')
    })
    test('Single element snapshot', async ({ page }) => {
        await page.goto('https://www.example.com')
        const pageTitle = await page.$('h1')
        expect(await pageTitle?.screenshot()).toMatchSnapshot('page-title.png')
    })
})
