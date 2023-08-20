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

export function LoginSignup() {
    const isModalOpen = useSelector(storeState => storeState.stayModule.isModalOpen)
    const dropdownRef = useClickOutside(onDropdownClickOutside)

    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })

    function onDropdownClickOutside() {
        if (isModalOpen) {
            console.log('closing modal 1')
            setModal(false)
        }
    }

    function onSubmit(values) {
        console.log('values', values)
        // if (!isSigningUpLoggingInRef.current) return
        // if (text === 'Sign up') onSignup(values)
        // else onLogin(values)
    }

    return (
        <section className='login-signup-modal' ref={dropdownRef}>

            <section className='header flex justify-center align-center'>
                <article className='btn-exit'><SvgHandler svgName={EXIT} /></article>
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
                    {({ errors, touched }) => (
                        <Form className='form-login-signup'>
                            <label tabIndex={1} htmlFor='fullname' className='fullname'>
                                <article className='input-container'>
                                    <span>Fullname</span>
                                    <Field type='text' id='fullname' name='fullname' />
                                </article>
                            </label>
                            <label tabIndex={1} htmlFor='username' className='username'>
                                <article className='input-container'>
                                    <span>Username</span>
                                    <Field id='username' name='username' />
                                </article>
                            </label>

                            <label tabIndex={1} htmlFor='password' className='password'>
                                <article className='input-container'>
                                    <span>Password</span>
                                    <Field type='password' id='password' name='password' />
                                </article>
                            </label>
                        </Form>
                    )}
                </Formik>
                <section className='login-container'></section>
            </section>
        </section>
    )
}