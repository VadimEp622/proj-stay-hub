import { PastReservationPreview } from "./past-reservations/past-reservation-preview.jsx"

// TODO: organize demo data into array, and render using preview
export function PastReservationList({ getPastTrips }) {

    const pastTrips = getPastTrips()

    return (
        <section className="past-reservation-list flex">

            {pastTrips.length > 0
                ? pastTrips.map(trip =>
                    <PastReservationPreview key={trip._id} trip={trip} />
                )
                : <>
                    <section className="past-trip">
                        <article className="past-trip-img">
                            <img src="https://a0.muscache.com/im/pictures/bcb75add-a00d-466b-ba7d-ef2fe8d8e7e6.jpg?im_w=1200" alt="Amsterdam" />
                        </article>
                        <article className="past-trip-info">
                            <h4>Amsterdam</h4>
                            <span>hosted by Denzel</span>
                            <span>Dec 7-11, 2022</span>
                        </article>
                    </section>

                    <section className="past-trip">
                        <article className="past-trip-img">
                            <img src="https://a0.muscache.com/im/pictures/miso/Hosting-621355059288164481/original/1e01176e-da92-456e-b663-b8887483b87b.jpeg?im_w=1200" alt="Amsterdam" />
                        </article>
                        <article className="past-trip-info">
                            <h4>Zadarska županija, Croatia</h4>
                            <span>hosted by Hrvoje</span>
                            <span>Jul 19-24, 2020</span>
                        </article>
                    </section>

                    <section className="past-trip">
                        <article className="past-trip-img">
                            <img src="https://a0.muscache.com/im/pictures/95435d63-6c09-43de-a28f-f13158c32356.jpg?im_w=1200" alt="Amsterdam" />
                        </article>
                        <article className="past-trip-info">
                            <h4>Kampos, Greece</h4>
                            <span>hosted by Γεώργιος</span>
                            <span>Aug 3-12, 2017</span>
                        </article>
                    </section>
                </>
            }

        </section>
    )
}