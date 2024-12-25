import express from 'express'
import { requireAuth } from '../../middleware/requireAuth.middleware.js'
import { getApiKeyGoogleMap } from './secret.controller.js'
import { log } from '../../middleware/logger.middleware.js'


const router = express.Router()

router.get('/key/google_map', log, getApiKeyGoogleMap)


export const secretRoutes = router