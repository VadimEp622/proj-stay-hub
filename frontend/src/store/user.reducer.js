import { userService } from '../services/user.service.js'

// ======================== Confirmed Switch Case In Use =========================
export const SET_USER = 'SET_USER'
export const SET_ORDER = 'SET_ORDER'
export const ADD_CONFIRMED_TRIP = 'ADD_CONFIRMED_TRIP'
// ===============================================================================
// =================== Used In Unused Cmps I Do not Know About ===================
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
// ===============================================================================

const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null,
    order: {}
}

export function userReducer(state = initialState, action) {
    let newState = state
    switch (action.type) {

        // ======================== Confirmed Switch Case In Use =========================
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_ORDER:
            newState = { ...state, order: { ...action.order } }
            break
        case ADD_CONFIRMED_TRIP:
            newState = { ...state, user: { ...state.user, trip: [...state.user.trip, action.trip] } }
            break
        // ===============================================================================
        // =================== Used In Unused Cmps I Do not Know About ===================
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case SET_SCORE:
            newState = { ...state, user: { ...state.user, score: action.score } }
            break
        // ===============================================================================

        default:
    }


    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
