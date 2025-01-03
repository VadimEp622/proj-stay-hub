import express from 'express'
import { requireAdmin, requireAuth } from '../../middleware/requireAuth.middleware.js'
import { log } from '../../middleware/logger.middleware.js'

import { addOrder, getOrders, deleteOrder, updateOrder, getOrderById } from './order.controller.js'
const router = express.Router()

router.use(requireAuth)

// ======================= Verified being used =======================
router.get('/', log, getOrders)
router.post('/', log, addOrder)
router.put('/:id', log, updateOrder)
// ===================================================================
// ============== Verified working - but NOT being used ==============
router.get('/:id', getOrderById)
router.delete('/:id', requireAdmin, deleteOrder)
// ===================================================================



export const orderRoutes = router