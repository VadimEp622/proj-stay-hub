import { MINUS, PLUS } from "../../../../../services/svg.service.js"
import SvgHandler from "../../../../_reuseable-cmps/svg-handler.jsx"

export function GuestPet({ filterBy, handleGuestCountChange }) {

    return (
        <article className="guest-preview">
            <section className="txt-content">
                <h3>Pets</h3>
                <p className="pet-service underline">Bringing a service animal?</p>
            </section>

            <section className="stepper">
                <button onClick={() => handleGuestCountChange('pets', -1)} disabled={filterBy.guests.pets === 0}>
                    <SvgHandler svgName={MINUS} />
                </button>
                <span>{filterBy.guests.pets}</span>
                <button onClick={() => handleGuestCountChange('pets', 1)} disabled={filterBy.guests.pets === 5}>
                    <SvgHandler svgName={PLUS} />
                </button>
            </section>
        </article>
    )
}