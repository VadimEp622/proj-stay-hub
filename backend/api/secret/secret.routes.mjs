import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { getApiKeyGoogleMap } from './secret.controller.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'


const router = express.Router()

router.get('/key/google_map', log, getApiKeyGoogleMap)


export const secretRoutes = router