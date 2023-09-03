// Store
import { store } from "./store.js"
import {
    APPROVE_ORDER, DENY_ORDER, SET_ORDERS, LOADING_ORDERS_END, LOADING_ORDERS_START
} from "./order.reducer.js"

// Services
import { orderService } from "../services/order.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"



export async function loadOrders() {
    try {
        store.dispatch({ type: LOADING_ORDERS_START })
        const orders = await orderService.getOrders()
        store.dispatch({ type: SET_ORDERS, orders })
    } catch (err) {
        console.log('error - could not get orders', err)
        showErrorMsg('Could not load orders')
    } finally {
        store.dispatch({ type: LOADING_ORDERS_END })
    }
}


export async function approveOrder(orderId) {
    try {
        store.dispatch({ type: APPROVE_ORDER, orderId })
        await orderService.updateOrderStatus({ status: 'Approved', _id: orderId })
    } catch (err) {
        console.log('error - could not approve order', err)
        showErrorMsg('Could not update order')
    }
}


export async function denyOrder(orderId) {
    try {
        store.dispatch({ type: DENY_ORDER, orderId })
        await orderService.updateOrderStatus({ status: 'Rejected', _id: orderId })
    } catch (err) {
        console.log('error - could not deny order', err)
        showErrorMsg('Could not update order')
    }
}