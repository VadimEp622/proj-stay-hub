import express from 'express'
import { requireAdmin, requireAuth } from '../../middleware/requireAuth.middleware.js'
import { addOrder, getOrders, deleteOrder, updateOrder, getOrderById } from './order.controller.js'

const router = express.Router()

router.use(requireAuth)

// ======================= Verified being used =======================
router.get('/', getOrders)
router.post('/', addOrder)
router.put('/:id', updateOrder)
// ===================================================================
// ============== Verified working - but NOT being used ==============
router.get('/:id', getOrderById)
router.delete('/:id', requireAdmin, deleteOrder)
// ===================================================================



export const orderRoutes = router