import SvgHandler from "../svg-handler.jsx"

export function HeaderMobile() {

    return (
        <section className='header-mobile'>
            <section className="searchbar-mobile flex">
                <button className="btn-search-mobile flex">
                    <section className="search-img">
                        <SvgHandler />
                    </section>
                    <section className="">
                        <h3>Anywhere</h3>
                        <article>
                            <p>Any week</p>
                            <p>•</p>
                            <p>Add guests</p>
                        </article>
                    </section>
                </button>
                <button className="btn-main-filter-mobile">
                    <section className="main-filter-img-container">
                        <article className="main-filter-img">
                            <SvgHandler />
                        </article>
                    </section>
                </button>
            </section>
        </section>
    )
}