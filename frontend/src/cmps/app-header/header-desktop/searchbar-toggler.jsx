// Node Modules
import { useDispatch } from "react-redux"

// Store


// Services
import { SEARCH_FAT } from "../../../services/svg.service.js"

// Components
import SvgHandler from "../../_reuseable-cmps/svg-handler.jsx"
import { systemSetIsExpandedHeader, systemSetIsUnclickableBg } from "../../../store/systemSlice"


export function SearchbarToggler({ isFilterExpanded, selectedExperienceTab, setSelectedExperienceTab }) {
    const dispatch = useDispatch()


    function onExpandedFilter(ev) {
        ev.preventDefault()
        dispatch(systemSetIsUnclickableBg(true))
        dispatch(systemSetIsExpandedHeader(true))
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
                        <SvgHandler svgName={SEARCH_FAT} />
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