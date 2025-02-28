// Node modules
import { useLocation } from 'react-router-dom'

// Services
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { EXIT } from '../services/svg.service.js'
import { SET_APP_MODAL_LOGIN, SET_APP_MODAL_LOGIN_QUICK, SET_APP_MODAL_SIGNUP } from '../services/resources-strings.service.js'

// Store
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { login, signup } from '../store/userSlice'
import { systemCloseAppModal, systemSetAppModal } from '../store/systemSlice'
import { loadWishlistedStayId, loadWishlistedStayIds } from '../store/staySlice'

// Custom Hooks
import { useClickOutside } from '../customHooks/useClickOutsideModal.js'
import useLoginSignupCredentials from '../customHooks/useLoginSignupCredentials.js'

// Components
import { FormLoginSignup } from './app-login-signup/form-login-signup.jsx'
import SvgHandler from './_reuseable-cmps/svg-handler.jsx'


// TODO: Add success user-msg for signing-up.
// TODO: Add option to check for existing username, and denying signup attempt.

export function AppLoginSignup({ isSignUp, isQuick = false }) {
    const filterBy = useAppSelector(storeState => storeState.stayModule.filterBy)
    const page = useAppSelector(storeState => storeState.stayModule.page)
    const location = useLocation()
    const dispatch = useAppDispatch()
    const registerModalRef = useClickOutside(onClickOutsideModal)
    const initialCredentials = useLoginSignupCredentials(isSignUp, isQuick)


    function onClickOutsideModal() {
        dispatch(systemCloseAppModal())
    }

    function onCloseModal(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        dispatch(systemCloseAppModal())
    }

    function onChangeModal(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        dispatch(systemSetAppModal(isSignUp ? SET_APP_MODAL_LOGIN : SET_APP_MODAL_SIGNUP))
    }

    function onQuickLogin(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        dispatch(systemSetAppModal(SET_APP_MODAL_LOGIN_QUICK))
    }

    function onQuickSignup(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        // TODO maybe?
    }

    function onSubmit(values) {
        if (isSignUp) handleSignup(values)
        else handleLogin(values)
    }

    async function handleLogin(values) {
        if (!values.username) return
        try {
            const user = await dispatch(login(values)).unwrap()
            if (!user) throw new Error('Failed Login')
            if (location.pathname === '/') dispatch(loadWishlistedStayIds({ filterBy, page, isAllUntilPage: true }))
            if (location.pathname.startsWith('/stay/')) dispatch(loadWishlistedStayId(location.pathname.split('/')[2]))
            showSuccessMsg(`Welcome: ${user.fullname}`)
            dispatch(systemCloseAppModal())
        } catch (err) {
            console.log('Failed Login', err)
            showErrorMsg('Failed Login')
        }
    }

    async function handleSignup(values) {
        if (!values.username || !values.password || !values.fullname) return
        try {
            const user = await dispatch(signup(values)).unwrap()
            if (location.pathname === '/') dispatch(loadWishlistedStayIds({ filterBy, page, isAllUntilPage: true }))
            if (location.pathname.startsWith('/stay/')) dispatch(loadWishlistedStayId(location.pathname.split('/')[2]))
            showSuccessMsg(`Welcome: ${user.fullname}`)
            dispatch(systemCloseAppModal())
        } catch (err) {
            console.log('Failed Signup', err)
            showErrorMsg('Failed Signup')
        }
    }


    return (
        <section className='login-signup-modal' ref={registerModalRef}>

            <section className='header flex justify-center align-center'>
                <article className='btn-exit' onClick={(ev) => onCloseModal(ev)}><SvgHandler svgName={EXIT} /></article>
                <span className='fs16 lh20 ff-circular-bold'>Log in or sign up</span>
            </section>

            <section className='main'>

                <article className='title'>
                    <span className='fs22 lh26 ff-circular-semibold'>Welcome to StayHub</span>
                </article>

                <FormLoginSignup isSignUp={isSignUp} onSubmit={onSubmit} initialCredentials={initialCredentials} />

                <article className="or-divider flex align-center">
                    <span className='fs12 lh16'>or</span>
                </article>

                <article className='custom-btn-white-container toggler-login-signup'>
                    <button className='fs14 lh20 ff-circular-semibold' onClick={(ev) => onChangeModal(ev)}>
                        {isSignUp ? 'Log in' : 'Sign up'}
                    </button>
                </article>

                <article className='custom-btn-white-container'>
                    <button className='fs14 lh20 ff-circular-semibold' onClick={(ev) => onQuickLogin(ev)}>
                        Quick Log in (as guest)
                    </button>
                </article>

                <article className='custom-btn-white-container quick-signup' title='not yet implemented'>
                    <button className='fs14 lh20 ff-circular-semibold' onClick={(ev) => onQuickSignup(ev)}>
                        Quick Sign up (as new user)
                    </button>
                </article>

            </section>
        </section>
    )
}