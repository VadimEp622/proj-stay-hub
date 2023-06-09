import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from './reuseableCmp/img-uploader'
import { login, signup } from '../store/user.actions'
import { useSelector } from 'react-redux'
import { AirbnbButton } from './reuseableCmp/airbnb-button'
import SvgHandler from './svg-handler'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { utilService } from '../services/util.service'
import { Redirect } from "react-router-dom"
import { stayService } from '../services/stay.service.local'
import { showErrorMsg } from '../services/event-bus.service'

function onDropdownClickOutside() {
    setModal(false)
}

useEffect(() => {
    loadUsers()
}, [])

function onSubmit(values) {
    console.log(values)
    console.log('hi from submit')
    if (text === 'Sign up') onSignup(values)
    else onLogin(values)
}


async function loadUsers() {
    const users = await userService.getUsers();
    setUsers(users);
}

function handleChange(ev) {
    const field = ev.target.name;
    const { value } = ev.target;
    setCredentials({ ...credentials, [field]: value });
    console.log(credentials);
}

async function onLogin(values) {
    if (!values.username) return
    try {
        const user = await login(values)
        showSuccessMsg(`Welcome: ${user.fullname}`)
        setModal(false)
    } catch (err) {
        showErrorMsg('Cannot login')
    }
}

async function onSignup(values) {
    if (!values.username || !values.password || !values.fullname) return
    setModal(false)
    signup(values)
}

function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl })
}


const validationSchema = Yup.object().shape({
    stayTitle: Yup.string()
        .min(6, 'Stay title must have at least 6 characters')
        .required('Stay title is required'),
    city: Yup.string()
        .min(3, 'City name must have at least 3 characters')
        .required('City name is required'),
    country: Yup.string()
        .min(3, 'Country name must have at least 3 characters')
        .required('Country name is required'),
    street: Yup.string()
        .min(3, 'Street name must have at least 3 characters')
        .required('Street name is required'),
    description: Yup.string()
        .min(10, 'Description must have at least 10 characters')
        .required('Description is required'),
});

export function AddStay() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [stayToAdd, setStayToAdd] = useState(stayService.getEmptyStay())

    if (!loggedInUser) {
        showErrorMsg('You must be logged in to enter this page')
        return <Redirect to="/" />
    }
    return (
        <section className="add-stay" >
            <section className="main-add-stay">
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
                                    name="staytitle"
                                    className="login-input"
                                    placeholder="Add a title for your stay"
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
                            <section className="button-login-wrapper" onClick={() => document.querySelector('.action-btn').click()}>
                                <div className="btn-container" onClick={() => document.querySelector('.action-btn').click()}>
                                    {utilService.createDivsForButtonContainer()}
                                    <div className="content">
                                        <button className="action-btn" type="submit">
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
                    <button className="button-second-option" type="button" onClick={ev => onChangeModal(ev, modalText)}>
                        {isSignUp ? 'Log in' : 'Sign Up'}
                    </button>
                </section>
            </section>
        </section >
    );
}

