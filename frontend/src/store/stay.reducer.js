// ************************ Checked Is Being Used ************************
export const UPDATE_FILTER_BY = 'UPDATE_FILTER_BY'
export const RESET_FILTER_BY = 'RESET_FILTER_BY'
export const SET_STAYS = 'SET_STAYS'

// ***********************************************************************
// ********************* Checked It's NOT Being Used *********************
export const REMOVE_STAY = 'REMOVE_STAY'
export const UNDO_REMOVE_STAY = 'UNDO_REMOVE_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'

// ***********************************************************************
// ************** Checked Being Used In Place I Do Not Know **************
export const ADD_STAY = 'ADD_STAY'
export const SET_MODAL_OPEN = 'SET_MODAL_OPEN'

// ***********************************************************************

const initialState = {
    stays: [],
    lastRemovedStay: null,
    filterBy: {},
    guests: {},
    isModalOpen: false
}

export function stayReducer(state = initialState, action) {
    let newState = state
    let stays

    switch (action.type) {

        // ************************ Checked Is Being Used ************************
        case UPDATE_FILTER_BY:
            newState = { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
            break
        case RESET_FILTER_BY:
            newState = { ...state, filterBy: {} }
            break

        case SET_STAYS:
            newState = { ...state, stays: action.stays }
            break

        // ***********************************************************************
        // ********************* Checked It's NOT Being Used *********************
        case REMOVE_STAY:
            const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays: stays, lastRemovedStay: lastRemovedStay }
            break
        case UNDO_REMOVE_STAY:
            if (state.lastRemovedStay) {
                newState = { ...state, stays: [...state.stays, state.lastRemovedStay], lastRemovedStay: null }
            }
            break
        case UPDATE_STAY:
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            newState = { ...state, stays: stays }
            break

        // ***********************************************************************
        // ************** Checked Being Used In Place I Do Not Know **************
        case ADD_STAY:
            newState = { ...state, stays: [...state.stays, action.stay] }
            break
        case SET_MODAL_OPEN:
            newState = { ...state, isModalOpen: action.isModalOpen }
            break

        // ***********************************************************************

        default:
    }
    return newState
}
