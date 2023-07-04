import { test, expect } from '@playwright/test'

test.describe('Feedback form submit', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#feedback')
    })

    test('Reset feedback form', async ({ page }) => {
        await page.fill('#name', 'some name')
        await page.fill('#email', 'some@email.com')
        await page.fill('#subject', 'some subject')
        await page.fill('#comment', 'some comment')

        let name = await page.locator('#name')
        let email = await page.locator('#email')
        let subject = await page.locator('#subject')
        let comment = await page.locator('#comment')

        await expect(name).not.toBeEmpty()
        await expect(email).not.toBeEmpty()
        await expect(subject).not.toBeEmpty()
        await expect(comment).not.toBeEmpty()

        await page.click('input[name="clear"]')

        await expect(name).toBeEmpty()
        await expect(email).toBeEmpty()
        await expect(subject).toBeEmpty()
        await expect(comment).toBeEmpty()
    })

    test('Submit feedback form', async ({ page }) => {
        await page.fill('#name', 'some name')
        await page.fill('#email', 'some@email.com')
        await page.fill('#subject', 'some subject')
        await page.fill('#comment', 'some comment')

        let name = await page.locator('#name')
        let email = await page.locator('#email')
        let subject = await page.locator('#subject')
        let comment = await page.locator('#comment')

        await expect(name).not.toBeEmpty()
        await expect(email).not.toBeEmpty()
        await expect(subject).not.toBeEmpty()
        await expect(comment).not.toBeEmpty()

        await page.click('input[name="submit"]')

        await page.getByText('Thank you for your comments, some name.')
    })
})
