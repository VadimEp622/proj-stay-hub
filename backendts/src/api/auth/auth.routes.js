import express from 'express'
import { login, signup, logout } from './auth.controller.js'
import { log } from '../../middleware/logger.middleware.js'

const router = express.Router()

router.post('/login', log, login)
router.post('/signup', log, signup)
router.post('/logout', log, logout)

export const authRoutes = router