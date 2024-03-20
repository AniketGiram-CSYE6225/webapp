import express from 'express'
import db_conn from '../database/index.js'
const router = express.Router()
import {logger} from '../logger/index.js'

router.get("/", async (request, response) => {
    try {
        await db_conn.authenticate()
        logger.info("Health is Good")
        return response.status(200).send()
    } catch (e) {
        logger.error(`error ${e}`)
        return response.status(503).send()
    }
})

export default router
