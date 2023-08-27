// Node modules
import { useSelector } from 'react-redux'

// Services
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { EXIT } from '../services/svg.service.js'

// Store
import { login, signup } from '../store/user.actions.js'
import { setAppModal } from '../store/system.action.js'
import { CLOSE_APP_MODAL, SET_APP_MODAL_LOGIN, SET_APP_MODAL_SIGNUP } from '../store/system.reducer.js'

// Custom Hooks
import { useClickOutside } from '../customHooks/useClickOutsideModal.js'

// Components
import { FormLoginSignup } from './app-login-signup/form-login-signup.jsx'
import SvgHandler from './_reuseable-cmps/svg-handler.jsx'


// TODO: Add success user-msg for signing-up.
// TODO: Add option to check for existing username, and denying signup attempt.

export function AppLoginSignup({ isSignUp }) {
    const isModalOpen = useSelector(storeState => storeState.stayModule.isModalOpen)
    const registerModalRef = useClickOutside(onClickOutsideModal)


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
        console.log('Clicked Quick Login')
    }

    function onQuickSignup(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        console.log('Clicked Quick Signup')
    }

    function onSubmit(values) {
        console.log('values', values)
        if (isSignUp) handleSignup(values)
        else handleLogin(values)
    }


    async function handleLogin(values) {
        if (!values.username) return
        try {
            const user = await login(values)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            if (isModalOpen) {
                console.log('closing modal 2')
                setAppModal(CLOSE_APP_MODAL)
            }
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function handleSignup(values) {
        if (!values.username || !values.password || !values.fullname) return
        if (isModalOpen) {
            console.log('closing modal 3')
            setAppModal(CLOSE_APP_MODAL)
        }
        signup(values)
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

                <FormLoginSignup isSignUp={isSignUp} onSubmit={onSubmit} />

                <article className="or-divider flex align-center">
                    <span className='fs12 lh16'>or</span>
                </article>

                <article className='custom-btn-white-container btn-toggler-login-signup'>
                    <button className='fs14 lh20 ff-circular-semibold' onClick={(ev) => onChangeModal(ev)}>
                        {isSignUp ? 'Log in' : 'Sign up'}
                    </button>
                </article>

                <article className='custom-btn-white-container'>
                    <button className='fs14 lh20 ff-circular-semibold' onClick={(ev) => onQuickLogin(ev)}>
                        Quick Log in (as guest)
                    </button>
                </article>

                <article className='custom-btn-white-container'>
                    <button className='fs14 lh20 ff-circular-semibold' onClick={(ev) => onQuickSignup(ev)}>
                        Quick Sign up (as new user)
                    </button>
                </article>

            </section>
        </section>
    )
}