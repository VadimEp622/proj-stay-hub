import express from 'express'
import { requireAuth, requireAdmin } from '../../middleware/requireAuth.middleware.js'
import { getUser, getUsers, deleteUser, updateUser, updateUserWishlist, addUserTrip } from './user.controller.js'
import { log } from '../../middleware/logger.middleware.js'

const router = express.Router()

// ====================== Confirmed Being Used ======================
router.get('/:id', log, getUser)
router.post('/:id/trip', log, requireAuth, addUserTrip)
// TODO: 1) "/:id/trip" should be PUT, not POST
//       2) check if possible to use something like "updateUser" for all cases
router.put('/:id/wishlist', log, requireAuth, updateUserWishlist)// consider adding middleware checking for undefined values
// ==================================================================
// =================== Confirmed works but unused ===================
router.get('/', getUsers)
router.put('/:id', requireAuth, updateUser)
router.delete('/:id', requireAuth, requireAdmin, deleteUser)
// ==================================================================

export const userRoutes = router
