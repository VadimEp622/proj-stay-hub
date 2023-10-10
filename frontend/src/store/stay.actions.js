// Store
import { store } from './store.js'
import {
    SET_STAYS, UPDATE_FILTER_BY, RESET_FILTER_BY, SET_STAY, LOADING_STAY_START, LOADING_STAY_END
} from "./stay.reducer.js"
import { LOADING_DONE, LOADING_START } from "./system.reducer.js"

// Services
import { stayService } from "../services/stay.service.js"
import { showErrorMsg } from '../services/event-bus.service.js'



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
