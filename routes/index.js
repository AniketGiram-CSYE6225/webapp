import express from 'express'
import healthzRoute from './healthz.js'
// import userRoute from './user.js'
const router = express.Router()

router.use("/healthz", healthzRoute)
// router.use("/v1/user", userRoute)

export default router
