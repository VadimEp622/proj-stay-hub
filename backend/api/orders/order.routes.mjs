import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'

import { addOrder, getOrders, deleteOrder, updateOrder, getOrderById } from './order.controller.mjs'
const router = express.Router()

router.get('/', log, getOrders)
router.get('/:id', getOrderById)
router.post('/', log, requireAuth, addOrder)
// router.post('/:id', log, requireAuth, updateOrder)
router.put('/:id', log, updateOrder)
router.delete('/:id', requireAuth, deleteOrder)

export const orderRoutes = router