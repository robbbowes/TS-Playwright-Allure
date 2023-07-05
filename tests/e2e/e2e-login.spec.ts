import { test, expect } from '@playwright/test'
import { allure } from 'allure-playwright'

import { LoginPage } from '../../page-objects/LoginPage'
import { Severity } from '../../utils/severity'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Login / logout flow', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        homePage.visit()
        loginPage = await homePage.clickSignIn()
    })

    test('Unsuccessful login', async ({ page }) => {
        allure.severity(Severity[1])

        await loginPage.login('invalidusername', 'invalidpassword')
        const errorMessage = await loginPage.getErrorMessage()
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })

    test('Successful login', async ({ page }) => {
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
