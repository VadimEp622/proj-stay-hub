
import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from './_reuseable-cmps/img-uploader'
import { login, signup } from '../store/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useSelector } from 'react-redux'
import { AirbnbButton } from './_reuseable-cmps/airbnb-button'
import { setModal } from '../store/stay.actions'
import { useClickOutside } from '../customHooks/clickOutsideModal'
import SvgHandler from './svg-handler'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { utilService } from '../services/util.service'
import { SET_IS_SIGNING_UP } from '../store/system.reducer'
import { store } from '../store/store'
import { useRef } from 'react'

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
});

export function LoginSignup({ isSignUp }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    // const [logInClicked, setLogInClicked] = useState(false)
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    // const [users, setUsers] = useState([])
    const dropdownRef = useClickOutside(onDropdownClickOutside)
    const isModalOpen = useSelector(storeState => storeState.stayModule.isModalOpen)
    // const isSigningUp = useSelector(storeState => storeState.systemModule.isSigningUp)
    const isSigningUpLoggingInRef = useRef(false)


    function onDropdownClickOutside() {
        if (isModalOpen) {
            console.log('closing modal 1')
            setModal(false)
        }
    }

    useEffect(() => {
        // loadUsers()
        if (!isSigningUpLoggingInRef.current) isSigningUpLoggingInRef.current = true
        // if (!isSigningUp) store.dispatch({ type: SET_IS_SIGNING_UP, action: true })
        return () => {
            isSigningUpLoggingInRef.current = false
        }
    }, [])

    function onSubmit(values) {
        // if(!isSigningUp) return
        if (!isSigningUpLoggingInRef.current) return
        // console.log(values)
        console.log('hi from submit')
        if (text === 'Sign up') onSignup(values)
        else onLogin(values)
    }


    // async function loadUsers() {
    //     const users = await userService.getUsers();
    //     setUsers(users);
    // }

    // function handleChange(ev) {
    //     const field = ev.target.name;
    //     const { value } = ev.target;
    //     setCredentials({ ...credentials, [field]: value });
    //     console.log(credentials);
    // }

    async function onLogin(values) {
        if (!values.username) return
        try {
            const user = await login(values)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            if (isModalOpen) {
                console.log('closing modal 2')
                setModal(false)
            }
            // store.dispatch({ type: SET_IS_SIGNING_UP, action: false })
            isSigningUpLoggingInRef.current = false
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
        // store.dispatch({ type: SET_IS_SIGNING_UP, action: false })
        isSigningUpLoggingInRef.current = false
    }

    // function onUploaded(imgUrl) {
    //     setCredentials({ ...credentials, imgUrl })
    // }

    function onCloseModal(ev) {
        if (ev) ev.stopPropagation()
        if (isModalOpen) {
            console.log('closing modal 4')
            setModal(false)
        }
    }

    function onChangeModal(ev, modal) {
        ev.stopPropagation()
        setModal(false)
        setModal(modal)
    }


    // function handleOnClick(ev) {
    //     ev.stopPropagation()
    // }

    const text = isSignUp ? 'Sign up' : 'Login';
    const modalText = isSignUp ? 'logIn' : 'signUp';
    const phraseText = isSignUp
        ? "We'll collect your information to create an account. Terms and conditions apply."
        : "We'll verify your account details to ensure a secure login. Terms and conditions apply.";

    return (
        <div className="login-page" ref={dropdownRef}>
            <header className="login-header">
                <div className="close" onClick={onCloseModal}>
                    <SvgHandler svgName={'exit'} />
                </div>
                <h4 className="fs16">{isSignUp ? 'Sign up' : 'Log in'}</h4>
            </header>
            <section className="main-login">
                <h3 className="welcome">Welcome to Stay Hub</h3>
                <Formik
                    initialValues={credentials}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="login-form flex justify-center align-center">
                            {isSignUp && (
                                <Field
                                    type="text"
                                    name="fullname"
                                    className="login-input"
                                    placeholder="Fullname"
                                    required
                                />
                            )}
                            <Field
                                type="text"
                                name="username"
                                className="login-input"
                                placeholder="Username"
                                required
                            />
                            <Field
                                type="password"
                                name="password"
                                className="login-input"
                                placeholder="Password"
                                required
                            />
                            {
                                errors.password && touched.password
                                    ? (
                                        <aside className="aside-required">
                                            <div className="aside-required-modal">
                                                <div className="exclamation"><SvgHandler svgName={'exclamation'} /></div>
                                                <div className="aside-required-modal-text">{errors.password}</div>
                                            </div>
                                        </aside>
                                    )
                                    : null}
                            {
                                errors.fullname && touched.fullname
                                    ? (
                                        <aside className="aside-required">
                                            <div className="aside-required-modal">
                                                <div className="exclamation"><SvgHandler svgName={'exclamation'} /></div>
                                                <div className="aside-required-modal-text">{errors.fullname}</div></div>
                                        </aside>
                                    )
                                    : null
                            }
                            {errors.username && touched.username
                                ? (
                                    <aside className="aside-required">
                                        <div className="aside-required-modal">
                                            <div className="exclamation"><SvgHandler svgName={'exclamation'} /></div>
                                            <div className="aside-required-modal-text">{errors.username}</div>
                                        </div>
                                    </aside>)
                                : null}

                            <p className="text-in-login">
                                {phraseText} <span className="underline">Privacy Policy</span>
                            </p>
                            <section className="button-login-wrapper"
                            //THIS ONCLICK CAUSED FORMIK TO LAUNCH TWICE THE ON-SUBMIT FUNCTION
                            // onClick={() => {
                            //     document.querySelector('.action-btn').click()
                            // }}
                            >
                                <div className="btn-container" onClick={() => document.querySelector('.action-btn').click()}>
                                    {utilService.createDivsForButtonContainer()}
                                    <div className="content">
                                        <button className="action-btn"
                                        // type="submit"
                                        >
                                            <span className="btn-txt">{text}</span>
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </Form>
                    )}
                </Formik>
                <div className="divider">
                    <div className="divider-line"></div>
                    <div className="divider-text">or</div>
                    <div className="divider-line"></div>
                </div>
                <section className="second-button-wrapper">
                    <button className="button-second-option"
                        type="button"
                        onClick={(ev) => onChangeModal(ev, modalText)
                        }>
                        {isSignUp ? 'Log in' : 'Sign Up'}
                    </button>
                </section>
            </section>
        </div >
    );
}

