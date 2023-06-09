import { userService } from '../services/user.service.js'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const SET_GUESTS = 'SET_GUESTS'
export const SET_ORDER = 'SET_ORDER'
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST'
export const ADD_CONFIRMED_TRIP = 'ADD_CONFIRMED_TRIP'

const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null,
    guests: {},
    wishlist: [],
    order: {}
}

export function userReducer(state = initialState, action) {
    var newState = state
    let user
    switch (action.type) {
        // case INCREMENT:
        //     newState = { ...state, count: state.count + 1 }
        //     break
        // case DECREMENT:
        //     newState = { ...state, count: state.count - 1 }
        //     break
        // case CHANGE_COUNT:
        //     newState = { ...state, count: state.count + action.diff }
        //     break
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case ADD_CONFIRMED_TRIP:
            newState = { ...state, user: { ...state.user, trip: [...state.user.trip, action.trip] } }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case ADD_TO_WISHLIST:
            user = { ...state.user, wishlist: [...state.user.wishlist,  action.stay ] }
            newState = { ...state, user }
            break
        case REMOVE_FROM_WISHLIST:
            user = { ...state.user, wishlist: state.user.wishlist.filter((wishedStay) => wishedStay._id !== action.stay._id) }
            newState = { ...state, user }
            // newState = { ...state, user: { ...state.user, wishlist: state.user.wishlist.filter((wishedStay) => wishedStay._id !== action.wishListID), }, }
            break
        case SET_SCORE:
            newState = { ...state, user: { ...state.user, score: action.score } }
            break
        case SET_GUESTS:
            newState = { ...state, guests: { ...action.guests } }
            break
        case SET_ORDER:
            newState = { ...state, order: { ...action.order } }
            break
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
