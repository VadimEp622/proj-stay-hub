import { utilService } from "../../../../services/util.service.js"



// TODO: improve font-size for different screen widths

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

            <article className="reservation-info">

                <section className="reservation-header">
                    <h2>{city}</h2>
                    <h5>Entire rental unit hosted by {fullname}</h5>
                </section>

                <section className="reservation-date-destination-status flex space-between">
                    <article className="reservation-date flex column align-center">
                        <span>{timeRange}</span>
                    </article>
                    <article className="reservation-destination flex column align-center">
                        <h4 className="fs16">{location}</h4>
                        <span className="fs16">{city}</span>
                        <span className="fs12">{country}</span>
                    </article>
                    <article className="reservation-confirmation flex column align-center">
                        <span className="ff-circular-semibold">Status:</span>
                        <h4 className={`status ${status.toLowerCase()} fs20`}>{status}</h4>
                    </article>
                </section>

            </article>

            <article className="reservation-img flex">
                <img src={stayImage} alt="stay" />
            </article>

        </section>
    )
}