import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from './reuseableCmp/img-uploader'
import { login, signup } from '../store/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useSelector } from 'react-redux'
import { AirbnbButton } from './reuseableCmp/airbnb-button'
import { setModal } from '../store/stay.actions'
import { useClickOutside } from '../customHooks/clickOutsideModal'


export function LoginSignup(props) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [logInClicked, setLogInClicked] = useState(false)
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
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

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
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
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            // setLogInClicked(true)
            // closeModal()
        } catch (err) {
            showErrorMsg('Cannot login')
        }
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        // props.onSignup(credentials)
        signup(credentials)
        clearState()
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className="login-page" ref={dropdownRef}>
            <header className='login-header flex justify-center align-center'>
                <h4 className="fs16">
                    {/* {!isSignup ? 'Signup' : 'Log in'} */}
                    Log in or sign up
                </h4>
            </header>
            <section className='main-login'>
                {!isSignup &&
                    <form className="login-form flex justify-center align-center" onSubmit={onLogin}>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <AirbnbButton text={'Login'} />
                    </form>}

                <div className="signup-section">
                    {isSignup && <form className="signup-form flex" onSubmit={onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <ImgUploader onUploaded={onUploaded} />
                        <button >Signup!</button>
                    </form>}
                </div>
            </section>
        </div>
    )
}
