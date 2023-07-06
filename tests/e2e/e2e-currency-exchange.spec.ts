import { expect } from '@playwright/test'
import { allure } from 'allure-playwright'

import { Severity } from '../../utils/severity'
import { openLoginPage as test } from './fixtures/login-fixtures'
import { NavigationBar } from '../../page-objects/components/NavigationBar'
import { OnlineBankingPage } from '../../page-objects/OnlineBankingPage'

test.describe('Currency conversion', () => {
    test('Convert Euros to US dollars', async ({ page, loginPage }) => {
        allure.severity(Severity[2])

        let navBar: NavigationBar = new NavigationBar(page)

        await loginPage.login('username', 'password')

        let onlineBankingPage: OnlineBankingPage = await navBar.clickOnlineBankingLink()
        await onlineBankingPage.clickPayBills();
        
        await page.getByRole('link', { name: 'Purchase Foreign Currency' }).click()

        await page.getByRole('combobox', { name: 'Currency' }).selectOption('EUR')
        await page.getByRole('textbox', { name: 'Amount Conversion Amount' }).fill('500')
        await page.getByLabel('U.S. dollar (USD)').check()
        await page.getByRole('button', { name: 'Calculate Costs' }).click()

        const conversionMessage = await page.locator('#pc_conversion_amount')
        await expect(conversionMessage).not.toBeEmpty()

        await page.getByRole('button', { name: 'Purchase' }).click()

        const successMessage = await page.locator('#alert_content')
        await expect(successMessage).toHaveText('Foreign currency cash was successfully purchased.')
    })
})

// test.beforeEach(async ({ page }) => {
//     await page.goto('http://zero.webappsecurity.com/')
//     await page.click('#signin_button')
//     await page.fill('#user_login', 'username')
//     await page.fill('#user_password', 'password')
//     await page.click('text=Sign in')
//     await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
// })
