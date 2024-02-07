import express from 'express'
import middlewares from './middlewares/index.js'
import mainRouter from "./routes/index.js"
import db_conn from "./database/index.js"
const app = express()
app.use(express.json())

app.use(middlewares)

app.use(async (request, response, next) => {
    try {
        await db_conn.sync()
    }
    catch (e) {
        return response.status(503).send()
    } finally {
        next()
    }
})

app.use("/", mainRouter)

app.get('*', function (request, response) {
    return response.status(404).send()
});

app.listen(8080)
