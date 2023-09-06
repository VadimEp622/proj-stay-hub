import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'
import {
    getStays, getStayById, addStay, updateStay, removeStay, addStayMsg, removeStayMsg, updateStaysAvailableDatesImproved
} from './stay.controller.mjs'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getStays)
router.get('/:id', getStayById)

router.post('/', requireAuth, addStay)
// router.put('/update-stays-dates', log, updateStaysAvailableDatesImproved) // for adding key fields into all documents
router.put('/:id', requireAuth, updateStay)
router.delete('/:id', requireAuth, removeStay)
// router.delete('/:id', requireAuth, requireAdmin, removeStay)

router.post('/:id/msg', requireAuth, addStayMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeStayMsg)

export const stayRoutes = router
