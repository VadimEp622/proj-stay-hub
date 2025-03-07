import { isValidObjectId } from 'mongoose'
import { logger } from '../../service/logger.service.js'
import { socketService } from '../../service/socket.service.js'
import { BadRequestException } from '../../shared/exeptions/http.exceptions.ts'
import { orderService } from './order.service.js'

// ======================= Verified being used =======================
export async function getOrders(req, res, next) {
    try {
        const { usertype: userType } = req.query
        if (!userType || !["all", "buyer", "seller"].includes(userType)) throw new BadRequestException('invalid query params')

        const userId = req.loggedinUser?._id
        if (!isValidObjectId(userId))
            throw new BadRequestException("Invalid loggedin userId");

        const filter = {}
        if (userType === 'buyer') filter.byUserId = userId
        else if (userType === 'seller') filter.aboutUserId = userId

        const orders = await orderService.query(filter)
        res.status(200).send(orders)
    } catch (err) {
        next(err);
    }
}

export async function addOrder(req, res, next) {
    try {
        const { buyer, seller, orderDetails, orderPrice, stayDetails, explore, status } = req.body

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
        next(err);
    }
}

export async function updateOrder(req, res, next) {
    try {
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


        const orderRes = await orderService.update(filterBy, orderToUpdate)
        logger.debug('orderRes', orderRes)

        socketService.emitToUser({
            type: 'stay-reservation-reply',
            data: orderRes.content.status,
            userId: orderRes.content.buyer._id
        })

        res.send(orderRes)
    } catch (err) {
        next(err);
    }
}
// ===================================================================
// ============== Verified working - but NOT being used ==============
export async function getOrderById(req, res, next) {
    try {
        const orderId = req.params.id
        const order = await orderService.getById(orderId)
        res.status(200).send(order)
    } catch (err) {
        next(err);
    }
}

export async function deleteOrder(req, res, next) {
    try {
        const orderId = req.params.id
        const deletedCount = await orderService.remove(orderId)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove order' })
        }
    } catch (err) {
        next(err);
    }
}
// ===================================================================