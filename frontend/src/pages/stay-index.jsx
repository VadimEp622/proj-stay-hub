// Node Modules
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

// Store
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { systemSetIsExpandedHeader, systemSetIsExpandedHeaderModal, systemSetIsUnclickableBg } from '../store/systemSlice'
import { loadStays } from '../store/staySlice'

// Custom hook
import useGeoLocation from '../customHooks/useGeoLocation.js'
import useStaysInfiniteScroll from '../customHooks/useStaysInfiniteScroll.js'

// Components
import { CategoryFilter } from '../cmps/stay-index/category-filter.jsx'
import { StayList } from '../cmps/stay-index/stay-list.jsx'
import { Loader } from '../cmps/_reuseable-cmps/loader.jsx'


export function StayIndex() {
    const stays = useAppSelector(storeState => storeState.stayModule.stays)
    const filterBy = useAppSelector(storeState => storeState.stayModule.filterBy)
    const isSetParamsToFilterBy = useAppSelector(storeState => storeState.stayModule.isSetParamsToFilterBy)
    const isFilterExpanded = useAppSelector(storeState => storeState.systemModule.isFilterExpanded)
    const geoLocation = useGeoLocation()
    const [isLoadingMoreStays, lastStayElementRef] = useStaysInfiniteScroll(filterBy)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (isSetParamsToFilterBy) dispatch(loadStays(filterBy))
    }, [dispatch, filterBy, isSetParamsToFilterBy])



    // TODO: currently only works as in stay-index, it needs to work across the whole app, + make into custom hook
    useEffect(() => {
        function handleScroll() {
            if (isFilterExpanded) {
                dispatch(systemSetIsExpandedHeader(false))
                dispatch(systemSetIsExpandedHeaderModal(false))
                dispatch(systemSetIsUnclickableBg(false))
            }
            window.removeEventListener('scroll', handleScroll)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [dispatch, isFilterExpanded])


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
