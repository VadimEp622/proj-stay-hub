// Store
import { store } from './store.js'
import {
    ADD_STAY, REMOVE_STAY, SET_STAYS, UNDO_REMOVE_STAY, UPDATE_STAY, UPDATE_FILTER_BY, SET_MODAL_OPEN, RESET_FILTER_BY, SET_STAY, LOADING_STAY_START, LOADING_STAY_END, SET_NEW_ORDER
} from "./stay.reducer.js"
import { LOADING_DONE, LOADING_START } from "./system.reducer.js"

// Services
import { stayService } from "../services/stay.service.js"
import { showErrorMsg } from '../services/event-bus.service.js'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


// =====================================================
// ================== Action Creators ================== :
// =====================================================
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
// =====================================================
// ================== Action senders ================== :
// =====================================================


// ************************ Checked Is Being Used ************************
export function updateFilterBy(filterBy) {
    store.dispatch({ type: UPDATE_FILTER_BY, filterBy })
}

export function resetFilterBy() {
    store.dispatch({ type: RESET_FILTER_BY })
}

export async function loadStays(filterBy) {
    try {
        store.dispatch({ type: LOADING_START })
        const stays = await stayService.query(filterBy)
        store.dispatch({ type: SET_STAYS, stays })
    } catch (err) {
        console.log('Failed Loading Stays', err)
        showErrorMsg('Failed Loading Stays')
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function loadStay(stayId) {
    try {
        store.dispatch({ type: LOADING_STAY_START })
        const stay = await stayService.getById(stayId)
        store.dispatch({ type: SET_STAY, stay })
    } catch (err) {
        showErrorMsg('Failed Loading Stay')
        throw new Error('Failed Loading Stay', err)
    } finally {
        store.dispatch({ type: LOADING_STAY_END })
    }
}

// ***********************************************************************
// ********************* Checked It's NOT Being Used *********************
export async function removeStay(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch(getActionRemoveStay(stayId))
    } catch (err) {
        console.log('Cannot remove stay', err)
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

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveStayOptimistic(stayId) {
    store.dispatch({
        type: REMOVE_STAY,
        stayId
    })
    // showSuccessMsg('Stay removed')

    stayService.remove(stayId)
        .then(() => {
            console.log('Server Reported - Deleted successfully');
        })
        .catch(err => {
            // showErrorMsg('Cannot remove stay')
            // needs to be throw here, maybe... TODO: check this function and fix if needed
            console.log('Cannot remove stay', err)
            store.dispatch({
                type: UNDO_REMOVE_STAY,
            })
        })
}

// ***********************************************************************
// ************** Checked Being Used In Place I Do Not Know **************
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

export async function setModal(isModalOpen) {
    store.dispatch({ type: SET_MODAL_OPEN, isModalOpen })
}

// ***********************************************************************
