import supertest from 'supertest'
import app from '../index.js'
import {logger} from './logger/index.js'
const requestWithSupertest = supertest(app);

describe("Get /healtz", () => {
    test("should connect to db", async () => {
        const response = await requestWithSupertest.get("/healthz");
        expect(response.statusCode).toBe(200)
    })
})

describe("Post /v1/user", () => {
    test("Create user in database", async () => {
        const payload = {
            "first_name": "userfirstname",
            "last_name": "userlastname",
            "username": "user@abc.com",
            "password": "ABC@123"
        }
        const createdUser = await requestWithSupertest.post("/v1/user")
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(createdUser.statusCode).toBe(201)

        const duplicateUser = await requestWithSupertest.post("/v1/user")
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(duplicateUser.statusCode).toBe(400)

        const getUser = await requestWithSupertest.get("/v1/user").set('Authorization', `Basic ${btoa(`${payload.username}:${payload.password}`)}`)
        expect(getUser.statusCode).toBe(200)

        expect(createdUser.body['first_name']).toBe(getUser.body['first_name'])
        expect(createdUser.body['last_name']).toBe(getUser.body['last_name'])
        expect(createdUser.body['username']).toBe(getUser.body['username'])
    })
})

describe("Put /v1/user", () => {
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

        const updateUser = await requestWithSupertest.put("/v1/user")
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic ${btoa(`${auth.username}:${auth.password}`)}`)
        expect(updateUser.statusCode).toBe(204)

        const getUserWithWrongCredential = await requestWithSupertest.get("/v1/user").set('Authorization', `Basic ${btoa(`${auth.username}:${payload.password}`)}`)
        expect(getUserWithWrongCredential.statusCode).toBe(200)

        const getUserWithCredential = await requestWithSupertest.get("/v1/user").set('Authorization', `Basic ${btoa(`${auth.username}:${auth.password}`)}`)
        expect(getUserWithCredential.statusCode).toBe(401)
    })
})
