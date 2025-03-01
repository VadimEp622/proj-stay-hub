import express from 'express'
import { requireAuth, requireAdmin } from '../../middleware/requireAuth.middleware.js'
import { getUser, getUsers, deleteUser, updateUser, addUserTrip } from './user.controller.js'

const router = express.Router()

// ====================== Confirmed Being Used ======================
router.get('/:id', getUser)
router.post('/:id/trip', requireAuth, addUserTrip)
// TODO: 1) "/:id/trip" should be PUT, not POST
//       2) check if possible to use something like "updateUser" for all cases
// ==================================================================
// =================== Confirmed works but unused ===================
router.get('/', getUsers)
router.put('/:id', requireAuth, updateUser)
router.delete('/:id', requireAuth, requireAdmin, deleteUser)
// ==================================================================

export const userRoutes = router
