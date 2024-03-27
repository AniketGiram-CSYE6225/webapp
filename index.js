import express from 'express'
import middlewares from './middlewares/index.js'
import mainRouter from "./routes/index.js"
import db_conn from "./database/index.js"
const app = express()
app.use(express.json())

app.use(middlewares)

app.use((req, res, next) => {
    if (req.path === '/v1/userVerification') {
        return next();
    }
    if (Object.keys(req.query).length > 0) {
        return res.status(400).send();
    } else {
        next();
    }
});

app.use(async (request, response, next) => {
    try {
        await db_conn.sync()
    } catch (e) {
        return response.status(503).send()
    } finally {
        next()
    }
})

app.use("/", mainRouter)

app.get('*', function (request, response) {
    return response.status(404).send()
});

export default app
