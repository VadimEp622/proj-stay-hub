import { utilService } from "../../../../services/util.service.js"

export function ReservationTicket({ trip }) {

    const { city, country, address } = trip.content.stayDetails.loc
    const { checkIn, checkOut } = trip.content
    const status = trip.content.status
    const fullname = trip.content.seller.fullname
    const stayImage = trip.content.stayDetails.image

    const timeRange = utilService.getFormattedTimeRange(checkIn, checkOut)
    const location = address.substring(0, address.indexOf(','))
    return (
        <section className="reservation-container">

            <section className="reservation-info">

                <section className="reservation-header">
                    <h2>{city}</h2>
                    <h5>Entire rental unit hosted by {fullname}</h5>
                </section>

                <section className="reservation-dates flex">
                    <section className="reservation-date">{timeRange}</section>
                    <section className="reservation-destination flex">
                        <h4>{location}</h4>
                        <span>{city}</span>
                        <span className="fs10">{country}</span>
                    </section>
                    <section className="reservation-confirmation">
                        <span className="ff-circular-semibold">Status:</span>
                        <h4 className={`status ${status.toLowerCase()} fs16`}>{status}</h4>
                    </section>
                </section>

            </section>

            <article className="reservation-img">
                <img src={stayImage} alt="stay" />
            </article>

        </section>
    )
}