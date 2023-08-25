import { MINUS, PLUS } from "../../../../../services/svg.service.js"
import SvgHandler from "../../../../_reuseable-cmps/svg-handler.jsx"

export function GuestAdult({ filterBy, handleGuestCountChange }) {

    return (
        <article className="guest-preview">
            <section className="txt-content">
                <h3>Adults</h3>
                <p>Ages 13 or above</p>
            </section>

            <section className="stepper">
                <button onClick={() => handleGuestCountChange('adults', -1)} disabled={filterBy.guests.adults === 0 || (filterBy.guests.adults === 1 && filterBy.capacity > 1)}>
                    <SvgHandler svgName={MINUS} />
                </button>
                <span>{filterBy.guests.adults === 16 ? '16+' : filterBy.guests.adults}</span>
                <button onClick={() => handleGuestCountChange('adults', 1)} disabled={filterBy.guests.adults === 16 || (filterBy.guests.adults + filterBy.guests.children === 16)}>
                    <SvgHandler svgName={PLUS} />
                </button>
            </section>
        </article>
    )
}