// Node Modules
import { useEffect, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'

// Store
import { store } from '../store/store.js'
import { loadMoreStays, loadStays, updateFilterBy } from '../store/stay.actions.js'
import { CLOSE_EXPANDED_HEADER, CLOSE_EXPANDED_HEADER_MODAL, REMOVE_UNCLICKABLE_BG } from '../store/system.reducer.js'

// Custom hook
import useGeoLocation from '../customHooks/useGeoLocation.js'

// Components
import { CategoryFilter } from '../cmps/stay-index/category-filter.jsx'
import { StayList } from '../cmps/stay-index/stay-list.jsx'


// TODO: cleanup the infinite pagination!!
// I. Clean up memory leaks if any exist
// II. Have the backend send back both, new stays array and isFinalPage boolean
// III. add loading animation
// IV. Go through the WHOLE process of the "infinite pagination" one time, to understand the whole flow
// V. attempt to put the "infinite pagination" process into a custom hook, and see if you can improve store state handling
// VI. see incorporation with wishlist stay-list


export function StayIndex() {
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const page = useSelector(storeState => storeState.stayModule.page)
    const isFinalPage = useSelector(storeState => storeState.stayModule.isFinalPage)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const isSetParamsToFilterBy = useSelector(storeState => storeState.stayModule.isSetParamsToFilterBy)
    const geoLocation = useGeoLocation()
    const isFilterExpanded = useSelector(storeState => storeState.systemModule.isFilterExpanded)

    const observer = useRef()
    const lastStayElementRef = useCallback(node => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isFinalPage) {
                console.log('Visible')
                loadMoreStays(filterBy, page + 1)
            }
        })
        if (node) observer.current.observe(node)
        console.log('isFinalPage', isFinalPage)
    }, [isLoading, page, isFinalPage])


    useEffect(() => {
        if (isSetParamsToFilterBy) loadStays(filterBy)
    }, [filterBy, isSetParamsToFilterBy])



    // TODO: currently only works as in stay-index, it needs to work across the whole app
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
        </section >
    )
}
