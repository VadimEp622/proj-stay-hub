import express from 'express'
import { requireAdmin, requireAuth } from '../../middleware/requireAuth.middleware.js'
import { addOrder, deleteOrder, updateOrder, getOrderById, getOrders } from './order.controller.js'

const router = express.Router()

router.use(requireAuth)


// INFO: regarding getting ALL orders,
//  * Currently in frontend dashboard, rendering ALL orders. 
//  * All orders are rendered, for a simple and quick demo app flow
//  * First, Need to decide how to handle demo data users inside stays db collection, and how to reconcile their differences with the actual user db collection.
//  * Second, Need to implement creation of actual stays to the DB.
//      This requires adding all CRUD operations to stays DB collection, thus the need decide what is possible and not possible for users to do.
//      Need to keep in mind stays DB collection document differences between demo stays and user created stays.
//      Need to keep in mind deletion/restoration of demo stays, and perhaps admin actions.          
//  * For now, ignore admin user (does not exist yet). (maybe in the future, will make an admin route API to handle admin operations)


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