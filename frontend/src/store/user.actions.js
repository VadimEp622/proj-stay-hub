import { userService } from "../services/user.service.js";
import { socketService } from "../services/socket.service.js";
import { store } from '../store/store.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import { ADD_TO_WISHLIST, REMOVE_USER, REMOVE_FROM_WISHLIST, SET_GUESTS, SET_ORDER, SET_USER, SET_USERS, SET_WATCHED_USER, ADD_CONFIRMED_TRIP } from "./user.reducer.js";
import { Navigate } from "react-router-dom";

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
        return user
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
        window.location.href = "/"
        socketService.logout()
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
    store.dispatch({ type: SET_ORDER, order })
}

export function AddToWishlist(wishlist) {
    store.dispatch({ type: ADD_TO_WISHLIST, wishlist })
}

export function removeFromWishlist(wishListID) {
    store.dispatch({ type: REMOVE_FROM_WISHLIST, wishListID })
}

export async function addConfirmedTrip(trip) {
    store.dispatch({ type: ADD_CONFIRMED_TRIP, trip })
}