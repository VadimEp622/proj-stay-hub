import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from '../routes.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, logout, setGuests, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

// header filter -> expanded-filter -> filter-modals
// filter-bar -> main-filter



import { LOGO, USER_NAV_BARS, USER_NAV_PROFILE, SEARCH } from '../services/svg.service.js'


// import logo from '../assets/img/logo/logo-airbnb.svg'
// import userNav from '../assets/img/user-nav/user-nav.svg'
import SvgHandler from './svg_handler.jsx'
import { Fragment, useRef, useState } from 'react'
import { stayService } from '../services/stay.service.local.js'
import { LocationFilter } from './location-filter.jsx'
import { updateFilterBy } from '../store/stay.actions.js'
import { DateFilter } from './app-header-date-filter.jsx'
import { utilService } from '../services/util.service.js'
import { GuestCountFilter } from './guest-count-filter.jsx'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [filterBy, setFilterBy] = useState({ filterText: '', from: '', to: '', capacity: '' })


    // async function onLogin(credentials) {
    //     try {
    //         const user = await login(credentials)
    //         showSuccessMsg(`Welcome: ${user.fullname}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot login')
    //     }
    // }
    // async function onSignup(credentials) {
    //     try {
    //         const user = await signup(credentials)
    //         showSuccessMsg(`Welcome new user: ${user.fullname}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot signup')
    //     }
    // }
    // async function onLogout() {
    //     try {
    //         await logout()
    //         showSuccessMsg(`Bye now`)
    //     } catch (err) {
    //         showErrorMsg('Cannot logout')
    //     }
    // }


    function onSubmit(ev) {
        ev.preventDefault()
        const filter = { city: '', country: '', from: '', to: '', capacity: '' }

        if (filterBy.filterText) {
            filter.city = filterBy.filterText
            filter.country = filterBy.filterText
        }
        if (filterBy.from) {
            filter.from = filterBy.from
            filter.to = filterBy.to
        }
        if (filterBy.capacity) filter.capacity = filterBy.capacity
        if (filterBy.guests) setGuests(filterBy.guests)
        updateFilterBy(filter)
    }


    function handleChange({ target }) {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    function setFilterDates(range) {
        // console.log('range  --> app-header.jsx', range)
        if (!range) {
            setFilterBy(prevFilter => ({ ...prevFilter, from: '', to: '' }))
        } else {
            const filter = { ...range }
            if (filter.from === undefined) {
                filter.from = ''
            }
            else {
                filter.from = Date.parse(range.from)
            }

            if (filter.to === undefined) {
                if (filter.from === undefined) {
                    filter.to = ''
                } else {
                    filter.to = filter.from + utilService.getTimeDiffBy('day')
                }
            }
            else {
                filter.to = Date.parse(range.to)
            }
            setFilterBy(prevFilter => ({ ...prevFilter, ...filter }))
        }
    }


    return (
        <Fragment>
            <header className="app-header-container full main-layout">
                <section>
                    <nav className="app-header">
                        <section className="logo-container">
                            {
                                routes.map(route =>
                                    route.isLogo &&
                                    <NavLink
                                        className={'page-navbar'}
                                        key={route.path}
                                        to={route.path}
                                    >
                                        <article className="logo-svg">
                                            <SvgHandler svgName={LOGO} />
                                            <span>{route.label}</span>
                                        </article>
                                    </NavLink>
                                )
                            }
                        </section>

                        <section className="filter-container">
                            <span></span>
                            <section className="filter">
                                <article>Anywhere</article>
                                <article>Any week</article>
                                <article>Add guests</article>
                                <aside className="filter-search-circle">
                                    <SvgHandler svgName={SEARCH} />
                                </aside>
                            </section>
                            <span></span>
                        </section>


                        <section className="user-container">
                            <section className="user-navbar">
                                <article className="bars"><SvgHandler svgName={USER_NAV_BARS} /></article>
                                <article className="profile"><SvgHandler svgName={USER_NAV_PROFILE} /></article>
                            </section>
                        </section>
                    </nav>
                </section>
                <section>
                    <form className="filter-unraveled-container" onSubmit={onSubmit} >
                        <section className="flex justify-center align-center" style={{ width: '100%', gap: 20 }} >
                            <LocationFilter filterBy={filterBy} onSubmit={onSubmit} handleChange={handleChange} />
                            <DateFilter filterBy={filterBy} setFilterDates={setFilterDates} />
                            <GuestCountFilter filterBy={filterBy} setFilterBy={setFilterBy} />
                        </section>
                        <input type="submit" style={{ marginInline: 'auto' }} />
                    </form>
                </section>
            </header>


        </Fragment >
    )
}