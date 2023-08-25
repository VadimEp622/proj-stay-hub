import { MINUS, PLUS } from "../../../../../services/svg.service.js"
import SvgHandler from "../../../../_reuseable-cmps/svg-handler.jsx"

export function GuestChild({ filterBy, handleGuestCountChange }) {

    return (
        <article className="guest-preview">
            <section className="txt-content">
                <h3>Children</h3>
                <p>Ages 2-12</p>
            </section>

            <section className="stepper">
                <button onClick={() => handleGuestCountChange('children', -1)} disabled={filterBy.guests.children === 0}>
                    <SvgHandler svgName={MINUS} />
                </button>
                <span>{filterBy.guests.children}</span>
                <button onClick={() => handleGuestCountChange('children', 1)} disabled={filterBy.guests.children === 15 || (filterBy.guests.adults + filterBy.guests.children === 16)}>
                    <SvgHandler svgName={PLUS} />
                </button>
            </section>
        </article>
    )
}