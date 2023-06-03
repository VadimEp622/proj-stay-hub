import { useState } from "react"
import { setGuests } from "../store/user.actions"

export function GuestCountFilter({ setFilterBy }) {
    const [guestsCount, setGuestsCount] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    })

    function handleGuestCountChange(type, value) {
        setGuestsCount((prevGuestCounts) => ({ ...prevGuestCounts, [type]: prevGuestCounts[type] + value }))
        const capacityTotal = guestsCount.adults + guestsCount.children
        setFilterBy((prevFilter) => ({ ...prevFilter, capacity: capacityTotal, guests: guestsCount }))
    }

    return (
        <section className="guest-count-filter">
            <article className="card">
                <section>
                    <h3>Adults</h3>
                    <p>Ages 13 or above</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('adults', -1)} disabled={guestsCount.adults === 0}>-</button>
                    <span>{guestsCount.adults === 16 ? '16+' : guestsCount.adults}</span>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('adults', 1)} disabled={guestsCount.adults === 16 || (guestsCount.adults + guestsCount.children === 16)}>+</button>
                </section>
            </article>

            <article className="card">
                <section>
                    <h3>Children</h3>
                    <p>Ages 2–12</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('children', -1)} disabled={guestsCount.children === 0}>-</button>
                    <span>{guestsCount.children}</span>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('children', 1)} disabled={guestsCount.children === 15 || (guestsCount.adults + guestsCount.children === 16)}>+</button>
                </section>
            </article>

            <article className="card">
                <section>
                    <h3>Infants</h3>
                    <p>Under 2</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('infants', -1)} disabled={guestsCount.infants === 0}>-</button>
                    <span>{guestsCount.infants}</span>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('infants', 1)} disabled={guestsCount.infants === 5}>+</button>
                </section>
            </article>

            <article className="card">
                <section>
                    <h3>Pets</h3>
                    <p className="pet-service underline">Bringing a service animal?</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('pets', -1)} disabled={guestsCount.pets === 0}>-</button>
                    <span>{guestsCount.pets}</span>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('pets', 1)} disabled={guestsCount.pets === 5}>+</button>
                </section>
            </article>
        </section>
    )
}