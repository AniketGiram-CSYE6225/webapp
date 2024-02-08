import request from "supertest";
import app from "../index.js";
import db_conn from '../database/index.js'

describe("GET /healthz", () => {
  it("responds with 200 if db connects", async () => {
    const response = await request(app).get("/healthz");
    expect(response.statusCode).toBe(200);
  });
});

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  db_conn.close()
  done()
})
