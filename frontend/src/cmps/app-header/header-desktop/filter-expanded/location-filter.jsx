import flexible from "../../../../assets/img/locations/flexible.jpeg"
import middleEast from "../../../../assets/img/locations/middle-east.webp"
import italy from "../../../../assets/img/locations/italy.webp"
import southAmerica from "../../../../assets/img/locations/south-america.webp"
import france from "../../../../assets/img/locations/france.webp"
import unitedStates from "../../../../assets/img/locations/united-states.webp"

export function LocationFilter({ filterBy, handleChange }) {

    function handleLocationClick(ev, where) {
        if (ev) {
            ev.stopPropagation()
            ev.preventDefault()
        }
        handleChange({ target: { name: 'where', value: where } })
    }

    return (
        <section className="location-filter">
            <h4>Search by region</h4>
            <section className="locations">
                <article className="flexible">
                    <button onClick={(ev) => handleLocationClick(ev, '')}>
                        <img src={flexible} alt='flexible' />
                    </button>
                    <span>I'm flexible</span>
                </article>
                <article className="middle-east">
                    <button onClick={(ev) => handleLocationClick(ev, 'Middle East')}>
                        <img src={middleEast} alt='middle-east' />
                    </button>
                    <span>Middle East</span>
                </article>
                <article className="italy">
                    <button onClick={(ev) => handleLocationClick(ev, 'Italy')}>
                        <img src={italy} alt='italy' />
                    </button>
                    <span>Italy</span>
                </article>
                <article className="south-america">
                    <button onClick={(ev) => handleLocationClick(ev, 'South America')}>
                        <img src={southAmerica} alt='south-america' />
                    </button>
                    <span>South America</span>
                </article>
                <article className="france">
                    <button onClick={(ev) => handleLocationClick(ev, 'France')}>
                        <img src={france} alt='france' />
                    </button>
                    <span>France</span>
                </article>
                <article className="united-states">
                    <button onClick={(ev) => handleLocationClick(ev, 'United States')}>
                        <img src={unitedStates} alt='united-states' />
                    </button>
                    <span>United States</span>
                </article>
            </section>
        </section>
    )
}