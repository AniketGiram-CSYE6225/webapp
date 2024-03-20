import express from 'express'
import db_conn from '../database/index.js'
const router = express.Router()
import {logger} from '../logger/index.js'

router.get("/", async (request, response) => {
    try {
        await db_conn.authenticate()
        logger.info("Health is Good")
        logger.debug("Application is healthy")
        return response.status(200).send()
    } catch (e) {
        logger.error(`error ${e}`);
        logger.debug("Application is not healthy")
        return response.status(503).send()
    }
})

export default router
