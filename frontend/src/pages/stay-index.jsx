// Node Modules
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'

// Store
import { store } from '../store/store'
import { loadStays } from '../store/stay.actions.js'
import { CLOSE_EXPANDED_HEADER, CLOSE_EXPANDED_HEADER_MODAL, REMOVE_UNCLICKABLE_BG } from '../store/system.reducer.js'

// Custom hook
import useGeoLocation from '../customHooks/useGeoLocation.js'
import useStaysInfiniteScroll from '../customHooks/useStaysInfiniteScroll.js'

// Components
import { CategoryFilter } from '../cmps/stay-index/category-filter.jsx'
import { StayList } from '../cmps/stay-index/stay-list.jsx'
import { Loader } from '../cmps/_reuseable-cmps/loader.jsx'


export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const isSetParamsToFilterBy = useSelector(storeState => storeState.stayModule.isSetParamsToFilterBy)
    const isFilterExpanded = useSelector(storeState => storeState.systemModule.isFilterExpanded)
    const geoLocation = useGeoLocation()
    const [isLoadingMoreStays, lastStayElementRef] = useStaysInfiniteScroll(filterBy)



    useEffect(() => {
        if (isSetParamsToFilterBy) loadStays(filterBy)
    }, [filterBy, isSetParamsToFilterBy])



    // TODO: currently only works as in stay-index, it needs to work across the whole app, + make into custom hook
    useEffect(() => {
        function handleScroll() {
            if (isFilterExpanded) {
                store.dispatch({ type: CLOSE_EXPANDED_HEADER })
                store.dispatch({ type: CLOSE_EXPANDED_HEADER_MODAL })
                store.dispatch({ type: REMOVE_UNCLICKABLE_BG })
            }
            window.removeEventListener('scroll', handleScroll)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isFilterExpanded])


    return (
        <section className='stay-index'>
            <Helmet>
                <title>StayHub Stays</title>
                <meta name='description' content='Check out our beautiful stays' />
            </Helmet>
            <CategoryFilter />
            <StayList stays={stays} geoLocation={geoLocation} lastStayElementRef={lastStayElementRef} />
            {isLoadingMoreStays && <Loader />}
        </section >
    )
}
