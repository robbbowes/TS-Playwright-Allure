import { Locator, Page } from '@playwright/test'
import { LoginPage } from './LoginPage'
import { SearchResultsPage } from './SearchResultsPage'

export class HomePage {
    readonly page: Page
    readonly signInButton: Locator
    readonly searchInput: Locator

    constructor(page: Page) {
        this.page = page

        this.signInButton = page.locator('#signin_button')
        this.searchInput = page.locator('#searchTerm')
    }

    async visit(): Promise<void> {
        await this.page.goto('http://zero.webappsecurity.com/')
    }

    async clickOnSignIn(): Promise<LoginPage> {
        await this.signInButton.click()
        return new LoginPage(this.page)
    }

    async search(searchTerm: string): Promise<SearchResultsPage> {
        await this.searchInput.fill(searchTerm)
        await this.page.keyboard.press('Enter')
        return new SearchResultsPage(this.page)
    }

}
