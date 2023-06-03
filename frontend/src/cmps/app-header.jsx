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
import { Fragment, useRef, useState } from 'react'
import { stayService } from '../services/stay.service.local.js'
import { AppHeaderSearch } from './app-header-search.jsx'
import { updateFilterBy } from '../store/stay.actions.js'
import { DateFilter } from './app-header-date-filter.jsx'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [filterBy, setFilterBy] = useState({ filterText: '' })
    // const showTempFilterRef = useRef(false)




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


    function onSubmit(ev) {
        ev.preventDefault()
        const filter = {}

        if (filterBy.filterText) {
            filter.city = filterBy.filterText
            filter.country = filterBy.filterText
        }

        updateFilterBy(filter)
    }


    function handleChange({ target }) {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <Fragment>
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

            <section className="filter-container flex justify-center align-center" style={{ gap: 20 }}>
                <AppHeaderSearch filterBy={filterBy} onSubmit={onSubmit} handleChange={handleChange} />
                <DateFilter />
            </section>

        </Fragment>
    )
}