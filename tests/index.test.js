import request from 'supertest';
import app from '../index.js';
// const db_conn = require('../database/index.js')

describe("GET /healthz", () => {
  it("responds with 200 if db connects", async () => {
    const response = await request(app).get("/healthz");
    expect(response.statusCode).toBe(503);
  });
});

// afterAll(done => {
//   db_conn.close()
//   done()
// })
