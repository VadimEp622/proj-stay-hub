import express from 'express'
import { requireAdmin, requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import {
    getStays, getStayById, addStay, updateStay, removeStay
} from './stay.controller.js'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)


// =================== Verified being used ===================
router.get('/', log, getStays)
router.get('/:id', log, getStayById)
// ===========================================================
// =============== Verified works but Not used ===============
router.post('/', requireAdmin, addStay)
router.put('/:id', requireAdmin, updateStay)
router.delete('/:id', requireAdmin, removeStay)
// ===========================================================


export const stayRoutes = router