import { test, expect } from '@playwright/test'
import { allure } from 'allure-playwright'
import { Severity } from '../../utils/severity'

test.describe('Transfer funds and ake payments', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#signin_button')
        await page.fill('#user_login', 'username')
        await page.fill('#user_password', 'password')
        await page.click('text=Sign in')
        await page.goto(
            'http://zero.webappsecurity.com/bank/transfer-funds.html'
        )
    })

    test('Transfer funds', async ({ page }) => {
        allure.severity(Severity[2])

        await page.click('#transfer_funds_tab')
        await page.selectOption('#tf_fromAccountId', '2')
        await page.selectOption('#tf_toAccountId', '3')
        await page.fill('#tf_amount', '500')
        await page.fill('#tf_description', 'Test message')
        await page.click('#btn_submit')

        const boardHeader = await page.locator('h2.board-header')
        await expect(boardHeader).toContainText('Verify')
        await page.click('#btn_submit')

        const message = await page.locator('.alert-success')
        await expect(message).toContainText(
            'You successfully submitted your transaction'
        )
    })
})
