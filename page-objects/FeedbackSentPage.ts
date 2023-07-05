import { Page, Locator } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class FeedbackSentPage extends AbstractPage {
    readonly page: Page
    readonly infoText: Locator

    constructor(page: Page) {
        super(page)
        this.infoText = page.locator('.offset3.span6')
    }
}
