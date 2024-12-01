import express from 'express'
import { healthcheck } from './healthcheck.controller.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'

const router = express.Router()

router.get('/', log, healthcheck)


export const healthcheckRoutes = router