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


// TODO: when focus-within is active, make sure the transformed span text stays transformed,
//    as long as field input has a value.

export function LoginSignup({ isSignUp }) {
    const isModalOpen = useSelector(storeState => storeState.stayModule.isModalOpen)
    const dropdownRef = useClickOutside(onDropdownClickOutside)

    console.log('isSignUp', isSignUp)

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

    function onSubmit(values) {
        console.log('values', values)
        // if (!isSigningUpLoggingInRef.current) return
        // if (text === 'Sign up') onSignup(values)
        // else onLogin(values)
    }

    const credentials = { username: '', password: '', fullname: '' }
    return (
        <section className='login-signup-modal' ref={dropdownRef}>

            <section className='header flex justify-center align-center'>
                <article className='btn-exit' onClick={(ev) => onExitClick(ev)}><SvgHandler svgName={EXIT} /></article>
                <span className='fs16 lh20 ff-circular-bold'>{`${isSignUp ? 'Log in or sign up' : 'Welcome back!'}`}</span>
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
                            {
                                isSignUp &&
                                <label tabIndex={1} htmlFor='fullname' className={`fullname`}>
                                    <article className='input-container'>
                                        <span className={`${values.fullname ? 'has-value' : ''}`}>Fullname</span>
                                        <Field type='text' id='fullname' name='fullname' />
                                    </article>
                                </label>
                            }

                            <label tabIndex={1} htmlFor='username' className='username'>
                                <article className='input-container'>
                                    <span className={`${values.username ? 'has-value' : ''}`}>Username</span>
                                    <Field id='username' name='username' />
                                </article>
                            </label>

                            <label tabIndex={1} htmlFor='password' className='password'>
                                <article className='input-container'>
                                    <span className={`${values.password ? 'has-value' : ''}`}>Password</span>
                                    <Field type='password' id='password' name='password' />
                                </article>
                            </label>

                            {
                                errors.password && touched.password
                                    ? <ValidationError content={errors.password} /> : null
                            }
                            {
                                errors.fullname && touched.fullname
                                    ? <ValidationError content={errors.fullname} /> : null
                            }
                            {
                                errors.username && touched.username
                                    ? <ValidationError content={errors.username} /> : null
                            }

                            <section className='btn-login-signup'>
                                <ButtonMain text={`${isSignUp ? 'Register' : 'Continue'}`} isForm={true} />
                            </section>

                        </Form>
                    )}
                </Formik>
                <section className='btn-toggler-login-signup'>
                    <button
                        onClick={(ev) => onChangeModal(ev)}
                    >{isSignUp ? 'Log in' : 'Sign up'}</button>
                </section>
            </section>
        </section>
    )
}