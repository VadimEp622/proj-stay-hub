import { storageService } from "./async-storage.service"

const STORAGE_KEY = 'orders'

export const orderService = {
    getOrderById,
    sendOrder,
    removeOrder,
    getOrders
}

window.cs = orderService

async function getOrderById(orderID) {
    const order = await storageService.get('orders', orderID)
    // const user = await httpService.get(`user/${userId}`)
    return order
}

async function sendOrder(order) {
    await storageService.post('orders', order)
}

async function removeOrder(orderId) {
    return storageService.remove('orders', orderId)
}

async function getOrders() {
    return storageService.query('orders')
}