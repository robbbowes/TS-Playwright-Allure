import { Locator, Page } from '@playwright/test'
import { LoginPage } from './LoginPage'
import { SearchResultsPage } from './SearchResultsPage'
import { FeedbackPage } from './FeedbackPage'
import { AbstractPage } from './AbstractPage'

export class HomePage extends AbstractPage {
    readonly signInButton: Locator
    readonly searchInput: Locator
    readonly feedbackButton: Locator

    constructor(page: Page) {
        super(page)
        this.signInButton = page.locator('#signin_button')
        this.searchInput = page.locator('#searchTerm')
        this.feedbackButton = page.locator('#feedback')
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

    async clickOnFeedback(): Promise<FeedbackPage> {
        await this.feedbackButton.click()
        return new FeedbackPage(this.page)
    }
}
