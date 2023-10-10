import { userService } from '../services/user.service.js'

// ======================== Confirmed Switch Case In Use =========================
export const SET_USER = 'SET_USER'
export const SET_ORDER = 'SET_ORDER'
// ===============================================================================


const initialState = {
    user: userService.getLoggedinUser(),
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
        // ===============================================================================

        default:
    }


    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
