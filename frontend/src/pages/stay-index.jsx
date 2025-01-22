// Node Modules
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

// Store
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { systemSetIsExpandedHeader, systemSetIsExpandedHeaderModal, systemSetIsUnclickableBg } from '../store/systemSlice'
import { loadStays, loadWishlistedStayIds, stayResetWishlistIds, stayUpdateReqStatusLoadStays, stayUpdateReqStatusLoadWishlistIds } from '../store/staySlice'

// Custom hook
import useGeoLocation from '../customHooks/useGeoLocation.js'
import useStaysInfiniteScroll from '../customHooks/useStaysInfiniteScroll.js'

// Components
import { CategoryFilter } from '../cmps/stay-index/category-filter.jsx'
import { StayList } from '../cmps/stay-index/stay-list.jsx'
import { Loader } from '../cmps/_reuseable-cmps/loader.jsx'


// TODO: improve reqStatus render handling for stay list. (take into account infinite scroll)

export function StayIndex() {
    const stays = useAppSelector(storeState => storeState.stayModule.stays)
    const filterBy = useAppSelector(storeState => storeState.stayModule.filterBy)
    const loggedinUser = useAppSelector(storeState => storeState.userModule.user)
    const wishlistIds = useAppSelector(storeState => storeState.stayModule.wishlistIds)
    const isSetParamsToFilterBy = useAppSelector(storeState => storeState.stayModule.isSetParamsToFilterBy)
    const isFilterExpanded = useAppSelector(storeState => storeState.systemModule.isFilterExpanded)
    const geoLocation = useGeoLocation()
    const [reqStatusLoadStays, lastStayElementRef] = useStaysInfiniteScroll(filterBy)
    const dispatch = useAppDispatch()


    useEffect(() => {
        return () => {
            dispatch(stayUpdateReqStatusLoadWishlistIds("idle"))
            dispatch(stayUpdateReqStatusLoadStays("idle"))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isSetParamsToFilterBy) dispatch(loadStays(filterBy))
    }, [dispatch, filterBy, isSetParamsToFilterBy])

    useEffect(() => {
        if (isSetParamsToFilterBy && loggedinUser) {
            dispatch(stayResetWishlistIds())
            dispatch(loadWishlistedStayIds({ filterBy, page: 0 }))
        }
    }, [dispatch, filterBy, isSetParamsToFilterBy, loggedinUser])



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


    function isStayWishlist(stayId) {
        return loggedinUser ? wishlistIds.some(wishlistId => wishlistId === stayId) : false
    }


    return (
        <section className='stay-index'>
            <Helmet>
                <title>StayHub Stays</title>
                <meta name='description' content='Check out our beautiful stays' />
            </Helmet>
            <CategoryFilter />
            <StayList stays={stays} geoLocation={geoLocation} lastStayElementRef={lastStayElementRef} isStayWishlist={isStayWishlist} />
            {(reqStatusLoadStays === "pending") && <Loader />}
            {(reqStatusLoadStays === "succeeded") && stays.length === 0 && <h4>No stays available.</h4>}
            {(reqStatusLoadStays === "failed") && <h4>Failed to load stays.</h4>}
        </section >
    )
}
