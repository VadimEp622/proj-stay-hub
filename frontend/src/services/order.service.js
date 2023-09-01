import { storageService } from "./async-storage.service"
import { httpService } from "./http.service"

const STORAGE_KEY = 'orders'

export const orderService = {
    // ---- Verified Works ---- //
    getOrders,
    getOrderById,
    // ------------------------ //

    sendOrder,
    removeOrder,
    updateOrderStatus
}

window.cs = orderService


// =========== Verified Works =========== //
async function getOrders(userId) {
    console.log('order-service.js -> userId', userId)
    return httpService.get(STORAGE_KEY, userId)
}

async function updateOrderStatus(order) {
    return httpService.put(`orders/${order._id}`, order)
}
// ====================================== //


// NEED TO FIX AND CONNECTS ROUTES FOR BACKEND -> NEED TO THINK ABOUT WHAT EXACTLY WILL THE ORDER ROUTES BE.
async function getOrderById(orderID) {
    console.log('getOrderById hi')
    const order = await storageService.get('orders', orderID)
    // return httpService.get(`order/${orderID}`)
    return order
}

async function removeOrder(orderId) {
    console.log('removeOrder hi')
    return storageService.remove('orders', orderId)
    // return httpService.delete(`order/${orderId}`)
}

async function sendOrder(order) {
    console.log('sendOrder hi')
    // console.log('order', order)
    // await storageService.post('orders', order)
    await httpService.post(STORAGE_KEY, order)
}
