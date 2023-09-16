import { utilService } from "../../../services/util.service.js"

export function PastReservationPreview({ trip }) {

    const stayImage = trip.content.stayDetails.image
    const address = trip.content.stayDetails.loc.address
    const host = trip.content.seller.fullname
    const timeRange = utilService.getFormattedTimeRange(trip.content.checkIn, trip.content.checkOut)
    return (
        <section className="past-trip flex">
            <article className="past-trip-img">
                <img src={stayImage} alt="stay" />
            </article>
            <article className="past-trip-info flex column space-evenly">
                <h4 className="fs14 lh20">{address}</h4>
                <span>Hosted by {host}</span>
                <span>{timeRange}</span>
            </article>
        </section>
    )
}