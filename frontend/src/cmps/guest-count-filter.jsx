import { useState } from "react"

export function GuestCountFilter() {
    const [guestCounts, setGuestCounts] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    })

    function handleGuestCountChange(type, value) {
        setGuestCounts((prevGuestCounts) => ({ ...prevGuestCounts, [type]: prevGuestCounts[type] + value }))
    }
    return (
        <section className="guest-count-filter">
            <article className="card">
                <section>
                    <h3>Adults</h3>
                    <p>Ages 13 or above</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count" onClick={() => handleGuestCountChange('adults', -1)} disabled={guestCounts.adults === 0}>-</button>
                    <span>{guestCounts.adults}</span>
                    <button className="custom-btn-guest-count" onClick={() => handleGuestCountChange('adults', 1)}>+</button>
                </section>
            </article>

            <article className="card">
                <section>
                    <h3>Children</h3>
                    <p>Ages 2–12</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count" onClick={() => handleGuestCountChange('children', -1)} disabled={guestCounts.children === 0}>-</button>
                    <span>{guestCounts.children}</span>
                    <button className="custom-btn-guest-count" onClick={() => handleGuestCountChange('children', 1)}>+</button>
                </section>
            </article>

            <article className="card">
                <section>
                    <h3>Infants</h3>
                    <p>Under 2</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count" onClick={() => handleGuestCountChange('infants', -1)} disabled={guestCounts.infants === 0}>-</button>
                    <span>{guestCounts.infants}</span>
                    <button className="custom-btn-guest-count" onClick={() => handleGuestCountChange('infants', 1)}>+</button>
                </section>
            </article>

            <article className="card">
                <section>
                    <h3>Pets</h3>
                    <p>Bringing a service animal?</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count" onClick={() => handleGuestCountChange('pets', -1)} disabled={guestCounts.pets === 0}>-</button>
                    <span>{guestCounts.pets}</span>
                    <button className="custom-btn-guest-count" onClick={() => handleGuestCountChange('pets', 1)}>+</button>
                </section>
            </article>
        </section>
    )
}