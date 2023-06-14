import { logger } from '../../services/logger.service.mjs'
import { socketService } from '../../services/socket.service.mjs'
import { userService } from '../user/user.service.mjs'
import { authService } from '../auth/auth.service.mjs'
import { orderService } from './order.service.mjs'

export async function getOrders(req, res) {
    try {
        // console.log('req.query', req.query)
        // console.log('req.body', req.body)
        const orders = await orderService.query(req.query)
        // console.log('orders -> order.controller.mjsx', orders)
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err)
        res.status(400).send({ err: 'Failed to get orders' })
    }
}

export async function getOrderById(req, res) {
    try {
        const orderId = req.params.id
        console.log('orderId', orderId)
        // const orders = await orderService.query(orderId)
        const order = await orderService.getById(orderId)
        res.send(order)
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

export async function addOrder(req, res) {
    const loggedinUser = req.loggedinUser
    console.log('loggedinUser', loggedinUser)
    try {
        // console.log('req.query', req.body)
        const { buyer, seller, checkIn, checkOut, orderPrice, guestsNumber, stayDetails, thingsToDo, nightsCount, nightsPrice, status } = req.body
        const order = {
            buyer: buyer,
            seller: seller,
            checkIn: checkIn,
            checkOut: checkOut,
            orderPrice: orderPrice,
            guestsNumber: guestsNumber,
            stayDetails: stayDetails,
            thingsToDo: thingsToDo,
            nightsCount: nightsCount,
            nightsPrice: nightsPrice,
            status: status,
        }
        // const order = req.query
        // order.byUserId = loggedinUser._id
        const orderRes = await orderService.add(order)

        // // prepare the updated review for sending out
        // order.aboutUser = await userService.getById(order.aboutUserId)

        // Give the user credit for adding a review
        // var user = await userService.getById(review.byUserId)
        // user.score += 10
        // loggedinUser = await userService.update(loggedinUser)
        // order.byUser = loggedinUser

        // // User info is saved also in the login-token, update it
        // const loginToken = authService.getLoginToken(loggedinUser)
        // res.cookie('loginToken', loginToken)

        // delete order.aboutUserId
        // delete order.byUserId


        // WHAT IS THIS? =,=
        // socketService.broadcast({ type: 'order-added', data: order, userId: loggedinUser._id })
        // socketService.emitToUser({ type: 'order has been added', data: order, userId: order.seller._id })

        // const fullUser = await userService.getById(loggedinUser._id)
        // socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })

        res.send(order)

    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(400).send({ err: 'Failed to add order' })
    }
}


export async function updateOrder(req, res) {
    // console.log('req.body', req.body)
    const orderId = req.params.id
    const orderStatus = req.body.status

    // console.log('req.params.id', req.params.id)
    const orderToUpdate = await orderService.getById(orderId)
    // console.log('orderToUpdate', orderToUpdate)
    orderToUpdate.content.status = orderStatus
    // console.log('orderToUpdate', orderToUpdate)
    try {
        const orderRes = await orderService.update(orderToUpdate)
        socketService.emitToUser({ type:'user-watch', data:'a stay you own has just been reserved', userId:orderToUpdate.content.seller._id })
        res.send(orderRes)
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(400).send({ err: 'Failed to update order' })
    }
}
