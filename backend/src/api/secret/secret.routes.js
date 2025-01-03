import express from 'express'
import { getApiKeyGoogleMap } from './secret.controller.js'


const router = express.Router()

router.get('/key/google_map', getApiKeyGoogleMap)


export const secretRoutes = router