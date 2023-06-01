import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from '../routes.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

import { LOGO, USER_NAV_BARS, USER_NAV_PROFILE, SEARCH } from '../services/svg.service.js'


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
        <header className="app-header-container full main-layout">
            <nav className='app-header'>
                {/* fix img src */}
                <section className="navbar-container">
                    {
                        routes.map(route =>
                            <NavLink
                                className={"page-navbar"}
                                key={route.path}
                                to={route.path}
                            >
                                {
                                    route.isLogo &&
                                    <article className="logo-svg">
                                        <SvgHandler svgName={LOGO} />
                                        <span>{route.label}</span>
                                    </article>
                                }
                                {!route.isLogo && route.label}
                            </NavLink>
                        )
                    }
                </section>

                <section className="search-navbar-container">
                    <span></span>
                    <section className='search-navbar'>
                        <article>Anywhere</article>
                        <article>Any week</article>
                        <article>Add guests</article>
                        <button className='custom-btn-main-search'>
                            <SvgHandler svgName={SEARCH} />
                        </button>
                    </section>
                    <span></span>
                </section>


                <section className="user-navbar-container">
                    <section className="user-navbar">
                        <article className="bars"><SvgHandler svgName={USER_NAV_BARS} /></article>
                        <article className="profile"><SvgHandler svgName={USER_NAV_PROFILE} /></article>
                    </section>
                </section>
            </nav>
        </header>
    )
}