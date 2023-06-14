import { storageService } from "./async-storage.service"
import { httpService } from "./http.service"

const STORAGE_KEY = 'orders'

export const orderService = {
    getOrderById,
    sendOrder,
    removeOrder,
    getOrders,
    saveOrder
}

window.cs = orderService

// NEED TO FIX AND CONNECTS ROUTES FOR BACKEND -> NEED TO THINK ABOUT WHAT EXACTLY WILL THE ORDER ROUTES BE.
async function getOrderById(orderID) {
    const order = await storageService.get('orders', orderID)
    // return httpService.get(`order/${orderID}`)
    return order
}

async function sendOrder(order) {
    console.log('order', order)
    // await storageService.post('orders', order)
    await httpService.post(STORAGE_KEY, order)
}

async function removeOrder(orderId) {
    return storageService.remove('orders', orderId)
    // return httpService.delete(`order/${orderId}`)

}

async function getOrders(userId) {
    // return storageService.query('orders')
    return httpService.get(STORAGE_KEY, userId)
    // return httpService.get(`orders/${userId}`)
}

async function saveOrder(order) {
    let savedStay
    // if (order._id) {
    // savedStay = await storageService.put('orders', order)
    savedStay = await httpService.put(`orders/${order._id}`, order)
    return savedStay
    // }
}
