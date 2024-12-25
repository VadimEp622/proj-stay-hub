import express from 'express'
import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.js'
import { getUser, getUsers, deleteUser, updateUser, updateUserWishlist, addUserTrip } from './user.controller.js'
import { log } from '../../middlewares/logger.middleware.js'

const router = express.Router()

// ====================== Confirmed Being Used ======================
router.get('/:id', log, getUser)
router.post('/:id/trip', log, requireAuth, addUserTrip) // TODO: make addOrder in order route to also handle addUserTrip
router.put('/:id/wishlist', log, requireAuth, updateUserWishlist)//consider adding middleware checking for undefined values
// ==================================================================
// =================== Confirmed works but unused ===================
router.get('/', getUsers)
router.put('/:id', requireAuth, updateUser)
router.delete('/:id', requireAuth, requireAdmin, deleteUser)
// ==================================================================

export const userRoutes = router
