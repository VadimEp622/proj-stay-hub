// Services
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { EXIT } from '../services/svg.service.js'

// Store
import { login, signup } from '../store/user.actions.js'
import { setAppModal } from '../store/system.action.js'
import { CLOSE_APP_MODAL, SET_APP_MODAL_LOGIN, SET_APP_MODAL_LOGIN_QUICK, SET_APP_MODAL_SIGNUP, SET_APP_MODAL_SIGNUP_QUICK } from '../store/system.reducer.js'

// Custom Hooks
import { useClickOutside } from '../customHooks/useClickOutsideModal.js'

// Components
import { FormLoginSignup } from './app-login-signup/form-login-signup.jsx'
import SvgHandler from './_reuseable-cmps/svg-handler.jsx'
import useLoginSignupCredentials from '../customHooks/useLoginSignupCredentials.js'


// TODO: Add success user-msg for signing-up.
// TODO: Add option to check for existing username, and denying signup attempt.

export function AppLoginSignup({ isSignUp, isQuick = false }) {
    const registerModalRef = useClickOutside(onClickOutsideModal)
    const initialCredentials = useLoginSignupCredentials(isSignUp, isQuick)


    function onClickOutsideModal() {
        setAppModal(CLOSE_APP_MODAL)
    }

    function onCloseModal(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        setAppModal(CLOSE_APP_MODAL)
    }

    function onChangeModal(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        setAppModal(isSignUp ? SET_APP_MODAL_LOGIN : SET_APP_MODAL_SIGNUP)
    }

    function onQuickLogin(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        setAppModal(SET_APP_MODAL_LOGIN_QUICK)
    }

    function onQuickSignup(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        // setAppModal(SET_APP_MODAL_SIGNUP_QUICK)
    }

    function onSubmit(values) {
        if (isSignUp) handleSignup(values)
        else handleLogin(values)
    }

    async function handleLogin(values) {
        if (!values.username) return
        try {
            const user = await login(values)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            setAppModal(CLOSE_APP_MODAL)
        } catch (err) {
            console.log('Failed Login', err)
            showErrorMsg('Failed Login')
        }
    }

    async function handleSignup(values) {
        if (!values.username || !values.password || !values.fullname) return
        try {
            const user = await signup(values)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            setAppModal(CLOSE_APP_MODAL)
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