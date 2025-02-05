import { logger } from '../../service/logger.service.js'
import { socketService } from '../../service/socket.service.js'
import { orderService } from './order.service.js'

// ======================= Verified being used =======================
export async function getOrders(req, res) {
    try {
        const { usertype: userType } = req.query
        if (!userType || !["all", "buyer", "seller"].includes(userType)) throw new Error('invalid query params')

        const userId = req.loggedinUser?._id
        if (!userId) throw new Error('logged in userId is not valid')
        // TODO: make sure userId is valid mongo object id

        const filter = {}
        if (userType === 'buyer') filter.byUserId = userId
        else if (userType === 'seller') filter.aboutUserId = userId

        const orders = await orderService.query(filter)
        res.send(orders)
    } catch (err) {
        logger.error('Failed to get all orders', err)
        res.status(400).send({ err: 'Failed to get all orders' })
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
        const orderRes = await orderService.create(order)
        // logger.info('Creating order', orderRes._id)

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
    const { id: orderId } = req.params
    const filterBy = {
        orderId
    }

    const { status } = req.body
    const orderToUpdate = {
        content: {
            status
        }
    }


    try {
        const orderRes = await orderService.update(filterBy, orderToUpdate)
        logger.debug('orderRes', orderRes)

        socketService.emitToUser({
            type: 'stay-reservation-reply',
            data: orderRes.content.status,
            userId: orderRes.content.buyer._id
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