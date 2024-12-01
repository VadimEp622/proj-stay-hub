import express from 'express'
import { login, signup, logout } from './auth.controller.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'

const router = express.Router()

router.post('/login', log, login)
router.post('/signup', log, signup)
router.post('/logout', log, logout)

export const authRoutes = router