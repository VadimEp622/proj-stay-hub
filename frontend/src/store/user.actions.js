// Store
import { store } from "./store.js"
import {
    SET_ORDER, SET_USER
} from "./user.reducer.js"

// Services
import { userService } from "../services/user.service.js"
import { socketService } from "../services/socket.service.js"
import { orderService } from "../services/order.service.js"
import { authService } from "../services/auth.service.js"



export function getActionSetUser(user) {
    return { type: SET_USER, user }
}


// ======================== Confirmed function In Use =========================
export async function toggleWishlist(loggedInUser, stay) {
    // TODO: need to pay attention, so that store and DB wishlist values are identical always, even if user rapidly clicks like 
    try {
        const { _id, imgUrls, loc, type, bedrooms, price, availableDates, reviews } = stay
        const wishlistStay = { _id, imgUrls, loc, type, bedrooms, price, availableDates, reviews }
        const isWishlist = loggedInUser.wishlist.some(wishlist => wishlist._id === stay._id)

        const user = {
            ...loggedInUser,
            wishlist: (isWishlist)
                ? loggedInUser.wishlist.filter((wishedStay) => wishedStay._id !== stay._id)
                : [...loggedInUser.wishlist, wishlistStay]
        }

        store.dispatch(getActionSetUser(user))
        // TODO: consider whether it's better to simply replace the whole user object in database,
        //   to prevent checking again in back-end, if user needs to update or not
        await userService.updateWishlist(wishlistStay)
        userService.saveLocalUser(user)
    } catch (err) {
        console.log('err - could not update wishlist', err)
        // TODO: add prevUser in store, to have a place to restore change if backend action failed
    }
}

export async function login(credentials) {
    try {
        const user = await authService.login(credentials)
        store.dispatch(getActionSetUser(user))
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await authService.signup(credentials)
        store.dispatch(getActionSetUser(user))
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await authService.logout()
        store.dispatch(getActionSetUser(null))
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export function setOrder(order) {
    store.dispatch({ type: SET_ORDER, order })
}

export async function addConfirmedTrip(order) {
    try {
        const user = await userService.getById(order.buyer._id)// check if buyer user exists
        const orderId = await orderService.addOrder(order)// creates order object at DB
        const updatedUser = await userService.addUserTrip(user._id, { orderId })// add orderId to user's trip array in DB 
        userService.saveLocalUser(updatedUser)
        store.dispatch(getActionSetUser(user))
    } catch (err) {
        console.error('Cannot add confirmed trip', err)
        throw err
    }
}
// ============================================================================