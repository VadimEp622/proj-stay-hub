import { userService } from "../../../../services/user.service.js"

export function DatesAndGuests({ checkIn, checkOut, guests }) {

    const guestsString = userService.buildGuestsString(guests)
    return (
        <section className="dates-and-guests">
            <section className="dates-container">

                <div className="dates-container-border"></div>
                <section className="dates flex">

                    <article className="check-in">
                        <span className="fs10 lh12 ff-circular-bold">check-in</span>
                        <span className="fs14 lh18">{checkIn}</span>
                    </article>

                    <article className="check-out">
                        <span className="fs10 lh12 ff-circular-bold">checkout</span>
                        <span className="fs14 lh18">{checkOut}</span>
                    </article>
                </section>

            </section>
            <section className="guests-container">

                <div className="guests-container-border"></div>
                <section className="guests">

                    <article className="guest-block">
                        <span className="fs10 lh12 ff-circular-bold">guests</span>
                        <span className="fs14 lh18">{guestsString}</span>
                    </article>

                </section>

            </section>
        </section>
    )
}