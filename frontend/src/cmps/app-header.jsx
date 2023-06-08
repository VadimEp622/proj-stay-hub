import { useSelector } from 'react-redux'
import { Fragment, useRef, useState } from 'react'


import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.local.js'
import { store } from '../store/store.js'
import { login, logout, setGuests, signup } from '../store/user.actions.js'
import { updateFilterBy } from '../store/stay.actions.js'
import { utilService } from '../services/util.service.js'


import { LoginSignup } from './login-signup.jsx'
import { Logo } from './header/logo.jsx'
import { SearchbarToggler } from './header/searchbar-toggler.jsx'
import { MainNavMenu } from './header/main-nav-menu.jsx'
import { FilterExpanded } from './header/filter-expanded.jsx'
import { OPEN_EXPANDED_HEADER_MODAL } from '../store/system.reducer.js'



// header filter -> expanded-filter -> filter-modals
// filter-bar -> main-filter


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

    function onSetFilterDates(range) {
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

    function onSetSelectedFilterBox(ev) {
        console.log('ev', ev)
        ev.preventDefault()
        store.dispatch({ type: OPEN_EXPANDED_HEADER_MODAL })
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

                <FilterExpanded
                    filterBy={filterBy}
                    setFilterBy={setFilterBy}
                    handleChange={handleChange}
                    handleGuestCountChange={handleGuestCountChange}
                    onSubmit={onSubmit}
                    onSetFilterDates={onSetFilterDates}
                    isFilterExpanded={isFilterExpanded}
                    selectedExperienceTab={selectedExperienceTab}
                    selectedFilterBox={selectedFilterBox}
                    onSetSelectedFilterBox={onSetSelectedFilterBox}
                    setSelectedFilterBox={setSelectedFilterBox}
                />

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