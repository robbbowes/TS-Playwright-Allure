import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.only('Login / logout flow', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.visit()
    })

    // Negative scenario
    test('Negative scenario for login', async ({ page }) => {
        await loginPage.login('invalidusername', 'invalidpassword')
        const errorMessage = await loginPage.getErrorMessage()
        await expect(errorMessage).toContainText(
            'Login and/or password are wrong.'
        )
    })

    // Positive scenario
    test('Positive scenario for login', async ({ page }) => {
        await loginPage.login('username', 'password')
        const errorMessage = await loginPage.getErrorMessage()
        await expect(errorMessage).not.toBeVisible()

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