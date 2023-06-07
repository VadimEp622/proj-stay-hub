import { SEARCH_2 } from "../../services/svg.service.js"

import { format } from 'date-fns'

import { LocationFilter } from "../location-filter.jsx"
import { DateFilter } from "../app-header-date-filter.jsx"
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
    }) {


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

    return (
        <section className={`filter-expanded-container full main-layout${isFilterExpanded ? '' : ' folded'}`} >
            <section className="filter-expanded">
                <article className={`where-container${selectedFilterBox === 'where' ? ' active' : ''}`} name="where" onClick={onSetSelectedFilterBox}>
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
            </section>

            {
                isFilterExpanded &&
                <form className="filter-unraveled-container" onSubmit={onSubmit} >
                    <section className="flex justify-center align-center" style={{ width: '100%', gap: 20 }} >
                        {/* <LocationFilter filterBy={filterBy} onSubmit={onSubmit} handleChange={handleChange} /> */}
                        {
                            (selectedFilterBox === 'check-in' || selectedFilterBox === 'check-out') &&
                            <DateFilter onSetFilterDates={onSetFilterDates} />
                        }
                        {
                            selectedFilterBox === 'who' &&
                            <GuestCountFilter filterBy={filterBy} setFilterBy={setFilterBy} handleGuestCountChange={handleGuestCountChange} />
                        }
                    </section>
                </form>
            }
        </section>
    )
}