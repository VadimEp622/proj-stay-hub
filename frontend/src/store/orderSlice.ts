import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { orderService } from "../services/order.service"
import { showErrorMsg } from "../services/event-bus.service"


// TODO: add ts interfaces
interface BuyerSeller {
    _id: string
    fullname: string
    img: string
    joined: string
}

interface OrderDetails {
    checkIn: string
    checkOut: string
    nightsCount: number
    guestCount: number
    singleNightPrice: number
}

interface OrderPrice {
    price: number
    serviceFee: number
    cleaningFee: number
    total: number
}

interface explore {
    label: string
    title: string
    amount: number
    img: string | null
}


interface OrderContent {
    buyer: BuyerSeller
    seller: BuyerSeller
    orderDetails: OrderDetails
    orderPrice: OrderPrice
    stayDetails: any // some keys may not be valid to ALL stays
    explore: explore[]
    status: 'Approved' | 'Rejected' | 'Pending'
}

interface MiniUser {
    _id: string
    fullname: string
}

interface Order {
    _id: string
    content: OrderContent
    byUser: MiniUser
    aboutUser: MiniUser
}

interface OrderState {
    orders: Order[]
    isLoadingOrders: boolean
}

const initialState: OrderState = {
    orders: [],
    isLoadingOrders: false,
}


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderSetIsLoadingOrders(state, action: PayloadAction<boolean>) {
            _updateIsLoadingOrdersState(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadOrders.pending, (state) => {
            _updateIsLoadingOrdersState(state, true)
        }).addCase(
            loadOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                _updateOrdersState(state, action.payload)
                _updateIsLoadingOrdersState(state, false)
            }
        ).addCase(
            loadOrders.rejected, (state, action) => {
                _updateIsLoadingOrdersState(state, false)
                console.log('error - could not get orders', action.error)
                showErrorMsg('Could not load orders')
            }
        )

        builder.addCase(approveOrder.fulfilled, (state, action: PayloadAction<string>) => {
            _approveAndUpdateOrders(state, action.payload)
        }).addCase(
            approveOrder.rejected, (state, action) => {
                console.log('error - could not approve order', action.error)
                showErrorMsg('Could not update order')
            })

        builder.addCase(rejectOrder.fulfilled, (state, action: PayloadAction<string>) => {
            _rejectAndUpdateOrders(state, action.payload)
        }).addCase(
            rejectOrder.rejected, (state, action) => {
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

export const { orderSetIsLoadingOrders } = orderSlice.actions

export default orderSlice.reducer

// ******************************** Local util functions ********************************
// ========================== State Updates ==========================
function _updateOrdersState(state: OrderState, orders: Order[]) {
    state.orders = orders
}

function _updateIsLoadingOrdersState(state: OrderState, isLoadingOrders: boolean) {
    state.isLoadingOrders = isLoadingOrders
}

// ========================== Other ==========================
function _approveAndUpdateOrders(state: OrderState, orderId: string) {
    _updateOrdersStatus(state, orderId, 'Approved')
}

function _rejectAndUpdateOrders(state: OrderState, orderId: string) {
    _updateOrdersStatus(state, orderId, 'Rejected')
}

function _updateOrdersStatus(state: OrderState, orderId: string, status: string) {
    const updatedOrders: Order[] = state.orders.map((order: any) => (order._id === orderId)
        ? { ...order, content: { ...order.content, status } }
        : order
    )
    _updateOrdersState(state, updatedOrders)
}