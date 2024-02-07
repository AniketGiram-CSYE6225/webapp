import express from 'express'
import healthzMiddleware from './healthz.js'
const app = express()

app.use((request, response, next) => {
    response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate")
    next()
})

app.use(healthzMiddleware)

export default app
