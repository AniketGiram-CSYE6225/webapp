import express from 'express'
import middlewares from './middlewares/index.js'
import mainRouter from "./routes/index.js"
const app = express()
app.use(express.json())

app.use(middlewares)

app.use("/", mainRouter)

app.get('*', function (request, response) {
    return response.status(404).send()
});

app.listen(8080)
