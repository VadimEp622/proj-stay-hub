import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userService } from "../services/user.service"
import { authService } from "../services/auth.service"
import { socketService } from "../services/socket.service"
import { orderService } from "../services/order.service"


interface WishItem {
    _id: string
    imgUrls: string[]
    loc: any
    type: string
    bedrooms: number
    price: number
    availableDates: any
    reviews: any
}

interface TripItem {
    orderId: string
}

interface User {
    _id?: string
    fullname?: string
    imgUrl?: string
    wishlist?: WishItem[]
    trip?: TripItem[]
}

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

interface Order {
    buyer?: BuyerSeller
    seller?: BuyerSeller
    orderDetails?: OrderDetails
    orderPrice?: OrderPrice
    stayDetails?: any // some keys may not be valid to ALL stays
    explore?: explore[]
    status?: string
}

interface UserState {
    user: User | null
    order: Order
}

const initialState: UserState = {
    user: userService.getLoggedinUser(),
    order: {}
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSetOrder: (state, action: PayloadAction<any>) => {
            // TODO: check out why the order object keys are updated upon previous keys
            const order = { ...state.order, ...action.payload }
            state.order = order
        }

    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            const user = action.payload
            _updateUserState(state, user)
            socketService.login(user._id)
        })

        builder.addCase(signup.fulfilled, (state, action) => {
            const user = action.payload
            _updateUserState(state, user)
            socketService.login(user._id)
        })

        builder.addCase(logout.fulfilled, (state) => {
            _updateUserState(state, null)
            socketService.logout()
        })

        builder.addCase(addConfirmedTrip.fulfilled, (state, action) => {
            const user = action.payload
            userService.saveLocalUser(user)
            _updateUserState(state, user)
        })

        builder.addCase(
            toggleWishlist.fulfilled, (state, action) => {
                const user = action.payload
                userService.saveLocalUser(user)
                _updateUserState(state, user)
            }).addCase(
                toggleWishlist.rejected, (state, action) => {
                    console.log('err - could not update wishlist', action.error)
                    // TODO: add prevUser in store, to have a place to restore change if backend action failed
                })

    }
})


export const login = createAsyncThunk(
    'user/login',
    async (credentials: any) => {
        const user = await authService.login(credentials)
        return user
    }
)

export const signup = createAsyncThunk(
    'user/signup',
    async (credentials: any) => {
        const user = await authService.signup(credentials)
        return user
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        await authService.logout()
    }
)

export const addConfirmedTrip = createAsyncThunk(
    'user/addConfirmedTrip',
    async (order: Order) => {
        try {
            if (!order.buyer) throw new Error('invalid order object')
            const user = await userService.getById(order.buyer._id)// check if buyer user exists
            const orderId = await orderService.addOrder(order)// creates order object at DB
            const updatedUser = await userService.addUserTrip(user._id, { orderId })// add orderId to user's trip array in DB 
            return updatedUser
        } catch (err) {
            console.error('Cannot add confirmed trip', err)
            throw err
        }
    }
)

export const toggleWishlist = createAsyncThunk(
    'user/toggleWishlist',
    async ({ loggedInUser, stay }: { loggedInUser: User, stay: any }) => {
        // TODO: need to pay attention, so that store and DB wishlist values are identical always, even if user rapidly clicks like 
        if (!loggedInUser.wishlist) throw new Error('invalid loggedInUser object')

        const { _id, imgUrls, loc, type, bedrooms, price, availableDates, reviews } = stay
        const wishlistStay = { _id, imgUrls, loc, type, bedrooms, price, availableDates, reviews }
        const isWishlist = loggedInUser.wishlist.some((wishItem: WishItem) => wishItem._id === stay._id)

        const user = {
            ...loggedInUser,
            wishlist: (loggedInUser.wishlist && isWishlist)
                ? loggedInUser.wishlist.filter((wishItem: WishItem) => wishItem._id !== stay._id)
                : [...loggedInUser.wishlist, wishlistStay]
        }

        // TODO: consider whether it's better to simply replace the whole user object in database,
        //   to prevent checking again in back-end, if user needs to update or not
        await userService.updateWishlist(wishlistStay)
        return user
    }
)

export const { userSetOrder } = userSlice.actions

export default userSlice.reducer


// ************ Local utility functions ************
function _updateUserState(state: UserState, user: User | null) {
    state.user = user
}