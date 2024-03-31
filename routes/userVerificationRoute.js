import express from 'express'
const router = express.Router()
import { logger } from '../logger/index.js'
import { User, EmailTrack } from '../models/index.js'

router.get("/", async (request, response) => {
    const userData = request.query;
    logger.debug(`Verifying User, data: ${userData['username']}`)
    const user = await User.findOne({ where: { id: userData.userId } });
    const user_email_track = await EmailTrack.findOne({ where: { userId: userData.userId } })
    if (user == null) {
        logger.debug(`User ${userData['username']} is not present in the db`)
        logger.error(`User not found. Update failed`);
        return response.status(400).send()
    }
    if (user_email_track == null) {
        logger.debug(`User ${userData['username']} is not present in the db at email track table`)
        logger.error(`User record in email table not found. Update failed`);
        return response.status(400).send()
    }
    if (new Date() > user_email_track["email_expiry_time"]){
        return response.sendStatus(400).json({"message": "Verification link expired"})
    }
    await User.update({ account_verified: true }, { where: { id: userData.userId } })
    await EmailTrack.update({ emailStatus: "EMAIL_VERIFIED" }, { where: { userId: userData.userId } })
    logger.info(`User status Updated Successfully`);
    return response.sendStatus(200)
})

export default router
