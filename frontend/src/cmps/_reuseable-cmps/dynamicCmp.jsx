// Store
import {
    SET_APP_MODAL_LOGIN, SET_APP_MODAL_SIGNUP, SET_APP_MODAL_MAIN_FILTER, SET_APP_MODAL_LOGIN_QUICK, SET_APP_MODAL_SIGNUP_QUICK
} from '../../store/system.reducer.js'

// Components
import { FilterModal } from '../filter.jsx'
import { AppLoginSignup } from '../app-login-signup.jsx'


export function DynamicCmp({ modalType }) {
    switch (modalType) {

        case SET_APP_MODAL_LOGIN:
            return <AppLoginSignup isSignUp={false} />
        case SET_APP_MODAL_LOGIN_QUICK:
            return <AppLoginSignup isSignUp={false} isQuick={true} />
        case SET_APP_MODAL_SIGNUP:
            return <AppLoginSignup isSignUp={true} />
        case SET_APP_MODAL_SIGNUP_QUICK:
            return <AppLoginSignup isSignUp={true} isQuick={true} />

        case SET_APP_MODAL_MAIN_FILTER:
            return <FilterModal />
        default:
            return
    }
}