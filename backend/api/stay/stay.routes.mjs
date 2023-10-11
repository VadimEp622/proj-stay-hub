import express from 'express'
import { requireAdmin, requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'
import {
    getStays, getStayById, addStay, updateStay, removeStay
} from './stay.controller.mjs'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)


// =================== Verified being used ===================
router.get('/', log, getStays)
router.get('/:id', getStayById)
// ===========================================================
// =============== Verified works but Not used ===============
router.post('/', requireAdmin, addStay)
router.put('/:id', requireAdmin, updateStay)
router.delete('/:id', requireAdmin, removeStay)
// ===========================================================


export const stayRoutes = router