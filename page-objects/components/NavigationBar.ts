import { Locator, Page } from '@playwright/test'
import { HomePage } from '../HomePage'
import { FeedbackPage } from '../FeedbackPage'
import { OnlineBankingPage } from '../OnlineBankingPage'

export class NavigationBar {
    readonly page: Page
    readonly homeLink: Locator
    readonly onlineBankingLink: Locator
    readonly feedbackLink: Locator

    constructor(page: Page) {
        this.page = page
        this.homeLink = page.locator('#homeMenu')
        this.onlineBankingLink = page.locator('#onlineBankingMenu')
        this.feedbackLink = page.locator('#feedback')
    }

    async clickHomeLink(): Promise<HomePage> {
        await this.homeLink.click()
        return new HomePage(this.page)
    }

    async clickOnlineBankingLink(): Promise<OnlineBankingPage> {
        await this.onlineBankingLink.click()
        return new OnlineBankingPage(this.page)
    }

    async clickFeedbackLink(): Promise<FeedbackPage> {
        await this.feedbackLink.click()
        return new FeedbackPage(this.page)
    }
}
