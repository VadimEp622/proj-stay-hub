import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from '../routes.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

import { LOGO, USER_NAV_BARS, USER_NAV_PROFILE } from '../services/svg.service.js'


// import logo from '../assets/img/logo/logo-airbnb.svg'
// import userNav from '../assets/img/user-nav/user-nav.svg'
import SvgHandler from './svg_handler.jsx'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="app-header full main-layout">
            <nav>
                {/* fix img src */}
                <section className="navbar-container">
                    {
                        routes.map(route =>
                            <NavLink
                                key={route.path}
                                to={route.path}
                            >
                                {
                                    route.isLogo &&
                                    // <img src={logo} className="logo-svg" alt="logo" />
                                    <article className="logo-svg">
                                        <SvgHandler svgName={LOGO} />
                                        {route.label}
                                    </article>
                                }
                                {!route.isLogo && route.label}
                            </NavLink>
                        )
                    }
                </section>

                {/* {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <span className="score">{user.score?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                } */}


                <section className="user-navbar-container">
                    <article className="user-navbar">
                        <SvgHandler svgName={USER_NAV_BARS} />
                        <SvgHandler svgName={USER_NAV_PROFILE} />
                    </article>
                </section>
            </nav>
        </header>
    )
}