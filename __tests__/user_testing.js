import supertest from 'supertest'
import app from '../index.js'
import { logger } from '../logger/index.js'
const requestWithSupertest = supertest(app);
import EmailTrack from '../models/email_track.js'

describe("Get /healtz", () => {
    test("should connect to db", async () => {
        const response = await requestWithSupertest.get("/healthz");
        expect(response.statusCode).toBe(200)
    })
})

describe("Post /v2/user", () => {
    test("Create user in database", async () => {
        const payload = {
            "first_name": "userfirstname",
            "last_name": "userlastname",
            "username": "user@abc.com",
            "password": "ABC@123"
        }
        const createdUser = await requestWithSupertest.post("/v2/user")
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(createdUser.statusCode).toBe(201)

        await EmailTrack.create({ userId: createdUser.body['id'], emailStatus: "EMAIL_SENT", email_expiry_time: new Date(new Date().getTime() + (2 * 60 * 1000))})

        const updateUserStatus = await requestWithSupertest.get(`/v2/userVerification?username=${createdUser.body['username']}&userId=${createdUser.body['id']}&firstName=${createdUser.body['first_name']}`)
        expect(updateUserStatus.statusCode).toBe(200)

        const duplicateUser = await requestWithSupertest.post("/v2/user")
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(duplicateUser.statusCode).toBe(400)

        const getUser = await requestWithSupertest.get("/v2/user").set('Authorization', `Basic ${btoa(`${payload.username}:${payload.password}`)}`)
        expect(getUser.statusCode).toBe(200)

        expect(createdUser.body['first_name']).toBe(getUser.body['first_name'])
        expect(createdUser.body['last_name']).toBe(getUser.body['last_name'])
        expect(createdUser.body['username']).toBe(getUser.body['username'])
    })
})

describe("Put /v2/user", () => {
    test("Update user in database", async () => {
        const payload = {
            "first_name": "userfirstname_updated",
            "last_name": "userlastname_updated",
            "password": "ABC@1234"
        }

        const auth = {
            "username": "user@abc.com",
            "password": "ABC@123"
        }

        const updateUser = await requestWithSupertest.put("/v2/user")
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic ${btoa(`${auth.username}:${auth.password}`)}`)
        expect(updateUser.statusCode).toBe(204)

        const getUserWithWrongCredential = await requestWithSupertest.get("/v2/user").set('Authorization', `Basic ${btoa(`${auth.username}:${payload.password}`)}`)
        expect(getUserWithWrongCredential.statusCode).toBe(200)

        const getUserWithCredential = await requestWithSupertest.get("/v2/user").set('Authorization', `Basic ${btoa(`${auth.username}:${auth.password}`)}`)
        expect(getUserWithCredential.statusCode).toBe(401)
    })
})
