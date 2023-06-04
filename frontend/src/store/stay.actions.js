import { stayService } from "../services/stay.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_STAY, ADD_TO_CART, CLEAR_CART, REMOVE_STAY, REMOVE_FROM_CART, SET_STAYS, UNDO_REMOVE_STAY, UPDATE_STAY, UPDATE_FILTER_BY, SET_GUESTS } from "./stay.reducer.js";
import { SET_SCORE } from "./user.reducer.js";

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

export async function loadStays() {
    try {
        const stays = await stayService.query()
        store.dispatch({
            type: SET_STAYS,
            stays
        })

    } catch (err) {
        console.log('Cannot load stays', err)
        throw err
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
    console.log(filterBy)
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
