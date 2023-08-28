// ************************ FilterBy ************************
export const UPDATE_FILTER_BY = 'UPDATE_FILTER_BY'
export const RESET_FILTER_BY = 'RESET_FILTER_BY'
// **********************************************************

export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const UNDO_REMOVE_STAY = 'UNDO_REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const ADD_TO_CART = 'ADD_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_MODAL_OPEN = 'SET_MODAL_OPEN'
export const SET_CURR_HOST_IMG_URL = 'SET_CURR_HOST_IMG_URL'


const initialState = {
    stays: [],
    cart: [],
    lastRemovedStay: null,
    filterBy: {},
    guests: {},
    isModalOpen: false,
    currHostImgUrl: ''
}

export function stayReducer(state = initialState, action) {
    // console.log('action', action)
    let newState = state
    let stays
    let cart
    switch (action.type) {

        // ************************ FilterBy ************************
        case UPDATE_FILTER_BY:
            newState = { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
            break
        case RESET_FILTER_BY:
            newState = { ...state, filterBy: {} }
            break
        // **********************************************************

        case SET_STAYS:
            stays = action.stays.filter(stay => {
                return true
            })
            newState = { ...state, stays: stays }
            break
        case REMOVE_STAY:
            const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays: stays, lastRemovedStay: lastRemovedStay }
            break
        case ADD_STAY:
            newState = { ...state, stays: [...state.stays, action.stay] }
            break
        case UPDATE_STAY:
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            newState = { ...state, stays: stays }
            break
        case ADD_TO_CART:
            newState = { ...state, cart: [...state.cart, action.stay] }
            break
        case REMOVE_FROM_CART:
            cart = state.cart.filter(stay => stay._id !== action.stayId)
            newState = { ...state, cart }
            break
        case CLEAR_CART:
            newState = { ...state, cart: [] }
            break
        case UNDO_REMOVE_STAY:
            if (state.lastRemovedStay) {
                newState = { ...state, stays: [...state.stays, state.lastRemovedStay], lastRemovedStay: null }
            }
            break
        case SET_CURR_HOST_IMG_URL:
            newState = { ...state, currHostImgUrl: action.imgUrl }
            break
        case SET_MODAL_OPEN:
            newState = { ...state, isModalOpen: action.isModalOpen }
            break
        default:
    }
    return newState
}
