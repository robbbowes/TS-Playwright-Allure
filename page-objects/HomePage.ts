import { Locator, Page } from '@playwright/test'
import { LoginPage } from './LoginPage'

export class HomePage {
    readonly page: Page
    readonly signInButton: Locator

    constructor(page: Page) {
        this.page = page

        this.signInButton = page.locator('#signin_button')
    }

    async visit(): Promise<void> {
        await this.page.goto('http://zero.webappsecurity.com/')
    }

    async clickSignIn(): Promise<LoginPage> {
        await this.signInButton.click()
        return new LoginPage(this.page)
    }
}
