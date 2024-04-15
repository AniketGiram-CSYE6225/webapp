import express from 'express'
import healthzRoute from './healthz.js'
import userRoute from './user.js'
import userVerificationRoute from './userVerificationRoute.js'
const router = express.Router()

router.use("/healthz", healthzRoute)
router.use("/v2/user", userRoute)
router.use("/v2/userVerification", userVerificationRoute)

export default router
