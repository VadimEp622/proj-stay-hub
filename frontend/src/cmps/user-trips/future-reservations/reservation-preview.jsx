// Services
import { EYE } from "../../../services/svg.service.js"
import { utilService } from "../../../services/util.service.js"

// Components
import SvgHandler from "../../_reuseable-cmps/svg-handler.jsx"


export function ReservationPreview({ trip, explore }) {

    const locationSubstring = trip.content.stayDetails.loc.address.substring(0, trip.content.stayDetails.loc.address.indexOf(','))
    return (
        <section className="upcoming-reservation">

            <section className="reservation-container">

                <section className="reservation-info">

                    <section className="reservation-header">
                        <h2> {trip.content.stayDetails.loc.city}</h2>
                        <h5> Entire rental unit hosted by {trip.content.seller.fullname}</h5>
                    </section>

                    <section className="reservation-dates flex">

                        <section className="reservation-date">
                            {utilService.getFormattedTimeRange(trip.content.checkIn, trip.content.checkOut)}
                        </section>

                        <section className="reservation-destination flex">
                            <h4>{locationSubstring}</h4>
                            <span>{trip.content.stayDetails.loc.city}</span>
                            <span className="fs10">{trip.content.stayDetails.loc.country}</span>
                        </section>

                        <section className="reservation-confirmation">
                            <span className="ff-circular-semibold">Status:</span>
                            <h4 className={`status ${trip.content.status.toLowerCase()} fs16`}>
                                {trip.content.status}
                            </h4>
                        </section>
                    </section>

                </section>

                <article className="reservation-img">
                    <img src={trip.content.stayDetails.image} alt="stay" />
                </article>

            </section>

            <section className="explore-things-to-do">

                <h5 className="explore-title fs14">Explore things to do near {trip.content.stayDetails.loc.city}</h5>

                <section className="things-to-do">

                    <section className="to-do">
                        <img src={explore.justForYou[Math.floor(Math.random() * explore.sightseeing.length)]} alt="to-do" />
                        <article className='todo-info'>
                            <h4>Just for you</h4>
                            <span>{trip.content.thingsToDo['Just-for-you']} experiences</span>
                        </article>
                    </section>

                    <section className="to-do">
                        <img src={explore.topRated[Math.floor(Math.random() * explore.sightseeing.length)]} alt="top rated" />
                        <article className='todo-info'>
                            <h4>Top-rated</h4>
                            <span>{trip.content.thingsToDo['Top-rated']} experiences</span>
                        </article>
                    </section>

                    <section className="to-do">
                        <img src={explore.sports[Math.floor(Math.random() * explore.sightseeing.length)]} alt="sports" />
                        <article className='todo-info'>
                            <h4>Sports</h4>
                            <span>{trip.content.thingsToDo['Sports']} experiences</span>
                        </article>
                    </section>

                    <section className="to-do">
                        <img src={explore.tours[Math.floor(Math.random() * explore.sightseeing.length)]} alt="tours" />
                        <article className='todo-info'>
                            <h4>Tours</h4>
                            <span>{trip.content.thingsToDo['Tours']} experiences</span>
                        </article>
                    </section>

                    <section className="to-do">
                        <img src={explore.sightseeing[Math.floor(Math.random() * explore.sightseeing.length)]} alt="sightseeing" />
                        <article className='todo-info'>
                            <h4>Sightseeing</h4>
                            <span>{trip.content.thingsToDo['Sightseeing']} experiences</span>
                        </article>
                    </section>

                    <section className="to-do">
                        <article className="show-more">
                            <SvgHandler svgName={EYE} />
                        </article>
                        <article className='todo-info'>
                            <h4>Show more</h4>
                            <span>{trip.content.thingsToDo['more']} experiences</span>
                        </article>
                    </section>

                </section>

            </section>

        </section>
    )
}