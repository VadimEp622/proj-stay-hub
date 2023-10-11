import express from 'express'
import { requireAdmin, requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'

import { addOrder, getOrders, deleteOrder, updateOrder, getOrderById } from './order.controller.mjs'
const router = express.Router()

// ======================= Verified being used =======================
router.get('/', log, getOrders)
router.post('/', log, requireAuth, addOrder)
router.put('/:id', log, updateOrder)
// ===================================================================
// ============== Verified working - but NOT being used ==============
router.get('/:id', getOrderById)
router.delete('/:id', requireAdmin, deleteOrder)
// ===================================================================



export const orderRoutes = router