import { test, expect } from '@playwright/test'

test.describe('API testing', () => {
    const baseUrl = 'https://reqres.in/api'

    test('Simple API test - Assert Response Status', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)
    })

    test('Simple API test - Assert Invalid Endpoint', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/this-doesnt-exist`)
        expect(response.status()).toBe(404)
    })

    test('Simple API test - Get User Detail', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.data.id).toBe(2)
        expect(responseBody.data.first_name).toBe('Janet')
        expect(responseBody.data.last_name).toBe('Weaver')
        expect(responseBody.data.email).toBeTruthy()
    })

    test('POST Request - Create New User', async ({ request }) => {
        const response = await request.post(`${baseUrl}/user`, {
            data: {
                id: 420
            }
        })
        expect(response.status()).toBe(201)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toBe(420)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test('POST Request - Login Unsuccessful No User', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'something@something.com',
                password: "verysecure"
            }
        })
        expect(response.status()).toBe(400)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.error).toBe('user not found')
    })

    test('POST Request - Login Unsuccessful Missing Password', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'peter@klaven'
            }
        })
        expect(response.status()).toBe(400)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.error).toBe('Missing password')
    })

    test('POST Request - Login Successful', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'eve.holt@reqres.in',
                password: "cityslicka"
            }
        })
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.token).toBeTruthy()
    })

    test('PUT Request - Update User', async ({request}) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            data: {
                name: 'new name',
                job: 'new job'
            }
        })
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.name).toBe('new name')
        expect(responseBody.job).toBe('new job')
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test('DELETE Request - Delete User', async ({request}) => {
        const response = await request.delete(`${baseUrl}/users/2`)
        expect(response.status()).toBe(204)
    })

})
