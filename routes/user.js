import express from 'express'
import db_conn from '../database/index.js'
import User from '../models/index.js'
import bcrypt from 'bcrypt';
const saltRounds = 10;
const router = express.Router()

router.post("/", async (request, response) => {
    try {
        await db_conn.authenticate()
        const user = request.body
        if (user == null || user == undefined) {
            return response.status().send()
        } else {
            const pass = await bcrypt.hash(user.password, saltRounds)
            const _user = await User.create({ firstName: user.first_name, lastName: user.last_name, username: user.username, password: pass, account_created: new Date(), account_updated: new Date() })
            console.log(_user);
            return response.status(200).json({
                "id": _user.id
            })
        }
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError") {
            return response.status(400).send()
        }
        console.log("Error in user module", error);
        return response.status(500).send()
    }
})

router.get("/", async (request, response) => {
    try {
        await db_conn.authenticate()
        let data = request.headers
        data = Buffer.from(data, 'base64').split(":")
        username = data[0]
        password = data[1]
        const _user = await User.findOne({ where: { username: username }, attributes: { exclude: ['password'] } });
        if (_user === null) {
            console.log('Not found!');
        } else {
            // bcrypt.compare(password, _user);
            if(_user){

            }
            return response.status(200).json(_user)
        }
        return response.status(200).send()
    } catch (e) {
        return response.status(503).send()
    }
})

export default router
