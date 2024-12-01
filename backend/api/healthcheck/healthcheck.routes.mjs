import express from 'express'
import { healthcheck } from './healthcheck.controller.mjs'

const router = express.Router()

router.get('/', healthcheck)


export const healthcheckRoutes = router