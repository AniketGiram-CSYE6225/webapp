import express from 'express'
const app = express()

app.use("/healthz", (request, response, next) => {
    if (Object.keys(request.query).length != 0 || Object.keys(request.body).length != 0 || request.headers['content-type']) {
        return response.status(400).send()
    }
    next()
})

app.use("/healthz", (request, response, next) => {
    if (request.method != "GET") {
        return response.status(405).send()
    }
    next()
})

export default app
