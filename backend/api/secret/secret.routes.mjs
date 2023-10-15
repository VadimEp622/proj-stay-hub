import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { getApiKeyGoogleMap } from './secret.controller.mjs'


const router = express.Router()

router.get('/key/google_map', getApiKeyGoogleMap)


export const secretRoutes = router