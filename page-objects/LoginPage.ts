import { Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'
import { HomePage } from './HomePage'

export class LoginPage extends AbstractPage {
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator

    constructor(page: Page) {
        super(page)
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.submitButton = page.locator('input[name="submit"]')
        this.errorMessage = page.locator('.alert-error')
    }

    async visit(): Promise<void> {
        await this.page.goto('http://zero.webappsecurity.com/')
    }

    async login(username: string, password: string): Promise<HomePage> {
        await this.loginHelper(username, password)
        await this.page.goto('http://zero.webappsecurity.com//index.html')
        return new HomePage(this.page)
    }

    async unsuccessfulLogin(username: string, password: string) {
        await this.loginHelper(username, password)
        await this.errorMessage.waitFor()
    }

    async getErrorMessage(): Promise<Locator> {
        return await this.errorMessage
    }

    private async loginHelper(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }
}
