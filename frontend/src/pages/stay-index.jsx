// Node Modules
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// Store
import { store } from '../store/store.js'
import { loadStays } from '../store/stay.actions.js'
import { CLOSE_EXPANDED_HEADER, CLOSE_EXPANDED_HEADER_MODAL, REMOVE_UNCLICKABLE_BG } from '../store/system.reducer.js'

// Components
import { CategoryFilter } from '../cmps/stay-index/category-filter.jsx'
import { StayList } from '../cmps/stay-index/stay-list.jsx'
import { FilterModal } from '../cmps/filter.jsx'


// TODO: remove category filter when screen width is less than 700px (build a custom hook with an event listener!)

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)


    useEffect(() => {
        console.log('hi from Index')
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
        <section className="stay-index">
            {isFilterModalOpen && (
                <FilterModal
                    stays={stays}
                    setIsFilterModalOpen={setIsFilterModalOpen}
                />
            )}
            <CategoryFilter />
            <StayList stays={stays} />
        </section >
    )
}
