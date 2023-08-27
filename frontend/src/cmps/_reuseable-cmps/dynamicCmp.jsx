// Store
import { SET_APP_MODAL_LOGIN, SET_APP_MODAL_SIGNUP, SET_APP_MODAL_MAIN_FILTER } from '../../store/system.reducer.js'

// Components
import { FilterModal } from '../filter.jsx'
import { AppLoginSignup } from '../app-login-signup.jsx'


export function DynamicCmp({ modalType }) {
    switch (modalType) {
        case SET_APP_MODAL_LOGIN:
            return <AppLoginSignup isSignUp={false} />
        case SET_APP_MODAL_SIGNUP:
            return <AppLoginSignup isSignUp={true} />
        case SET_APP_MODAL_MAIN_FILTER:
            return <FilterModal />
        default:
            return
    }
}