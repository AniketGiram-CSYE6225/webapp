import express from 'express'
import db_conn from '../database/index.js'
const router = express.Router()

router.get("/", async (request, response) => {
    try {
        await db_conn.authenticate()
        return response.status(200).send()
    } catch (e) {
        return response.status(503).send()
    }
})

export default router
