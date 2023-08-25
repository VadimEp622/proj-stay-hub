import { CONFIG, SEARCH_2 } from "../../services/svg.service.js"
import SvgHandler from "../_reuseable-cmps/svg-handler.jsx"


export function HeaderMobile({ layoutType }) {

    return (
        <section className={`header-mobile full ${layoutType}`}>
            <section className="searchbar-mobile flex">
                <button className="btn-search-mobile flex align-center">
                    <section className="search-img">
                        <SvgHandler svgName={SEARCH_2} />
                    </section>
                    <section className="search-description">
                        <h3 className="upper-description fs14">Anywhere</h3>
                        <article className="lower-description fs12 flex">
                            <p>Any week</p>
                            <p>•</p>
                            <p>Add guests</p>
                        </article>
                    </section>
                </button>
                <button className="btn-main-filter-mobile">
                    <article className="main-filter-img flex align-center justify-center">
                        <SvgHandler svgName={CONFIG} />
                    </article>
                </button>
            </section>
        </section>
    )
}