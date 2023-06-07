import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from './reuseableCmp/img-uploader'
import { login, signup } from '../store/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useSelector } from 'react-redux'
import { AirbnbButton } from './reuseableCmp/airbnb-button'
import { setModal } from '../store/stay.actions'
import { useClickOutside } from '../customHooks/clickOutsideModal'
import SvgHandler from './svg-handler'


export function LoginSignup({ isSignUp }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [logInClicked, setLogInClicked] = useState(false)
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [users, setUsers] = useState([])
    const dropdownRef = useClickOutside(onDropdownClickOutside)

    function onDropdownClickOutside() {
        setModal(false)
    }


    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const { value } = ev.target
        setCredentials({ ...credentials, [field]: value })
    }

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        // props.onLogin(credentials)
        console.log('entered login button')
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            // setLogInClicked(true)
            // closeModal()
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        // props.onSignup(credentials)
        signup(credentials)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    function onCloseModal(ev) {
        ev.stopPropagation()
        setModal(false)
    }

    function onChangeModal(ev, modal) {
        ev.stopPropagation()
        setModal(modal)
    }

    const text = isSignUp ? 'Sign up' : 'Login'
    const modalText = isSignUp ? 'logIn' : 'signUp'
    return (
        <div className="login-page" ref={dropdownRef}>
            <header className='login-header'>
                <div className="close" onClick={(ev) => onCloseModal(ev)}><SvgHandler svgName={'exit'} /></div>
                <h4 className="fs16">
                    {isSignUp ? 'Sign up' : 'Log in'}
                </h4>
            </header>
            <section className='main-login'>
                <h3 className="welcome">Welcome to Stay Hub</h3>
                <form className="login-form flex justify-center align-center" onSubmit={onLogin}>
                    {isSignUp && <input
                        type="text"
                        name="fullname"
                        className="login-input"
                        value={credentials.fullname}
                        placeholder="Fullname"
                        onChange={handleChange}
                        required
                    />}
                    <input
                        type="text"
                        name="username"
                        style={{
                            borderBottom: isSignUp ? 0 : 'initial',
                            borderBottomLeftRadius: isSignUp ? 0 : 'initial',
                            borderBottomRightRadius: isSignUp ? 0 : 'initial'
                        }}
                        className={'login-input'}
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="login-input"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        style={{
                            borderBottomLeftRadius: '12px',
                            borderBottomRightRadius: '12px'
                        }}
                        required
                    />
                    <p className="text-in-login">
                        We'll call or text you to confirm your number. Standard message and data rates apply. <span className="underline">Privacy Policy</span>
                    </p>
                    <section className="button-login-wrapper"><AirbnbButton text={text} />
                    </section>
                </form>
                <div className="divider">
                    <div className="divider-line"></div>
                    <div className="divider-text">or</div>
                    <div className="divider-line"></div>
                </div>
                <section className="second-button-wrapper">                <button className="button-second-option" onClick={(ev) => onChangeModal(ev, modalText)}>{isSignUp ? 'Log in' : 'Sign Up'}</button>
                </section>
            </section>
        </div>
    )
}
