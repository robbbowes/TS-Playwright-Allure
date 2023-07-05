import { Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class SearchResultsPage extends AbstractPage {
    readonly searchResultLinks: Locator

    constructor(page: Page) {
        super(page)
        this.searchResultLinks = page.locator('li > a')
    }

    async getSearchResults(): Promise<Locator> {
        return await this.searchResultLinks
    }
}
