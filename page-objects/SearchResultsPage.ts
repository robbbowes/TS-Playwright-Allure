import { Locator, Page } from '@playwright/test'

export class SearchResultsPage {
    readonly page: Page
    readonly searchResultLinks: Locator

    constructor(page: Page) {
        this.page = page

        this.searchResultLinks = page.locator('li > a')
    }

    async getSearchResults(): Promise<Locator> {
        return await this.searchResultLinks
    }
}
