// Store
import { store } from "./store.js"
import { LOADING_DONE, LOADING_START } from "./system.reducer.js"
import {
    REMOVE_USER, SET_ORDER, SET_USER, SET_USERS, SET_WATCHED_USER
} from "./user.reducer.js"

// Services
import { userService } from "../services/user.service.js"
import { socketService } from "../services/socket.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { orderService } from "../services/order.service.js"


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

        store.dispatch({ type: SET_USER, user })
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
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user)
        // return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        // window.location.href = "/"
        socketService.logout()
        sessionStorage.removeItem('loggedinUser');
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
        const orderId = await orderService.sendOrder(order)// creates order object at DB
        const updatedUser = await userService.addUserTrip(user._id, { orderId })// add orderId to user's trip array in DB 
        userService.saveLocalUser(updatedUser)
        store.dispatch({ type: SET_USER, user: updatedUser })
    } catch (err) {
        showErrorMsg('Cannot add confirmed trip')
        console.error('Cannot add confirmed trip', err)
    }
}
// ============================================================================
// ================== Used In Unused Cmps I Don't Know About ==================
export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId);
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}
// ============================================================================
