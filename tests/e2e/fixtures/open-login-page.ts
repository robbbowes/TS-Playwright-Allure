import { test as base } from '@playwright/test'
import { HomePage } from '../../../page-objects/HomePage';
import { LoginPage } from '../../../page-objects/LoginPage';

export const openLoginPage = base.extend<{ homePage: HomePage; loginPage: LoginPage }>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await homePage.visit()
        await use(homePage)
    },
    loginPage: async ({ homePage }, use) => {
        const loginPage = await homePage.clickOnSignIn()
        await use(loginPage)
    }
})
