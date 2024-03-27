import express from 'express'
import healthzRoute from './healthz.js'
import userRoute from './user.js'
import userVerificationRoute from './userVerificationRoute.js'
const router = express.Router()

router.use("/healthz", healthzRoute)
router.use("/v1/user", userRoute)
router.use("/v1/userVerification", userVerificationRoute)

export default router
