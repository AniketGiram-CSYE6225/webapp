import express from 'express'
import db_conn from '../database/index.js'
const router = express.Router()

router.get("/", async (request, response) => {
    let statusCode = 200;
    try {
        await db_conn.authenticate()
    } catch (e) {
        statusCode = 503;
    }
    return response.status(statusCode).send();
})

export default router
