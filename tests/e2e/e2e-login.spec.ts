import { test, expect } from '@playwright/test'

test.describe('Login / logout flow', () => {
    // Before Hook
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
    })

    // Negative scenario
    test('Negative scenario for login', async ({ page }) => {
        await page.click('#signin_button')
        await page.fill('#user_login', 'invalid username')
        await page.fill('#user_password', 'invalid password')
        await page.click('input[name="submit"]')
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText(
            'Login and/or password are wrong.'
        )
    })

    // Positive scenario
    test('Positive scenario for login', async ({ page }) => {
        await page.click('#signin_button')
        await page.fill('#user_login', 'username')
        await page.fill('#user_password', 'password')
        await page.click('input[name="submit"]')

        await page.goto(
            'http://zero.webappsecurity.com/bank/transfer-funds.html'
        )
        const summaryTab = await page.locator('#account_summary_tab')
        await expect(summaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL(
            'http://zero.webappsecurity.com/index.html'
        )
    })
})
