// Node Modules
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

// Store
import { store } from '../store/store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { systemSetIsExpandedHeader, systemSetIsExpandedHeaderModal, systemSetIsUnclickableBg } from '../store/systemSlice'
import { stayResetPageNum, stayUpdateFilterBy, stayUpdateIsFinalPage } from '../store/staySlice'

// Services
import { utilService } from '../services/util.service.js'

// Custom hooks
import { useHeaderFilterBy } from '../customHooks/useHeaderFilterBy.js'

// Components
import { HeaderMobile } from './app-header/header-mobile.jsx'
import { HeaderDesktop } from './app-header/header-desktop.jsx'
import { Loader } from './_reuseable-cmps/loader.jsx'


// TODO: in date-picker, when check-in has a date and check-out does not, when clicking same check-in date, check-out date must NOT be same as check-in date!

// TODO-low-priority: change in filterBy, "country" and "city" keys, to "where" key. (must also change in backend, so keep in mind the deployment)


export function AppHeader({ isStayDetailsPage, isMobile }) {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const isFilterExpanded = useAppSelector(storeState => storeState.systemModule.isFilterExpanded)
    const [filterBy, setFilterBy] = useHeaderFilterBy()
    const [searchParams] = useSearchParams()
    const [selectedExperienceTab, setSelectedExperienceTab] = useState('stays')
    const [selectedFilterBox, setSelectedFilterBox] = useState('where')


    // TODO: improve readability for operation of extracting search params from URL to setting in the store (custom hook?)
    useEffect(() => {
        if (location.pathname === '/') {
            const queryObject = queryStringToObject(searchParams)
            // console.log('queryObject', queryObject)
            dispatch(stayUpdateFilterBy(queryObject))
            setFilterBy(queryObject)
        }
    }, [dispatch, setFilterBy, searchParams, location.pathname])


    function createQueryString(data = {}) {
        return Object.keys(data).map(key => {
            let val = data[key]
            if (val !== null && typeof val === 'object') val = createQueryString(val)
            return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}`
        }).join('&')
    }

    // consider making it recursive
    function queryStringToObject(searchParams) {
        const searchParamsObject = {}

        for (const [key, value] of searchParams.entries()) {
            if (key === 'guests') {
                const guests = {}
                const guestParams = value.split('&')
                for (const guestParam of guestParams) {
                    const [guestKey, guestValue] = guestParam.split('=')
                    guests[guestKey] = parseInt(guestValue, 10)
                }
                searchParamsObject[key] = guests
            } else if (key === 'from' || key === 'to' || key === 'capacity') {
                searchParamsObject[key] = parseInt(value, 10)
            } else if (key === 'where') {
                searchParamsObject[key] = value.includes('_') ? value.replace(/_/g, ' ') : value
            }
        }
        return searchParamsObject
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const filter = createFilterObject()
        const searchParamsString = createQueryString(filter)
        stayUpdateFilterBy(filter)
        dispatch(systemSetIsExpandedHeader(false))
        dispatch(systemSetIsUnclickableBg(false))
        dispatch(stayResetPageNum())
        dispatch(stayUpdateIsFinalPage(false))
        navigate(`/?${searchParamsString}`)
    }

    function createFilterObject() {
        const filter = {
            where: '',
            from: '',
            to: '',
            capacity: 0,
            guests: {
                adults: 0,
                children: 0,
                infants: 0,
                pets: 0
            },
        }

        if (filterBy.where) filter.where = filterBy.where
        if (filterBy.from) {
            filter.from = filterBy.from
            if (!filterBy.to) filter.to = filterBy.from + utilService.getTimeDiffBy('day')//if picked ONLY check-in date
            else filter.to = filterBy.to
        }
        if (filterBy.capacity) filter.capacity = filterBy.capacity
        if (filterBy.guests) filter.guests = filterBy.guests
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
        // store.dispatch({ type: OPEN_EXPANDED_HEADER_MODAL })
        store.dispatch(systemSetIsExpandedHeaderModal(true))
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