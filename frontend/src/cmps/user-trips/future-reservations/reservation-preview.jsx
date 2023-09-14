// Services
import { EYE } from "../../../services/svg.service.js"
import { utilService } from "../../../services/util.service.js"

// Components
import SvgHandler from "../../_reuseable-cmps/svg-handler.jsx"
import { ExploreList } from "./reservation-preview/explore-list.jsx"


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

            <ExploreList explore={explore} trip={trip}/>
        </section>
    )
}