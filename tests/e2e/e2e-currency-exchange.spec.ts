import { test, expect } from '@playwright/test'

test.describe('Currency conversion', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#signin_button')
        await page.fill('#user_login', 'username')
        await page.fill('#user_password', 'password')
        await page.click('text=Sign in')
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
    })

    test('Convert Euros to US dollars', async ({ page }) => {
        await page
            .getByRole('link', { name: 'Purchase Foreign Currency' })
            .click()

        await page
            .getByRole('combobox', { name: 'Currency' })
            .selectOption('EUR')
        await page
            .getByRole('textbox', { name: 'Amount Conversion Amount' })
            .fill('500')
        await page.getByLabel('U.S. dollar (USD)').check()
        await page.getByRole('button', { name: 'Calculate Costs' }).click()

        const conversionMessage = await page.locator('#pc_conversion_amount')
        await expect(conversionMessage).not.toBeEmpty()

        await page.getByRole('button', { name: 'Purchase' }).click()
        const successMessage = await page.locator('#alert_content')
        await expect(successMessage).toHaveText(
            'Foreign currency cash was successfully purchased.'
        )
    })
})
