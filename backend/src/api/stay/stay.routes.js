import express from 'express'
import { requireAdmin, requireAuth } from '../../middleware/requireAuth.middleware.js'
import {
    getStays, getStayById, addStay, updateStay, removeStay,
    getWishlistedStayIdsPerPage,
    getWishlistedStayIdsUntilPage
} from './stay.controller.js'
import { cache } from '../../middleware/cache.middleware.ts'


const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)


// =================== Verified being used ===================
router.get('/', cache, getStays)
router.get('/wishlist', requireAuth, getWishlistedStayIdsPerPage)// gets only wishlisted id's for current query, per page (if logged in)
router.get('/wishlist/all', requireAuth, getWishlistedStayIdsUntilPage) // gets only wishlisted id's for current query, all until page (if logged in)
router.get('/:id', getStayById)
// ===========================================================
// =============== Verified works but Not used ===============
// router.post('/', requireAdmin, addStay)
// router.put('/:id', requireAdmin, updateStay)
// router.delete('/:id', requireAdmin, removeStay)
// ===========================================================


export const stayRoutes = router