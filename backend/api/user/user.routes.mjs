import express from 'express'
import { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware.mjs'
import { getUser, getUsers, deleteUser, updateUser, updateUserWishlist } from './user.controller.mjs'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', requireAuth, updateUser)
router.put('/:id/wishlist', requireAuth, updateUserWishlist)//consider adding middleware checking for undefined values
router.delete('/:id', requireAuth, requireAdmin, deleteUser)

export const userRoutes = router
