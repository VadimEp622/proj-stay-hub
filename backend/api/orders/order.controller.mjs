import { logger } from '../../services/logger.service.mjs'
import { socketService } from '../../services/socket.service.mjs'
import { userService } from '../user/user.service.mjs'
import { authService } from '../auth/auth.service.mjs'
import { orderService } from './order.service.mjs'

export async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.query)
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err)
        res.status(400).send({ err: 'Failed to get orders' })
    }
}

export async function deleteOrder(req, res) {
    try {
        const deletedCount = await orderService.remove(req.params.id)
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
console.log('hi from controller')

export async function addOrder(req, res) {

    var { loggedinUser } = req

    try {
        var order = req.body
        order.byUserId = loggedinUser._id
        order = await orderService.add(order)

        // prepare the updated review for sending out
        order.aboutUser = await userService.getById(order.aboutUserId)

        // Give the user credit for adding a review
        // var user = await userService.getById(review.byUserId)
        // user.score += 10
        loggedinUser = await userService.update(loggedinUser)
        order.byUser = loggedinUser

        // User info is saved also in the login-token, update it
        const loginToken = authService.getLoginToken(loggedinUser)
        res.cookie('loginToken', loginToken)

        delete order.aboutUserId
        delete order.byUserId

        socketService.broadcast({ type: 'order-added', data: order, userId: loggedinUser._id })
        socketService.emitToUser({ type: 'order has been added', data: order, userId: order.seller._id })

        const fullUser = await userService.getById(loggedinUser._id)
        socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })

        res.send(order)

    } catch (err) {
        logger.error('Failed to add review', err)
        res.status(400).send({ err: 'Failed to add review' })
    }
}

