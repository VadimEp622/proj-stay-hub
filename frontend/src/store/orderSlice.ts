import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { orderService } from "../services/order.service"
import { showErrorMsg } from "../services/event-bus.service"


// TODO: add ts interfaces

const initialState = {
    orders: [],
    isLoadingOrders: false,
}


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderSetOrders(state, action: PayloadAction<any>) {
            const orders = action.payload
            state.orders = orders
        },
        orderApproveOrder(state, action: PayloadAction<any>) {
            const orderId = action.payload
            _approveAndUpdateOrders(state, orderId)
        },
        orderDenyOrder(state, action: PayloadAction<any>) {
            const orderId = action.payload
            _rejectAndUpdateOrders(state, orderId)
        },
        orderSetIsLoadingOrders(state, action: PayloadAction<any>) {
            const isLoadingOrders = action.payload
            _updateIsLoadingOrdersState(state, isLoadingOrders)
        }

    },
    extraReducers: (builder) => {
        builder.addCase(loadOrders.pending, (state) => {
            const isLoadingOrders = true
            _updateIsLoadingOrdersState(state, isLoadingOrders)
        }).addCase(
            loadOrders.fulfilled, (state, action) => {
                const orders = action.payload
                _updateOrdersState(state, orders)
            }
        ).addCase(
            loadOrders.rejected, (state, action) => {
                console.log('error - could not get orders', action.error)
                showErrorMsg('Could not load orders')
            }
        ).addMatcher(
            loadOrders.settled, (state) => {
                const isLoadingOrders = false
                _updateIsLoadingOrdersState(state, isLoadingOrders)
            }
        )

        builder.addCase(approveOrder.fulfilled, (state, action) => {
            const orderId = action.payload
            _approveAndUpdateOrders(state, orderId)
        }).addCase(approveOrder.rejected, (state, action) => {
            console.log('error - could not approve order', action.error)
            showErrorMsg('Could not update order')
        })

        builder.addCase(rejectOrder.fulfilled, (state, action) => {
            const orderId = action.payload
            _rejectAndUpdateOrders(state, orderId)
        }).addCase(rejectOrder.rejected, (state, action) => {
            console.log('error - could not reject order', action.error)
            showErrorMsg('Could not update order')
        })

    }
})


export const loadOrders = createAsyncThunk(
    'order/loadOrders',
    async () => {
        const orders = await orderService.getOrders()
        return orders
    }
)

export const approveOrder = createAsyncThunk(
    'order/approveOrder',
    async (orderId: string) => {
        await orderService.updateOrderStatus({ status: 'Approved', _id: orderId })
        return orderId
    }
)

export const rejectOrder = createAsyncThunk(
    'order/rejectOrder',
    async (orderId: string) => {
        await orderService.updateOrderStatus({ status: 'Rejected', _id: orderId })
        return orderId
    }
)



// ******************************** Local util functions ********************************
// ========================== State Updates ==========================
function _updateOrdersState(state: any, orders: any) {
    state.orders = orders
}

function _updateIsLoadingOrdersState(state: any, isLoadingOrders: boolean) {
    state.isLoadingOrders = isLoadingOrders
}

// ========================== Other ==========================
function _approveAndUpdateOrders(state: any, orderId: string) {
    _updateOrdersStatus(state, orderId, 'Approved')
}

function _rejectAndUpdateOrders(state: any, orderId: string) {
    _updateOrdersStatus(state, orderId, 'Rejected')
}

function _updateOrdersStatus(state: any, orderId: string, status: string) {
    const updatedOrders = state.orders.map((order: any) => (order._id === orderId)
        ? { ...order, content: { ...order.content, status } }
        : order
    )
    _updateOrdersState(state, updatedOrders)
}