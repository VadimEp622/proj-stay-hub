// Store
import { store } from "./store.js"
import { LOADING_DONE, LOADING_START } from "./system.reducer.js"
import {
    ADD_TO_WISHLIST, REMOVE_USER, REMOVE_FROM_WISHLIST, SET_GUESTS, SET_ORDER, SET_USER, SET_USERS, SET_WATCHED_USER, ADD_CONFIRMED_TRIP
} from "./user.reducer.js"

// Services
import { userService } from "../services/user.service.js"
import { socketService } from "../services/socket.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { orderService } from "../services/order.service.js"




// ************ Wishlist ************
// TODO: 1. change it so that only the stayId gets added to the wishlist
//       2. also using try...catch (still in this function) update Database through backend
//       3. when mounting stay details/preview, cross-check stayId with user wishlist, and render red heart if match
// **but how does the cmp know if the current stayId, upon clicking heart, needs to be added to wishlist, or removed?
// I have two ideas:
//    A. first stay details/preview, needs to run a function isStayWishlist(stayId), which returns true/false, and then perform add/remove
//    B. make just one function toggleWishlist(stayId), and from there, checks in both store & DB, and removes/adds accordingly
// I believe B is better.
// ***need to pay attention, so that store and DB wishlist values are identical always, even if user rapidly clicks like 
export function AddToWishlist(stay) {
    store.dispatch({ type: ADD_TO_WISHLIST, stay })
}

export function removeFromWishlist(stay) {
    store.dispatch({ type: REMOVE_FROM_WISHLIST, stay })
}

export async function toggleWishlist(stayId) {
    try {
        // console.log('stayId - hi from store toggleWishlist', stayId)
        const updateReport = await userService.updateWishlist(stayId)
        console.log('updateReport', updateReport)
        // TODO: need to update, so that user would know wishlist was updated
        // TODO: need to make wishlist page, and app in general, read and render properly wishlist from just: {_id:stayId}
    } catch (err) {
        console.log('err - could not update wishlist', err)
    }
}
// **********************************

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
        console.log('user from signUp', user)
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

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId);
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export function setGuests(guests) {
    store.dispatch({ type: SET_GUESTS, guests })
}

export function setOrder(order) {
    console.log('user.actions.js ---> Set order:', order)
    store.dispatch({ type: SET_ORDER, order })
}

export async function addConfirmedTrip(trip) {
    try {
        await orderService.sendOrder(trip)
        await userService.update(trip.buyer._id, 'trip', trip)
        store.dispatch({ type: ADD_CONFIRMED_TRIP, trip })
    } catch (err) {
        showErrorMsg('Cannot add confirmed trip')
        console.error('Cannot add confirmed trip', err)
    }
}