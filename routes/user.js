import express from 'express'
import { default as User } from '../models/index.js'
import { generateHash, checkHashedPassword, decodeBase64 } from '../utilis/index.js'
import { signInHeader, signupBody, updateUserBody } from '../validations/index.js'
const router = express.Router()
import { logger } from '../logger/index.js'

router.get("/", async (request, response) => {
    try {
        logger.debug("Got User fetch request")
        let { success, data } = signInHeader.safeParse(request.headers)
        if (!success) {
            logger.debug(`User didn't passed the right payload because of which Cannot authorize the user.`);
            logger.error(`Error in payload. Cannot authorize the user.`);
            return response.status(401).send()
        }
        data = decodeBase64(data.authorization.split(" ")[1])
        const username = data[0]
        const password = data[1]
        const _user = await User.findOne({ where: { username: username } });
        if (_user === null) {
            logger.debug(`User ${_user['username']} is not present in the db`)
            logger.error(`User not found.`);
            return response.status(401).send()
        } else {
            const isUserValid = await checkHashedPassword(password, _user.password)
            if (!isUserValid) {
                logger.error(`Wrong credentials. Cannot authorize the user.`);
                return response.status(401).send()
            }
            delete _user["dataValues"]["password"]
            logger.warn("Deleting password from user object")
            logger.debug(`User data fetched successfully. Username: ${_user['username']}`);
            logger.info(`User ${_user['username']} fetched its data successfully.`);
            return response.status(200).json(_user)
        }
    } catch (e) {
        logger.error(`Couldn't fetch the user. Error: ${e.name}`);
        return response.status(503).send()
    }
})

router.post("/", async (request, response) => {
    try {
        logger.debug("Got User Creation request")
        const body = request.body
        const { success, data } = signupBody.safeParse(body)
        if (!success) {
            logger.error(`Error in payload. Cannot create the user.`);
            return response.status(400).send()
        } else {
            logger.debug("generating hash password")
            const pass = await generateHash(data.password)
            logger.debug("creating a user")
            const user = await User.create({ firstName: data.first_name, lastName: data.last_name, username: data.username, password: pass })
            logger.warn("Deleting password from user object")
            delete user["dataValues"]["password"]
            logger.debug("User Created")
            logger.error(`User ${user['username']} created Successfully.`);
            return response.status(201).json(user)
        }
    } catch (error) {
        logger.debug(`User creation failed. with error => ${error}`);
        logger.error(`Couldn't create the user. Error: ${error.name}`);
        if (error.name == "SequelizeUniqueConstraintError") {
            logger.error(`Couldn't create the user. Error: ${error.name}`);
            return response.status(400).send()
        }
        return response.status(503).send()
    }
})

router.put("/", async (request, response) => {
    try {
        logger.debug("Got User Updation request")
        let { success, data } = signInHeader.safeParse(request.headers)
        if (!success) {
            logger.error(`Error in payload. Cannot update the user.`);
            return response.status(401).send()
        }
        const userData = updateUserBody.safeParse(request.body)
        if (!userData.success) {
            logger.error(`Error in payload. Cannot update the user.`);
            return response.status(400).send()
        }
        logger.debug("Reading user auth tokens")
        data = decodeBase64(data.authorization.split(" ")[1])
        const username = data[0]
        const password = data[1]
        const _user = await User.findOne({ where: { username: username } });
        if (_user === null) {
            logger.debug(`User ${_user['username']} is not present in the db`)
            logger.error(`User not found. Update failed`);
            return response.status(400).send()
        } else {
            const isUserValid = await checkHashedPassword(password, _user.password)
            if (!isUserValid) {
                logger.error(`Wrong credentials. Cannot authorize the user.`);
                return response.status(401).send()
            }
            const user_data = userData.data
            const pass = await generateHash(user_data.password)
            logger.debug("Updating the user")
            await User.update({ firstName: user_data.first_name, lastName: user_data.last_name, password: pass }, { where: { username: username, password: _user.password } })
            logger.debug(`User ${username} updated Successfully`);
            logger.info(`User ${username} updated Successfully.`);
            return response.status(204).send()
        }
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError") {
            logger.error(`Couldn't update the user. Error: ${error.name}`);
            return response.status(400).send()
        }
        logger.debug(`User updation failed. with error => ${error}`);
        logger.error(`Couldn't update the user. Error: ${error.name}`);
        return response.status(503).send()
    }
})

export default router
