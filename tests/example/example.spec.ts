import { test, expect } from '@playwright/test'
import { TAGS } from '../../utils/tags'
import { loadHomepage, assertTitle, failTest } from './helpers'

test('Simple basic test', async ({ page }) => {
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test.describe('My first test suite', () => {
    test('Clicking on elements', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#signin_button')
        await page.click('text="Sign in"')
        const errorMessage = await page.locator('.alert.alert-error')

        await expect(errorMessage).toContainText(
            'Login and/or password are wrong.'
        )
    })

    test('Working with inputs', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#signin_button')

        await page.type('#user_login', 'login name')
        await page.type('#user_password', '1234567')
        await page.click('text="Sign in"')

        const errorMessage = await page.locator('.alert.alert-error')

        await expect(errorMessage).toContainText(
            'Login and/or password are wrong.'
        )
    })
})

test('Assertions' + TAGS.myTag, async ({ page }) => {
    await page.goto('https://example.com')

    await expect(page).toHaveURL('https://example.com')
    await expect(page).toHaveTitle('Example Domain')

    const heading = await page.locator('h1')
    await expect(heading).toBeVisible()
    await expect(heading).toHaveText('Example Domain')
    await expect(heading).toHaveCount(1)

    const nonexistantElement = await page.locator('h5')
    await expect(nonexistantElement).not.toBeVisible()
})

test.skip('Skipped test', async ({ page }) => {})

test.describe('Hooks', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com')
    })

    test('Full page screenshot', async ({ page }) => {
        // await page.goto('https://example.com')
        await page.screenshot({ path: 'screenshot.png', fullPage: true })
    })

    test('Single element screenshot', async ({ page }) => {
        // await page.goto('https://example.com')
        const el = await page.$('h1')
        await el?.screenshot({ path: 'single_element_screenshot.png' })
    })
})

test('Custom helpers', async ({ page }) => {
    await loadHomepage(page)
    // await page.pause()
    await assertTitle(page)
    await failTest(page)
})
