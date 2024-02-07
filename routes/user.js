import express from 'express'
import User from '../models/index.js'
import { generateHash, checkHashedPassword, decodeBase64 } from '../utilis/index.js'
import { signInHeader, signupBody, updateUserBody } from '../validations/index.js'
const router = express.Router()

router.get("/", async (request, response) => {
    try {
        let { success, data } = signInHeader.safeParse(request.headers)
        if (!success) {
            return response.status(401).send()
        }
        data = decodeBase64(data.authorization.split(" ")[1])
        const username = data[0]
        const password = data[1]
        const _user = await User.findOne({ where: { username: username } });
        if (_user === null) {
            return response.status(401).send()
        } else {
            const isUserValid = await checkHashedPassword(password, _user.password)
            if (!isUserValid) {
                return response.status(401).send()
            }
            delete _user["dataValues"]["password"]
            return response.status(200).json(_user)
        }
    } catch (e) {
        return response.status(503).send()
    }
})

router.post("/", async (request, response) => {
    try {
        const body = request.body
        const { success, data } = signupBody.safeParse(body)
        if (!success) {
            return response.status(204).send()
        } else {
            const pass = await generateHash(data.password)
            await User.create({ firstName: data.first_name, lastName: data.last_name, username: data.username, password: pass })
            return response.status(200).send()
        }
    } catch (error) {
        console.log("err", error);
        if (error.name == "SequelizeUniqueConstraintError") {
            return response.status(400).send()
        }
        return response.status(503).send()
    }
})

router.put("/", async (request, response) => {
    try {
        let { success, data } = signInHeader.safeParse(request.headers)
        if (!success) {
            return response.status(401).send()
        }
        const userData = updateUserBody.safeParse(request.body)
        if (!userData.success) {
            if (userData.error.errors[0].code == "unrecognized_keys") {
                return response.status(400).send()
            }
            return response.status(204).send()
        }
        data = decodeBase64(data.authorization.split(" ")[1])
        const username = data[0]
        const password = data[1]
        if(username != userData.data.username){
            return response.status(400).send()
        }
        const _user = await User.findOne({ where: { username: username } });
        if (_user === null) {
            return response.status(404).send()
        } else {
            const isUserValid = await checkHashedPassword(password, _user.password)
            if (!isUserValid) {
                return response.status(401).send()
            }
            const user_data = userData.data
            const pass = await generateHash(user_data.password)
            await User.update({ firstName: user_data.first_name, lastName: user_data.last_name, password: pass }, { where: { username: username, password: _user.password } })
            return response.status(200).send()
        }
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError") {
            return response.status(400).send()
        }
        return response.status(503).send()
    }
})

export default router
