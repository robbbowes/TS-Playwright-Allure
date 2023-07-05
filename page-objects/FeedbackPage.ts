import { Locator, Page } from '@playwright/test'
import { FeedbackSentPage } from './FeedbackSentPage'
import { AbstractPage } from './AbstractPage'

export class FeedbackPage extends AbstractPage {
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly subjectInput: Locator
    readonly commentInput: Locator
    readonly clearButton: Locator
    readonly submitButton: Locator

    constructor(page: Page) {
        super(page)
        this.nameInput = page.locator('#name')
        this.emailInput = page.locator('#email')
        this.subjectInput = page.locator('#subject')
        this.commentInput = page.locator('#comment')
        this.clearButton = page.locator('input[name="clear"]')
        this.submitButton = page.locator('input[name="submit"]')
    }

    async setName(name: string): Promise<void> {
        await this.nameInput.fill(name)
    }

    async setEmail(email: string): Promise<void> {
        await this.emailInput.fill(email)
    }

    async setSubject(subject: string): Promise<void> {
        await this.subjectInput.fill(subject)
    }

    async setComment(comment: string): Promise<void> {
        await this.commentInput.fill(comment)
    }

    async resetForm(): Promise<void> {
        await this.clearButton.click()
    }

    async submitForm(): Promise<FeedbackSentPage> {
        await this.submitButton.click()
        return new FeedbackSentPage(this.page)
    }
}
