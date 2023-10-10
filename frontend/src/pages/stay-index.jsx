// Node Modules
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

// Store
import { store } from '../store/store.js'
import { loadStays } from '../store/stay.actions.js'
import { CLOSE_EXPANDED_HEADER, CLOSE_EXPANDED_HEADER_MODAL, REMOVE_UNCLICKABLE_BG } from '../store/system.reducer.js'

// Custom hook
import useGeoLocation from '../customHooks/useGeoLocation.js'

// Components
import { CategoryFilter } from '../cmps/stay-index/category-filter.jsx'
import { StayList } from '../cmps/stay-index/stay-list.jsx'



export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const geoLocation = useGeoLocation()


    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])


    useEffect(() => {
        function handleScroll() {
            store.dispatch({ type: CLOSE_EXPANDED_HEADER })
            store.dispatch({ type: CLOSE_EXPANDED_HEADER_MODAL })
            store.dispatch({ type: REMOVE_UNCLICKABLE_BG })
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    return (
        <section className='stay-index'>
            <CategoryFilter />
            <StayList stays={stays} geoLocation={geoLocation} />
        </section >
    )
}
