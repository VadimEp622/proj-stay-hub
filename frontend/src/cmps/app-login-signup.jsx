// Node modules
import { useSelector } from 'react-redux'

// Services
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { EXIT } from '../services/svg.service.js'

// Store
import { login, signup } from '../store/user.actions.js'
import { setModal } from '../store/stay.actions.js'

// Custom Hooks
import { useClickOutside } from '../customHooks/clickOutsideModal.js'

// Components
import SvgHandler from './svg-handler.jsx'
import { FormLoginSignup } from './app-login-signup/form-login-signup.jsx'


// TODO: Add success user-msg for signing-up.
// TODO: Add option to check for existing username, and denying signup attempt.

export function AppLoginSignup({ isSignUp }) {
    const isModalOpen = useSelector(storeState => storeState.stayModule.isModalOpen)
    const dropdownRef = useClickOutside(onDropdownClickOutside)


    function onDropdownClickOutside() {
        if (isModalOpen) {
            console.log('closing modal 1')
            setModal(false)
        }
    }

    function onExitClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        setModal(false)
    }

    function onChangeModal(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        setModal(false)
        setModal(isSignUp ? 'logIn' : 'signUp')
    }

    async function onLogin(values) {
        if (!values.username) return
        try {
            const user = await login(values)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            if (isModalOpen) {
                console.log('closing modal 2')
                setModal(false)
            }
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(values) {
        if (!values.username || !values.password || !values.fullname) return
        if (isModalOpen) {
            console.log('closing modal 3')
            setModal(false)
        }
        signup(values)
    }

    function onSubmit(values) {
        console.log('values', values)
        if (isSignUp) onSignup(values)
        else onLogin(values)
    }


    return (
        <section className='login-signup-modal' ref={dropdownRef}>

            <section className='header flex justify-center align-center'>
                <article className='btn-exit' onClick={(ev) => onExitClick(ev)}><SvgHandler svgName={EXIT} /></article>
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

                <article className='btn-toggler-login-signup'>
                    <button className='fs14 lh20 ff-circular-semibold' onClick={(ev) => onChangeModal(ev)}>
                        {isSignUp ? 'Log in' : 'Sign up'}
                    </button>
                </article>

            </section>
        </section>
    )
}