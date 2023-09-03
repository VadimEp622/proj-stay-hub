export const SET_ORDERS = 'SET_ORDERS'
export const APPROVE_ORDER = 'APPROVE_ORDER'
export const DENY_ORDER = 'DENY_ORDER'

export const LOADING_ORDERS_START = 'LOADING_ORDERS_START'
export const LOADING_ORDERS_END = 'LOADING_ORDERS_END'

const initialState = {
    orders: [],
    isLoadingOrders: false,
}


export function orderReducer(state = initialState, action) {
    let newState = state
    let orders

    switch (action.type) {
        case SET_ORDERS:
            return { ...newState, orders: action.orders }
        case APPROVE_ORDER:
            orders = state.orders.map(order => (order._id === action.orderId)
                ? { ...order, content: { ...order.content, status: 'Approved' } }
                : order
            )
            return { ...newState, orders }
        case DENY_ORDER:
            orders = state.orders.map(order => (order._id === action.orderId)
                ? { ...order, content: { ...order.content, status: 'Rejected' } }
                : order
            )
            return { ...newState, orders }

        case LOADING_ORDERS_START:
            return { ...newState, isLoadingOrders: true }
        case LOADING_ORDERS_END:
            return { ...newState, isLoadingOrders: false }

        default: return newState
    }
}
