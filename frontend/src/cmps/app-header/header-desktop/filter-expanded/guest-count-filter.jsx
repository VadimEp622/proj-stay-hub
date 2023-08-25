import { GuestAdult } from "./guest-count-filter/guest-adult.jsx"
import { GuestChild } from "./guest-count-filter/guest-child.jsx"
import { GuestInfant } from "./guest-count-filter/guest-infant.jsx"
import { GuestPet } from "./guest-count-filter/guest-pet.jsx"

export function GuestCountFilter({ filterBy, handleGuestCountChange }) {

    return (
        <section className="guest-count-filter">
            <GuestAdult filterBy={filterBy} handleGuestCountChange={handleGuestCountChange} />
            <GuestChild filterBy={filterBy} handleGuestCountChange={handleGuestCountChange} />
            <GuestInfant filterBy={filterBy} handleGuestCountChange={handleGuestCountChange} />
            <GuestPet filterBy={filterBy} handleGuestCountChange={handleGuestCountChange} />
        </section>
    )
}