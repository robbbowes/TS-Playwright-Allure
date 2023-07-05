import { test as base, expect } from '@playwright/test'
import { allure } from 'allure-playwright'
import { Severity } from '../../utils/severity'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'
import { FeedbackSentPage } from '../../page-objects/FeedbackSentPage'

const test = base.extend<{homePage: HomePage, feedbackPage: FeedbackPage}>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await homePage.visit()
        await use(homePage)
    },
    feedbackPage: async ({ homePage }, use) => {
        const feedbackPage = await homePage.clickOnFeedback()

        await feedbackPage.setName('some name')
        await feedbackPage.setEmail('some@email.com')
        await feedbackPage.setSubject('some subject')
        await feedbackPage.setComment('some comment')

        await expect(feedbackPage.nameInput).not.toBeEmpty()
        await expect(feedbackPage.emailInput).not.toBeEmpty()
        await expect(feedbackPage.subjectInput).not.toBeEmpty()
        await expect(feedbackPage.commentInput).not.toBeEmpty()

        await use(feedbackPage)
    }
})

test.describe('Feedback form submit', () => {
    test('Reset feedback form', async ({ feedbackPage }) => {
        allure.severity(Severity[3])

        await feedbackPage.resetForm()

        await expect(feedbackPage.nameInput).toBeEmpty()
        await expect(feedbackPage.emailInput).toBeEmpty()
        await expect(feedbackPage.subjectInput).toBeEmpty()
        await expect(feedbackPage.commentInput).toBeEmpty()
    })

    test('Submit feedback form', async ({ feedbackPage }) => {
        allure.severity(Severity[2])

        let feedbackSentPage: FeedbackSentPage = await feedbackPage.submitForm()
        await expect(feedbackSentPage.infoText).toContainText('Thank you for your comments, some name')
    })
})
