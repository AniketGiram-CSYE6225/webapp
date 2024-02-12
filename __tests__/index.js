import supertest from 'supertest'
// import 'isomorphic-fetch'
import app from '../index.js'
const requestWithSupertest = supertest(app);

describe("Get /healtz", () => {
    test("Should not connect to db", async () => {
        const response = await requestWithSupertest.get("/healthz");
        expect(response.statusCode).toBe(503)
    })
})
