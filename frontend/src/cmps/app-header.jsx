import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

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
import { LongTxt } from './long-txt.jsx'
import { DropDown } from './dropdown-menu.jsx'
import { useClickOutside } from '../customHooks/clickOutsideModal.js'
import { Logo } from './header/logo.jsx'
import { SearchbarToggler } from './header/searchbar-toggler.jsx'
import { MainNavMenu } from './header/main-nav-menu.jsx'

export function AppHeader({ isStayDetailsPage }) {
    // const isUnclickableBg = useSelector(storeState => storeState.systemModule.system)
    const user = useSelector(storeState => storeState.userModule.user)
    const [filterBy, setFilterBy] = useState({
        filterText: '',
        from: '',
        to: '',
        capacity: 0,
        guests: {
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0
        }
    })
    const isFilterExpanded = useSelector(storeState => storeState.systemModule.isFilterExpanded)
    const [selectedExperienceTab, setSelectedExperienceTab] = useState('stays')
    const [selectedFilterBox, setSelectedFilterBox] = useState('where')


    

    function onSubmit(ev) {
        ev.preventDefault()
        const filter = {
            city: '',
            country: '',
            from: '',
            to: '',
            capacity: '',
            guests: {
                adults: 0,
                children: 0,
                infants: 0,
                pets: 0
            }
        }

        if (filterBy.filterText) {
            filter.city = filterBy.filterText
            filter.country = filterBy.filterText
        }
        if (filterBy.from) {
            filter.from = filterBy.from
            if (!filterBy.to) filter.to = filterBy.from + utilService.getTimeDiffBy('day')//if picked ONLY check-in date
            else filter.to = filterBy.to
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

    function handleGuestCountChange(type, value) {
        setFilterBy(prevFilter => {
            let capacity = prevFilter.capacity
            let guests = prevFilter.guests

            if (capacity === 0 && value > 0) {
                guests[type] += value

                if (type === 'adults') {
                    capacity += value
                } else {
                    guests['adults'] += value
                    capacity += value * 2
                }

            } else {
                guests[type] += value
                capacity += value
            }

            // console.log('capacity', capacity)
            // console.log('guests', guests)

            return {
                ...prevFilter,
                capacity,
                guests
            }
        })
    }

    function setFilterDates(range) {
        if (!range) {
            setFilterBy(prevFilter => ({ ...prevFilter, from: '', to: '' }))
        } else {
            const filter = { ...range }

            if (filter.from === undefined) {
                filter.from = ''
            } else {
                filter.from = Date.parse(range.from)
            }

            if (filter.to === undefined) {
                filter.to = ''
            } else {
                filter.to = Date.parse(range.to)
            }

            setFilterBy(prevFilter => ({ ...prevFilter, ...filter }))
        }
    }

    function displayGuestsFilter() {
        // ******** At least 1 Adult from this point ********
        let guestsStr = ''
        const guests = filterBy.guests.adults + filterBy.guests.children
        guestsStr += `${guests} ${guests > 1 ? 'guests' : 'guest'}`//keep it guests/guests in case of i18
        const infants = filterBy.guests.infants
        if (infants > 0) {
            guestsStr += ` ,${infants} ${infants > 1 ? 'infants' : 'infant'}`
        }
        const pets = filterBy.guests.pets
        if (pets > 0) {
            guestsStr += ` ,${pets} ${pets > 1 ? 'pets' : 'pet'}`
        }
        return guestsStr
    }

    function onSetSelectedFilterBox(ev) {
        // const value = ev.currentTarget.getAttribute('class')
        // console.log('value', value)
        ev.preventDefault()
        const field = ev.currentTarget.getAttribute('name')
        console.log('field', field)
        if (selectedFilterBox !== field) setSelectedFilterBox(field)
    }



    return (
        <Fragment>
            <header className={`app-header-container full ${!isStayDetailsPage ? 'main-layout' : 'details-layout'} always-clickable-bg`}>

                <nav className="app-header">
                    <Logo />
                    <SearchbarToggler
                        isFilterExpanded={isFilterExpanded}
                        selectedExperienceTab={selectedExperienceTab}
                        setSelectedExperienceTab={setSelectedExperienceTab}
                    />
                    <MainNavMenu />
                </nav>

                <section className={`filter-expanded-container full main-layout${isFilterExpanded ? '' : ' folded'}`} >
                    <section className="filter-expanded">
                        <article className={`where-container${selectedFilterBox === 'where' ? ' active' : ''}`} name="where" onClick={onSetSelectedFilterBox}>
                            <section className="where">
                                <h3>Where</h3>
                                <input name="filterText" value={filterBy.filterText} onChange={handleChange} placeholder="Search destinations"></input>
                            </section>
                        </article>
                        <article className={`check-in-container${selectedFilterBox === 'check-in' ? ' active' : ''}`} name="check-in" onClick={onSetSelectedFilterBox}>
                            <section className="check-in">
                                <h3>Check in</h3>
                                <span>{filterBy.from ? format(filterBy.from, 'y-MM-dd') : 'Add dates'}</span>
                            </section>
                        </article>
                        <article className={`check-out-container${selectedFilterBox === 'check-out' ? ' active' : ''}`} name="check-out" onClick={onSetSelectedFilterBox}>
                            <section className="check-out">
                                <h3>Check out</h3>
                                <span>{filterBy.to ? format(filterBy.to, 'y-MM-dd') : 'Add dates'}</span>
                            </section>
                        </article>
                        <article className={`who-container${selectedFilterBox === 'who' ? ' active' : ''}`} name="who" onClick={onSetSelectedFilterBox}>
                            <section className="who-search">
                                <section className="who">
                                    <h3>Who</h3>
                                    <span>
                                        {
                                            filterBy.guests.adults > 0
                                                ? <LongTxt
                                                    txt={displayGuestsFilter()}
                                                    length={11}
                                                    askShowMore={false}
                                                />
                                                : `Add guests`
                                        }
                                    </span>
                                </section>
                                <button className="search" onClick={(ev) => onSubmit(ev)}>
                                    <section className="svg-container">
                                        <SvgHandler svgName={SEARCH_2} />
                                    </section>
                                    <span>Search</span>
                                </button>
                            </section>
                        </article>
                    </section>

                    {
                        isFilterExpanded &&
                        <form className="filter-unraveled-container" onSubmit={onSubmit} >
                            <section className="flex justify-center align-center" style={{ width: '100%', gap: 20 }} >
                                {/* <LocationFilter filterBy={filterBy} onSubmit={onSubmit} handleChange={handleChange} /> */}
                                {
                                    (selectedFilterBox === 'check-in' || selectedFilterBox === 'check-out') &&
                                    <DateFilter setFilterDates={setFilterDates} />
                                }
                                {
                                    selectedFilterBox === 'who' &&
                                    <GuestCountFilter filterBy={filterBy} setFilterBy={setFilterBy} handleGuestCountChange={handleGuestCountChange} />
                                }
                            </section>
                        </form>
                    }
                </section>

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