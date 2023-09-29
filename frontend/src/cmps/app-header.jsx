// Node Modules
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Store
import { store } from '../store/store.js'
import { updateFilterBy } from '../store/stay.actions.js'
import { OPEN_EXPANDED_HEADER_MODAL } from '../store/system.reducer.js'

// Services
import { utilService } from '../services/util.service.js'

// Custom hooks
import useIsMobile from '../customHooks/useIsMobile.js'
import { useHeaderFilterBy } from '../customHooks/useHeaderFilterBy.js'

// Components
import { HeaderMobile } from './app-header/header-mobile.jsx'
import { HeaderDesktop } from './app-header/header-desktop.jsx'
import { Loader } from './_reuseable-cmps/loader.jsx'


// TODO: in date-picker, when check-in has a date and check-out does not, when clicking same check-in date, check-out date must NOT be same as check-in date!

// TODO-low-priority: change in filterBy, "country" and "city" keys, to "where" key. (must also change in backend, so keep in mind the deployment)


export function AppHeader({ isStayDetailsPage }) {
    const [filterBy, setFilterBy] = useHeaderFilterBy()
    const isFilterExpanded = useSelector(storeState => storeState.systemModule.isFilterExpanded)
    const [selectedExperienceTab, setSelectedExperienceTab] = useState('stays')
    const [selectedFilterBox, setSelectedFilterBox] = useState('where')
    const isMobile = useIsMobile()
    const navigate = useNavigate()


    function onSubmit(ev) {
        ev.preventDefault()
        const filter = createFilterObject()
        updateFilterBy(filter)
        if (isStayDetailsPage) navigate('/')
    }

    function createFilterObject() {
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
            },
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
        if (filterBy.country) filter.country = filterBy.country
        if (filterBy.capacity) filter.capacity = filterBy.capacity
        if (filterBy.guests) {
            filter.guests = filterBy.guests
        }
        if (filterBy.label) filter.label = filterBy.label
        return filter
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
        ev.preventDefault()
        store.dispatch({ type: OPEN_EXPANDED_HEADER_MODAL })
        const field = ev.currentTarget.getAttribute('name')
        if (selectedFilterBox !== field) setSelectedFilterBox(field)
    }

    const layoutType = !isStayDetailsPage ? 'main-layout' : 'details-layout'
    const screenType = isMobile ? ' mobile' : ''
    if (!filterBy) return <Loader />
    return (
        <header className={`app-header-container full ${layoutType}${screenType}`}>
            {
                !isMobile
                    ? <HeaderDesktop
                        isFilterExpanded={isFilterExpanded}
                        selectedExperienceTab={selectedExperienceTab}
                        setSelectedExperienceTab={setSelectedExperienceTab}
                        filterBy={filterBy}
                        setFilterBy={setFilterBy}
                        handleChange={handleChange}
                        handleGuestCountChange={handleGuestCountChange}
                        onSubmit={onSubmit}
                        onSetFilterDates={onSetFilterDates}
                        selectedFilterBox={selectedFilterBox}
                        onSetSelectedFilterBox={onSetSelectedFilterBox}
                        setSelectedFilterBox={setSelectedFilterBox}
                    />
                    : layoutType === 'main-layout' && <HeaderMobile layoutType={layoutType} />
            }
        </header>
    )
}