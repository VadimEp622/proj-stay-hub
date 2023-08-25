import { MINUS, PLUS } from "../../../../../services/svg.service.js"
import SvgHandler from "../../../../_reuseable-cmps/svg-handler.jsx"

export function GuestInfant({ filterBy, handleGuestCountChange }) {

    return (
        <article className="guest-preview">
            <section className="txt-content">
                <h3>Infants</h3>
                <p>Under 2</p>
            </section>

            <section className="stepper">
                <button onClick={() => handleGuestCountChange('infants', -1)} disabled={filterBy.guests.infants === 0}>
                    <SvgHandler svgName={MINUS} />
                </button>
                <span>{filterBy.guests.infants}</span>
                <button onClick={() => handleGuestCountChange('infants', 1)} disabled={filterBy.guests.infants === 5}>
                    <SvgHandler svgName={PLUS} />
                </button>
            </section>
        </article>
    )
}