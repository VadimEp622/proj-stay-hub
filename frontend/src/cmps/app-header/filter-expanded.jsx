// Node modules
import { useEffect, useRef} from "react"
import { useSelector } from "react-redux"
import { format } from 'date-fns'

// Store
import { store } from "../../store/store.js"
import { CLOSE_EXPANDED_HEADER_MODAL, OPEN_EXPANDED_HEADER_MODAL } from "../../store/system.reducer.js"

// Services
import { SEARCH_2 } from "../../services/svg.service.js"

// Custom Hooks
import { useClickOutside } from "../../customHooks/clickOutsideModal.js"

// Components
import { LocationFilter } from "../location-filter.jsx"
import { DateFilter } from "./filter-expanded/date-filter.jsx"
import { GuestCountFilter } from "../guest-count-filter.jsx"
import { LongTxt } from "../long-txt.jsx"
import SvgHandler from "../svg-handler.jsx"



export function FilterExpanded(
    {
        filterBy,
        setFilterBy,
        handleChange,
        handleGuestCountChange,
        onSubmit,
        onSetFilterDates,
        isFilterExpanded,
        selectedExperienceTab,
        selectedFilterBox,
        onSetSelectedFilterBox,
        setSelectedFilterBox
    }) {
    const isExpandedModalOpen = useSelector(storeState => storeState.systemModule.isExpandedModalOpen)
    const isFirstTimeExpandedRef = useRef(true)
    const dropdownRef = useClickOutside(onClickModal)


    useEffect(() => {
        if (!isFilterExpanded) isFirstTimeExpandedRef.current = true
    }, [isFilterExpanded])



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

    function onClickModal() {
        if (isFilterExpanded) {
            if (!isFirstTimeExpandedRef.current) {
                console.log('HELLO')
                store.dispatch({ type: CLOSE_EXPANDED_HEADER_MODAL })
                setSelectedFilterBox('all')
            } else {
                store.dispatch({ type: OPEN_EXPANDED_HEADER_MODAL })
            }
            isFirstTimeExpandedRef.current = false
        }
    }


    return (
        <section className={`filter-expanded-container full main-layout${isFilterExpanded ? '' : ' folded'}`} >
            <section className={`filter-expanded${selectedFilterBox === 'all' ? ' all' : ''}`} ref={dropdownRef}>
                <article className={`where-container${selectedFilterBox === 'where' ? ' active' : ''}`} name="where" onClick={onSetSelectedFilterBox} >
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
                <div className="size-less">

                    {isExpandedModalOpen && selectedFilterBox !== 'all' &&
                        < div className={`modal ${`${selectedFilterBox}-modal`}`}>
                            {
                                (selectedFilterBox === 'where') &&
                                <LocationFilter filterBy={filterBy} onSubmit={onSubmit} handleChange={handleChange} />
                            }
                            {
                                (selectedFilterBox === 'check-in' || selectedFilterBox === 'check-out') &&
                                <DateFilter filterBy={filterBy} onSetFilterDates={onSetFilterDates} />
                            }
                            {
                                selectedFilterBox === 'who' &&
                                <GuestCountFilter filterBy={filterBy} setFilterBy={setFilterBy} handleGuestCountChange={handleGuestCountChange} />
                            }
                        </div>}
                </div>
            </section>
        </section >
    )
}