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

async function getOrders() {
    // return storageService.query('orders')
    return httpService.get(STORAGE_KEY)
}

async function saveOrder(order) {
    var savedStay
    if (order._id) {
        savedStay = await storageService.put('orders', order)
        return savedStay
    }
}
