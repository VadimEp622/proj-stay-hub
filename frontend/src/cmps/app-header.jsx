import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from '../routes.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, logout, setGuests, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

// header filter -> expanded-filter -> filter-modals
// filter-bar -> main-filter



import { LOGO, USER_NAV_BARS, USER_NAV_PROFILE, SEARCH, SEARCH_2 } from '../services/svg.service.js'


// import logo from '../assets/img/logo/logo-airbnb.svg'
// import userNav from '../assets/img/user-nav/user-nav.svg'
import SvgHandler from './svg-handler.jsx'
import { Fragment, useRef, useState } from 'react'
import { stayService } from '../services/stay.service.local.js'
import { LocationFilter } from './location-filter.jsx'
import { updateFilterBy } from '../store/stay.actions.js'
import { DateFilter } from './app-header-date-filter.jsx'
import { utilService } from '../services/util.service.js'
import { GuestCountFilter } from './guest-count-filter.jsx'
import { store } from '../store/store.js'
import { CLOSE_EXPANDED_HEADER, OPEN_EXPANDED_HEADER, SET_UNCLICKABLE_BG } from '../store/system.reducer.js'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [filterBy, setFilterBy] = useState({ filterText: '', from: '', to: '', capacity: '' })
    // const [isFilterExpanded, setIsFilterExpanded] = useState(false)
    const isFilterExpanded = useSelector(storeState => storeState.systemModule.isFilterExpanded)
    const [selectedExperienceTab, setSelectedExperienceTab] = useState('stays')
    const isUnclickableBg = useSelector(storeState => storeState.systemModule.system)

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


    function toggleSelected(ev) {
        // This function toggles between selected experiences-tab
        ev.preventDefault()

        const field = ev.currentTarget.getAttribute('name')
        const value = ev.currentTarget.getAttribute('class')

        if (value === selectedExperienceTab) return
        setSelectedExperienceTab(`${field}`)
    }



    function onExpandedFilter(ev) {
        ev.preventDefault()
        // setIsFilterExpanded(true)
        store.dispatch({ type: SET_UNCLICKABLE_BG })
        store.dispatch({ type: OPEN_EXPANDED_HEADER })
    }

    return (
        <Fragment>
            <header className="app-header-container full main-layout always-clickable-bg">
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
                            {
                                !isFilterExpanded &&
                                <button className="filter" onClick={onExpandedFilter}>
                                    <article>Anywhere</article>
                                    <article>Any week</article>
                                    <article>Add guests</article>
                                    <aside className="filter-search-circle">
                                        <SvgHandler svgName={SEARCH} />
                                    </aside>
                                </button>
                            }

                            {isFilterExpanded &&
                                <section className="filter-expanded">
                                    <section className="experiences-tab">

                                        <article
                                            className={selectedExperienceTab === 'stays' ? 'selected' : ''}
                                            name="stays"
                                            onClick={toggleSelected}
                                        >
                                            <span>Stays</span>
                                        </article>

                                        <article
                                            className={selectedExperienceTab === 'experiences' ? 'selected' : ''}
                                            name="experiences"
                                            onClick={toggleSelected}
                                        >
                                            <span>Experiences</span>
                                        </article>

                                        <article
                                            className={selectedExperienceTab === 'online' ? 'selected' : ''}
                                            name="online"
                                            onClick={toggleSelected}
                                        >
                                            <span>Online Experiences</span>
                                        </article>
                                    </section>

                                </section>
                            }
                            <span></span>
                        </section>

                        <section className="user-container">
                            <section className="user-navbar">
                                <article className="bars"><SvgHandler svgName={USER_NAV_BARS} /></article>
                                <article className="profile"><SvgHandler svgName={USER_NAV_PROFILE} /></article>
                            </section>
                        </section>
                    </nav>

                    {/* THIS WILL HAVE 850px WIDTH!!! when 850px WIDTH becomes the width of center column of main layout grid, do Media queries!! */}
                    {
                        isFilterExpanded &&
                        <section className="filter-expanded-container" >
                            <section className="filter-expanded">
                                {/* <span style={{}}>{selectedExperienceTab} here</span> */}
                                <article className="where">
                                    <h3>Where</h3>
                                    <input placeholder="Search Destinations"></input>
                                </article>
                                <article className="check-in">
                                    <h3>Check in</h3>
                                    <span>Add dates</span>
                                </article>
                                <article className="check-out">
                                    <h3>Check out</h3>
                                    <span>Add dates</span>
                                </article>
                                <article className="who">
                                    <h3>Who</h3>
                                    <span>Add guests</span>
                                </article>
                                <article className="search">
                                    <button className="btn-main-search">
                                        <section className="svg-container">
                                            <SvgHandler svgName={SEARCH_2} />
                                        </section>
                                        <span>Search</span>
                                    </button>
                                </article>
                            </section>
                        </section>
                    }

                </section>

                {
                    isFilterExpanded &&
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
                }
            </header>


            {/* {
                isUnclickableBg &&
                <aside
                    className="unclickable-background"
                    onClick={(ev) => onSetIsUnclickableBg(ev, false)}
                ></aside>
            } */}


        </Fragment >
    )
}