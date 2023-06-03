export function GuestCountFilter() {

    return (
        <section className="guest-count-filter">
            <article className="card">
                <section>
                    <h3>Adults</h3>
                    <p>Ages 13 or above</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count">-</button>
                    <span>0</span>
                    <button className="custom-btn-guest-count">+</button>
                </section>
            </article>

            <article className="card">
                <section>
                    <h3>Children</h3>
                    <p>Ages 2–12</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count">-</button>
                    <span>0</span>
                    <button className="custom-btn-guest-count">+</button>
                </section>
            </article>

            <article className="card">
                <section>
                    <h3>Infants</h3>
                    <p>Under 2</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count">-</button>
                    <span>0</span>
                    <button className="custom-btn-guest-count">+</button>
                </section>
            </article>

            <article className="card">
                <section>
                    <h3>Pets</h3>
                    <p>Bringing a service animal?</p>
                </section>
                <section>
                    <button className="custom-btn-guest-count">-</button>
                    <span>0</span>
                    <button className="custom-btn-guest-count">+</button>
                </section>
            </article>
        </section>
    )
}