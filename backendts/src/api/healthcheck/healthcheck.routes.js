import express from 'express'
import { healthcheck } from './healthcheck.controller.js'
import { log } from '../../middlewares/logger.middleware.js'

const router = express.Router()

router.get('/', log, healthcheck)


export const healthcheckRoutes = router