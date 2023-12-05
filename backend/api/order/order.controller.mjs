import { logger } from '../../services/logger.service.mjs'
import { socketService } from '../../services/socket.service.mjs'
import { orderService } from './order.service.mjs'

// ======================= Verified being used =======================
export async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.query)
        logger.info('Getting orders by filterBy:', req.query)
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err)
        res.status(400).send({ err: 'Failed to get orders' })
    }
}

export async function addOrder(req, res) {
    const { buyer, seller, orderDetails, orderPrice, stayDetails, explore, status } = req.body

    try {
        const order = {
            buyer,
            seller,
            orderDetails,
            orderPrice,
            stayDetails,
            explore,
            status,
        }
        const orderRes = await orderService.add(order)
        logger.info('Creating order', orderRes._id)

        socketService.emitToUser({
            type: 'stay-reserved-send',
            data: orderRes.content.stayDetails.loc,
            userId: orderRes.content.seller._id
        })

        res.send(orderRes._id)
    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(400).send({ err: 'Failed to add order' })
    }
}

export async function updateOrder(req, res) {
    const orderId = req.params.id
    const orderStatus = req.body.status

    try {
        const orderToUpdate = await orderService.getById(orderId)
        orderToUpdate.content.status = orderStatus
        const orderRes = await orderService.update(orderToUpdate)
        logger.info('Updating order', orderRes._id)
        
        socketService.emitToUser({
            type: 'stay-reservation-reply',
            data: orderToUpdate.content.status,
            userId: orderToUpdate.content.buyer._id
        })

        res.send(orderRes)
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(400).send({ err: 'Failed to update order' })
    }
}
// ===================================================================
// ============== Verified working - but NOT being used ==============
export async function getOrderById(req, res) {
    const orderId = req.params.id

    try {
        const order = await orderService.getById(orderId)
        res.send(order)
    } catch (err) {
        logger.error('Cannot get orders', err)
        res.status(400).send({ err: 'Failed to get orders' })
    }
}

export async function deleteOrder(req, res) {
    const orderId = req.params.id

    try {
        const deletedCount = await orderService.remove(orderId)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove order' })
        }
    } catch (err) {
        logger.error('Failed to delete order', err)
        res.status(400).send({ err: 'Failed to delete order' })
    }
}
// ===================================================================

