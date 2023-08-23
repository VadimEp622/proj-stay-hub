// Node modules
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

// Services
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'
import { EXIT } from '../services/svg.service.js'

// Store
import { store } from '../store/store.js'
import { SET_IS_SIGNING_UP } from '../store/system.reducer.js'
import { login, signup } from '../store/user.actions.js'
import { setModal } from '../store/stay.actions.js'

// Custom Hooks
import { useClickOutside } from '../customHooks/clickOutsideModal.js'

// Components
import { ImgUploader } from './_reuseable-cmps/img-uploader.jsx'
import { ButtonMain } from './_reuseable-cmps/button-main.jsx'
import SvgHandler from './svg-handler.jsx'
import { ValidationError } from './login-signup/validation-error.jsx'
import { RegistrationInput } from './login-signup/registration-input.jsx'



const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, 'Username must have at least 6 characters')
        .required('Username is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Password must contain at least one letter, one number, and one special character and at least 8 characters long'
        )
        .required('Password is required')
})


// TODO: Clean up code into child components if possible + same to styling.
// TODO: Add success user-msg for signing-up.
// TODO: Add option to check for existing username, and denying signup attempt.

export function LoginSignup({ isSignUp }) {
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
            // isSigningUpLoggingInRef.current = false
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
        // isSigningUpLoggingInRef.current = false
    }

    function onSubmit(values) {
        console.log('values', values)
        if (isSignUp) onSignup(values)
        else onLogin(values)
    }

    const credentials = { username: '', password: '', fullname: '' }
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

                <Formik
                    initialValues={credentials}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched, values }) => (
                        <Form className='form-login-signup'>

                            <section className="inputs">
                                {
                                    isSignUp &&
                                    <RegistrationInput inputType={'text'} inputName={'fullname'} inputValue={values.fullname}/>
                                }
                                <RegistrationInput inputType={'text'} inputName={'username'} inputValue={values.username} />
                                <RegistrationInput inputType={'password'} inputName={'password'} inputValue={values.password} />
                            </section>
                            
                            <section className="errors">
                            {
                                errors.username && touched.username
                                    ? <ValidationError content={errors.username} /> : null
                            }
                            {
                                errors.password && touched.password
                                ? <ValidationError content={errors.password} /> : null
                            }
                            </section>

                            <section className='btn-login-signup'>
                                <ButtonMain text={`${isSignUp ? 'Register' : 'Continue'}`} isForm={true} />
                            </section>

                        </Form>
                    )}
                </Formik>

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