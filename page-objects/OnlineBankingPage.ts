import { Locator, Page } from "@playwright/test";

export class OnlineBankingPage {
    readonly page: Page
    readonly payBillsLink: Locator

    constructor(page: Page) {
        this.page = page
        this.payBillsLink = page.locator('#pay_bills_link')
    }

    async clickPayBills() {
        await this.payBillsLink.click()
    }

}