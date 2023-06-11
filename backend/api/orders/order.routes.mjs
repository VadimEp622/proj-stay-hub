import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'

import { addOrder, getOrders, deleteOrder } from './order.controller.mjs'
const router = express.Router()

router.get('/', log, getOrders)
router.post('/', log, requireAuth, addOrder)
router.delete('/:id', requireAuth, deleteOrder)

export const orderRoutes = router