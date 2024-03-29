import { test, expect } from '@playwright/test'
import { allure } from 'allure-playwright'
import { Severity } from '../../utils/severity'

test.describe('Filter transactions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#signin_button')
        await page.fill('#user_login', 'username')
        await page.fill('#user_password', 'password')
        await page.click('text=Sign in')
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

    test('Verify the results for each account', async ({ page }) => {
        allure.severity(Severity[3])

        await page.click('#account_activity_tab')
        await page.selectOption('#aa_accountId', '2')
        const checkinAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(checkinAccount).toHaveCount(3)

        await page.selectOption('#aa_accountId', '4')
        const loanAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(loanAccount).toHaveCount(2)

        await page.selectOption('#aa_accountId', '6')
        const noResults = await page.locator('.well')
        await expect(noResults).toBeVisible()
    })
})
