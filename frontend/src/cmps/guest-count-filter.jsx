import { useState } from "react"
import { setGuests } from "../store/user.actions"

export function GuestCountFilter({ filterBy, handleGuestCountChange }) {

    return (
        <section className="guest-count-filter">
            <article className="card">
                <section>
                    <h3>Adults</h3>
                    <p>Ages 13 or above</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('adults', -1)} disabled={filterBy.guests.adults === 0 || filterBy.guests.adults === 1 && filterBy.capacity > 1}>-</button>
                    <span>{filterBy.guests.adults === 16 ? '16+' : filterBy.guests.adults}</span>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('adults', 1)} disabled={filterBy.guests.adults === 16 || (filterBy.guests.adults + filterBy.guests.children === 16)}>+</button>
                </section>
            </article>

            <article className="card">
                <section>
                    <h3>Children</h3>
                    <p>Ages 2-12</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('children', -1)} disabled={filterBy.guests.children === 0}>-</button>
                    <span>{filterBy.guests.children}</span>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('children', 1)} disabled={filterBy.guests.children === 15 || (filterBy.guests.adults + filterBy.guests.children === 16)}>+</button>
                </section>
            </article>

            <article className="card">
                <section>
                    <h3>Infants</h3>
                    <p>Under 2</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('infants', -1)} disabled={filterBy.guests.infants === 0}>-</button>
                    <span>{filterBy.guests.infants}</span>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('infants', 1)} disabled={filterBy.guests.infants === 5}>+</button>
                </section>
            </article>

            <article className="card">
                <section>
                    <h3>Pets</h3>
                    <p className="pet-service underline">Bringing a service animal?</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('pets', -1)} disabled={filterBy.guests.pets === 0}>-</button>
                    <span>{filterBy.guests.pets}</span>
                    <button className="custom-btn-guest-count" type="button" onClick={() => handleGuestCountChange('pets', 1)} disabled={filterBy.guests.pets === 5}>+</button>
                </section>
            </article>
        </section>
    )
}