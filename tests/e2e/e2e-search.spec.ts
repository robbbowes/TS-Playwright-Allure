import { test, expect } from '@playwright/test'
import { allure } from "allure-playwright";
import { Severity } from '../../utils/severity';

test.describe('Search result', () => {

    test('Should return search results', async ({ page }) => {
        allure.severity(Severity[4])

        await page.goto('http://zero.webappsecurity.com/')
        await page.fill('#searchTerm', 'Bank')
        await page.keyboard.press('Enter')

        const linkCount = await page.locator('li > a')
        await expect(linkCount).toHaveCount(2)
    })
})
