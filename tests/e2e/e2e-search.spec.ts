import { test, expect } from '@playwright/test'

test.describe('Search result', () => {
    test('Should return search results', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.fill('#searchTerm', 'Bank')
        await page.keyboard.press('Enter')

        const linkCount = await page.locator('li > a')
        await expect(linkCount).toHaveCount(2)
    })
})
