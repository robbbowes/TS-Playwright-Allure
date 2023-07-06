import { expect } from '@playwright/test'
import { allure } from 'allure-playwright'

import { Severity } from '../../utils/severity'
import { openLoginPage as test } from './fixtures/login-fixtures'

test.describe('Login / logout flow', () => {

    test('Unsuccessful login', async ({ loginPage }) => {
        allure.severity(Severity[1])

        await loginPage.unsuccessfulLogin('invalidusername', 'invalidpassword')
        const errorMessage = await loginPage.getErrorMessage()
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })

    test('Successful login', async ({ loginPage, page }) => {
        allure.severity(Severity[1])

        await loginPage.login('username', 'password')
        const errorMessage = await loginPage.getErrorMessage()
        await expect(errorMessage).not.toBeVisible()

        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
        const summaryTab = await page.locator('#account_summary_tab')
        await expect(summaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})
