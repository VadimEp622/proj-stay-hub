import { store } from "../../../store/store.js"
import { OPEN_EXPANDED_HEADER, SET_UNCLICKABLE_BG } from "../../../store/system.reducer.js"
import { SEARCH } from "../../../services/svg.service.js"
import SvgHandler from "../../_reuseable-cmps/svg-handler.jsx"




export function SearchbarToggler({ isFilterExpanded, selectedExperienceTab, setSelectedExperienceTab }) {


    function onExpandedFilter(ev) {
        ev.preventDefault()
        store.dispatch({ type: SET_UNCLICKABLE_BG })
        store.dispatch({ type: OPEN_EXPANDED_HEADER })
    }

    function toggleSelected(ev) {
        // This function toggles between selected experiences-tab
        ev.preventDefault()
        const field = ev.currentTarget.getAttribute('name')
        const value = ev.currentTarget.getAttribute('class')
        if (value === selectedExperienceTab) return
        setSelectedExperienceTab(`${field}`)
    }


    return (
        <section className="searchbar-toggler-container">

            {
                !isFilterExpanded &&
                <button className="searchbar-closed" onClick={onExpandedFilter}>
                    <article>Anywhere</article>
                    <article>Any week</article>
                    <article>Add guests</article>
                    <aside className="search-circle">
                        <SvgHandler svgName={SEARCH} />
                    </aside>
                </button>
            }

            {
                isFilterExpanded &&
                <section className="searchbar-open">
                    <section className="experiences-tab">

                        <article
                            className={selectedExperienceTab === 'stays' ? 'selected' : ''}
                            name="stays"
                            onClick={toggleSelected}
                        >
                            <span>Stays</span>
                        </article>

                        <article
                            className={selectedExperienceTab === 'experiences' ? 'selected' : ''}
                            name="experiences"
                            onClick={toggleSelected}
                        >
                            <span>Experiences</span>
                        </article>

                        <article
                            className={selectedExperienceTab === 'online' ? 'selected' : ''}
                            name="online"
                            onClick={toggleSelected}
                        >
                            <span>Online Experiences</span>
                        </article>

                    </section>
                </section>
            }
        </section>
    )
}