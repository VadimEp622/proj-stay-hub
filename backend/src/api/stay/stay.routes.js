import express from 'express'
import { requireAuth } from '../../middleware/requireAuth.middleware.js'
import {
    getStays, getStayById,
    getWishlistedStayIds
} from './stay.controller.js'
import { cache } from '../../middleware/cache.middleware.ts'


const router = express.Router()


router.get('/', cache, getStays)
router.get('/wishlist', requireAuth, getWishlistedStayIds)
router.get('/:id', getStayById)


export const stayRoutes = router