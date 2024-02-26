// ************************ Checked Is Being Used ************************
export const UPDATE_FILTER_BY = 'UPDATE_FILTER_BY'
export const RESET_FILTER_BY = 'RESET_FILTER_BY'
export const SET_STAYS = 'SET_STAYS'
export const ADD_TO_STAYS = 'ADD_TO_STAYS'
export const SET_STAY = 'SET_STAY'
export const LOADING_STAY_START = 'LOADING_STAY_START'
export const LOADING_STAY_END = 'LOADING_STAY_END'
export const RESET_IS_SET_PARAMS_TO_FILTER_BY = 'RESET_IS_SET_PARAMS_TO_FILTER_BY'
export const INCREMENT_PAGE_NUM = 'INCREMENT_PAGE_NUM'
export const RESET_PAGE_NUM = 'RESET_PAGE_NUM'
export const UPDATE_IS_FINAL_PAGE = 'UPDATE_IS_FINAL_PAGE'
export const LOADING_MORE_STAYS_START = 'LOADING_MORE_STAYS_START'
export const LOADING_MORE_STAYS_END = 'LOADING_MORE_STAYS_END'
// ***********************************************************************


const initialState = {
    stays: [], //✔
    stay: {}, //✔
    isLoadingStay: false, //✔
    filterBy: {}, //✔
    isSetParamsToFilterBy: false, //✔
    page: 0, //✔
    isLoadingMoreStays: false, //✔
    isFinalPage: false //✔
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
            newState = { ...state, stays: action.stays }
            break
        case ADD_TO_STAYS:
            newState = { ...state, stays: [...state.stays, ...action.stays] }
            break
        case INCREMENT_PAGE_NUM:
            newState = { ...state, page: state.page + 1 }
            break
        case RESET_PAGE_NUM:
            newState = { ...state, page: 0 }
            break
        case UPDATE_IS_FINAL_PAGE:
            newState = { ...state, isFinalPage: action.isFinalPage }
            break
        case LOADING_MORE_STAYS_START:
            newState = { ...state, isLoadingMoreStays: true }
            break
        case LOADING_MORE_STAYS_END:
            newState = { ...state, isLoadingMoreStays: false }
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
