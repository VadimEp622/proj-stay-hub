import { utilService } from "../../../services/util.service.js"

export function PastReservationPreview({ trip }) {

    const stayImage = trip.content.stayDetails.image
    const address = trip.content.stayDetails.loc.address
    const host = trip.content.seller.fullname
    const timeRange = utilService.getFormattedTimeRange(trip.content.checkIn, trip.content.checkOut)
    return (
        <section className="past-trip">
            <article className="past-trip-img">
                <img src={stayImage} alt="stay" />
            </article>
            <article className="past-trip-info">
                <h4>{address}</h4>
                <span>hosted by {host}</span>
                <span>{timeRange}</span>
            </article>
        </section>
    )
}