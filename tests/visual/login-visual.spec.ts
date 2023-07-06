import { openLoginPage as test } from '../e2e/fixtures/login-fixtures'

test.describe('LoginPage visual tests', () => {
    test('Login Form visual test', async ({ loginPage }) => {
        await loginPage.snapshotLoginForm()
    })
    test('Login Form error visual test', async ({ loginPage }) => {
        loginPage.unsuccessfulLogin('fail', 'fail')
        await loginPage.snapshotLoginErrorMessage()
    })
})

// to update snapshots either manually delete the snapshots or add the --update-snapshots flag 
