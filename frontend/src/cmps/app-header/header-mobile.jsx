import { CONFIG, SEARCH_2 } from "../../services/svg.service.js"
import SvgHandler from "../svg-handler.jsx"

export function HeaderMobile() {

    return (
        <section className='header-mobile'>
            <section className="searchbar-mobile flex">
                <button className="btn-search-mobile flex">
                    <section className="search-img">
                        <SvgHandler svgName={SEARCH_2} />
                    </section>
                    <section className="search-description">
                        <h3>Anywhere</h3>
                        <article className="flex">
                            <p>Any week</p>
                            <p>•</p>
                            <p>Add guests</p>
                        </article>
                    </section>
                </button>
                <button className="btn-main-filter-mobile">
                    <section className="main-filter-img-container">
                        <article className="main-filter-img flex align-center justify-center">
                            <SvgHandler svgName={CONFIG} />
                        </article>
                    </section>
                </button>
            </section>
        </section>
    )
}