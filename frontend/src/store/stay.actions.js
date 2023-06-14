// import { stayService } from "../services/stay.service.local.js";
import { stayService } from "../services/stay.service.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_STAY, ADD_TO_CART, CLEAR_CART, REMOVE_STAY, REMOVE_FROM_CART, SET_STAYS, UNDO_REMOVE_STAY, UPDATE_STAY, UPDATE_FILTER_BY, SET_GUESTS, SET_MODAL_OPEN, SET_CURR_HOST_IMG_URL } from "./stay.reducer.js";
import { SET_SCORE } from "./user.reducer.js";
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";

// ****************** Action Creators ****************** :

export function getActionRemoveStay(stayId) {
    return {
        type: REMOVE_STAY,
        stayId
    }
}
export function getActionAddStay(stay) {
    return {
        type: ADD_STAY,
        stay
    }
}
export function getActionUpdateStay(stay) {
    return {
        type: UPDATE_STAY,
        stay
    }
}

// ****************** Action senders ****************** :

export async function loadStays(filterBy) {
    try {
        console.log('hi from stay action, loadStays')
        store.dispatch({ type: LOADING_START })
        const stays = await stayService.query(filterBy)
        console.log('hi after stays in action stay')
        store.dispatch({
            type: SET_STAYS,
            stays
        })
    } catch (err) {
        console.log('Cannot load stays', err)
        throw err
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeStay(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch(getActionRemoveStay(stayId))
    } catch (err) {
        console.log('Cannot remove stay', err)
        throw err
    }
}

export async function setHostImgUrl(imgUrl) {
    try {
        store.dispatch({ type: SET_CURR_HOST_IMG_URL, imgUrl })
    } catch (err) {
        console.log('Cannot set imgUrl', err)
        throw err
    }
}

export async function addStay(stay) {
    try {
        const savedStay = await stayService.save(stay)
        store.dispatch(getActionAddStay(savedStay))
        return savedStay
    } catch (err) {
        console.log('Cannot add stay', err)
        throw err
    }
}

export async function updateStay(stay) {
    try {
        const updatedStay = await stayService.save(stay)
        store.dispatch(getActionUpdateStay(updatedStay))
        return updatedStay
    } catch (err) {
        console.log('Cannot save stay', err)
        throw err
    }
}

export function updateFilterBy(filterBy) {
    store.dispatch({ type: UPDATE_FILTER_BY, filterBy })
}

export function addToCart(stay) {
    store.dispatch({
        type: ADD_TO_CART,
        stay
    })
}

export function removeFromCart(stayId) {
    store.dispatch({
        type: REMOVE_FROM_CART,
        stayId
    })
}

export async function checkout(total) {
    try {
        const score = await userService.changeScore(-total)
        store.dispatch({ type: SET_SCORE, score })
        store.dispatch({ type: CLEAR_CART })
        return score
    } catch (err) {
        console.log('StayActions: err in checkout', err)
        throw err
    }
}

export async function setModal(isModalOpen) {
    console.log(isModalOpen)
    store.dispatch({ type: SET_MODAL_OPEN, isModalOpen })
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveStayOptimistic(stayId) {
    store.dispatch({
        type: REMOVE_STAY,
        stayId
    })
    showSuccessMsg('Stay removed')

    stayService.remove(stayId)
        .then(() => {
            console.log('Server Reported - Deleted successfully');
        })
        .catch(err => {
            showErrorMsg('Cannot remove stay')
            console.log('Cannot remove stay', err)
            store.dispatch({
                type: UNDO_REMOVE_STAY,
            })
        })
}
