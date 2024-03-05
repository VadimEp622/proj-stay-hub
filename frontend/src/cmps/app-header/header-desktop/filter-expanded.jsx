// Node modules
import { useEffect, useRef } from "react"
import { format } from 'date-fns'

// Store
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { systemSetIsExpandedHeaderModal } from "../../../store/systemSlice"

// Services
import { SEARCH } from "../../../services/svg.service.js"

// Custom Hooks
import { useClickOutside } from "../../../customHooks/useClickOutsideModal.js"

// Components
import { LocationFilter } from "./filter-expanded/location-filter.jsx"
import { DateFilter } from "./filter-expanded/date-filter.jsx"
import { GuestCountFilter } from "./filter-expanded/guest-count-filter.jsx"
import SvgHandler from "../../_reuseable-cmps/svg-handler.jsx"
import { LongTxt } from "../../_reuseable-cmps/long-txt.jsx"
import { ButtonMain } from "../../_reuseable-cmps/button-main.jsx"



// TODO: implement main site button for search, and implement folded search button (simple circle button)
//    |
//    V
// TODO: At 950px (and lower) viewport width, change main-button to simple circle button

// TODO: find a way to improve styling to be even more organized (without compromising functionality)
// TODO: fix distancing for the modals opened by clicking different filter parameters


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
    const isExpandedModalOpen = useAppSelector(storeState => storeState.systemModule.isExpandedModalOpen)
    const isFirstTimeExpandedRef = useRef(true)
    const dropdownRef = useClickOutside(onClickModal)
    const dispatch = useAppDispatch()


    
    useEffect(() => {
        if (!isFilterExpanded) isFirstTimeExpandedRef.current = true
    }, [isFilterExpanded])



    function displayGuestsFilter(filter) {
        // ******** At least 1 Adult from this point ********
        let guestsStr = ''
        const guests = filter.guests.adults + filter.guests.children
        guestsStr += `${guests} ${guests > 1 ? 'guests' : 'guest'}`//keep it guests/guests in case of i18
        const infants = filter.guests.infants
        if (infants > 0) {
            guestsStr += ` ,${infants} ${infants > 1 ? 'infants' : 'infant'}`
        }
        const pets = filter.guests.pets
        if (pets > 0) {
            guestsStr += ` ,${pets} ${pets > 1 ? 'pets' : 'pet'}`
        }
        return guestsStr
    }

    function onClickModal() {
        if (isFilterExpanded) {
            if (!isFirstTimeExpandedRef.current) {
                dispatch(systemSetIsExpandedHeaderModal(false))
                setSelectedFilterBox('all')
            } else {
                dispatch(systemSetIsExpandedHeaderModal(true))
            }
            isFirstTimeExpandedRef.current = false
        }
    }


    return (
        <section className={`filter-expanded-container full main-layout${isFilterExpanded ? '' : ' folded'}`} >
            <section className={`filter-expanded${selectedFilterBox === 'all' ? ' all' : ''}`} ref={dropdownRef}>
                <article className={`where-container${selectedFilterBox === 'where' ? ' active' : ''}`} name="where" onClick={onSetSelectedFilterBox} >
                    <section className="where">
                        <h3 className="fs12 lh16 ff-circular-bold">Where</h3>
                        <input autoComplete="off" className="fs14 lh18" name="where" value={filterBy.where} onChange={handleChange} placeholder="Search destinations"></input>
                    </section>
                </article>
                <article className={`check-in-container${selectedFilterBox === 'check-in' ? ' active' : ''}`} name="check-in" onClick={onSetSelectedFilterBox}>
                    <section className="check-in">
                        <h3 className="fs12 lh16 ff-circular-bold">Check in</h3>
                        <span className="fs14 lh18">{filterBy.from ? format(filterBy.from, 'y-MM-dd') : 'Add dates'}</span>
                    </section>
                </article>
                <article className={`check-out-container${selectedFilterBox === 'check-out' ? ' active' : ''}`} name="check-out" onClick={onSetSelectedFilterBox}>
                    <section className="check-out">
                        <h3 className="fs12 lh16 ff-circular-bold">Check out</h3>
                        <span className="fs14 lh18">{filterBy.to ? format(filterBy.to, 'y-MM-dd') : 'Add dates'}</span>
                    </section>
                </article>
                <article className={`who-container${selectedFilterBox === 'who' ? ' active' : ''}`} name="who" onClick={onSetSelectedFilterBox}>
                    <section className="who-search">
                        <section className="who">
                            <h3 className="fs12 lh16 ff-circular-bold">Who</h3>
                            <span className="fs14 lh18">
                                {
                                    filterBy?.guests?.adults > 0
                                        ? <LongTxt
                                            txt={displayGuestsFilter(filterBy)}
                                            length={11}
                                            askShowMore={false}
                                        />
                                        : `Add guests`
                                }
                            </span>
                        </section>
                        <section className="btn-search-container">
                            <ButtonMain
                                onClickButton={(ev) => onSubmit(ev, filterBy)}
                                content={(
                                    <section className="search">
                                        <section className="svg-container">
                                            <SvgHandler svgName={SEARCH} />
                                        </section>
                                        <span className="fs16 lh16">Search</span>
                                    </section>
                                )}
                                borderRadius={'32px'}
                            />
                        </section>
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