// ************************ Checked Is Being Used ************************
export const UPDATE_FILTER_BY = 'UPDATE_FILTER_BY'
export const RESET_FILTER_BY = 'RESET_FILTER_BY'
export const SET_STAYS = 'SET_STAYS'
export const SET_STAY = 'SET_STAY'
export const LOADING_STAY_START = 'LOADING_STAY_START'
export const LOADING_STAY_END = 'LOADING_STAY_END'
export const RESET_IS_SET_PARAMS_TO_FILTER_BY = 'RESET_IS_SET_PARAMS_TO_FILTER_BY'
// ***********************************************************************


const initialState = {
    stays: [], //✔
    stay: {}, //✔
    isLoadingStay: false, //✔
    filterBy: {}, //✔
    isSetParamsToFilterBy: false
}

export function stayReducer(state = initialState, action) {
    let newState = state

    switch (action.type) {

        // ************************ Checked Is Being Used ************************
        case UPDATE_FILTER_BY:
            newState = { ...state, filterBy: { ...state.filterBy, ...action.filterBy }, isSetParamsToFilterBy: true }
            break
        case RESET_FILTER_BY:
            newState = { ...state, filterBy: {}, isSetParamsToFilterBy: true }
            break
        case SET_STAYS:
            newState = { ...state, stays: action.stays}
            break
        case SET_STAY:
            newState = { ...state, stay: action.stay }
            break
        case LOADING_STAY_START:
            newState = { ...state, isLoadingStay: true }
            break
        case LOADING_STAY_END:
            newState = { ...state, isLoadingStay: false }
            break
        case RESET_IS_SET_PARAMS_TO_FILTER_BY:
            newState = { ...state, isSetParamsToFilterBy: false }
            break
        // ***********************************************************************

        default:
    }
    return newState
}
