import { test, expect } from '@playwright/test'
import { allure } from 'allure-playwright'
import { Severity } from '../../utils/severity'
import { HomePage } from '../../page-objects/HomePage'
import { SearchResultsPage } from '../../page-objects/SearchResultsPage'

test.describe('Search result', () => {
    test('Should return search results', async ({ page }) => {
        allure.severity(Severity[4])

        let homePage: HomePage = new HomePage(page)
        await homePage.visit()
        let resultsPage: SearchResultsPage = await homePage.search('Bank')

        const results = await resultsPage.getSearchResults()
        await expect(results).toHaveCount(2)
    })
})
