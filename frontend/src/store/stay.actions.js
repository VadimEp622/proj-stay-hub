// Store
import { store } from './store.js'
import {
    SET_STAYS, UPDATE_FILTER_BY, RESET_FILTER_BY, SET_STAY, LOADING_STAY_START, LOADING_STAY_END, RESET_IS_SET_PARAMS_TO_FILTER_BY, ADD_TO_STAYS, INCREMENT_PAGE_NUM, UPDATE_IS_FINAL_PAGE, LOADING_MORE_STAYS_START, LOADING_MORE_STAYS_END
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
        store.dispatch({ type: RESET_IS_SET_PARAMS_TO_FILTER_BY })
        store.dispatch({ type: LOADING_START })
        const { stays } = await stayService.query(filterBy)
        store.dispatch({ type: SET_STAYS, stays })
    } catch (err) {
        console.log('Failed loading stays', err)
        showErrorMsg('Failed loading stays')
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function loadMoreStays(filterBy, page) {
    try {
        // console.log('loadMoreStays -> page', page)
        store.dispatch({ type: LOADING_MORE_STAYS_START })
        const { stays, isFinalPage } = await stayService.query({ ...filterBy, page })
        if (isFinalPage) store.dispatch({ type: UPDATE_IS_FINAL_PAGE, isFinalPage })
        store.dispatch({ type: ADD_TO_STAYS, stays })
        store.dispatch({ type: INCREMENT_PAGE_NUM })
    } catch (err) {
        console.log('Failed loading more stays', err)
        showErrorMsg('Failed loading more stays')
    } finally {
        store.dispatch({ type: LOADING_MORE_STAYS_END })
    }
}

export async function loadStay(stayId) {
    try {
        store.dispatch({ type: LOADING_STAY_START })
        const stay = await stayService.getById(stayId)
        store.dispatch({ type: SET_STAY, stay })
    } catch (err) {
        showErrorMsg('Failed loading stay')
        throw new Error('Failed loading stay', err)
    } finally {
        store.dispatch({ type: LOADING_STAY_END })
    }
}

// ***********************************************************************
