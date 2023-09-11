// Services
import { utilService } from "../../services/util.service.js"


export function ConfirmationMain({ orderObject }) {

    const { guestCount, checkIn, checkOut, seller } = orderObject
    const formattedTimeRange = utilService.getFormattedTimeRange(checkIn, checkOut)
    const formattedDate = new Date(utilService.getFutureTime(2, 'day')).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    })
    return (
        <section className="confirmation-main">

            <section className="dates-guests">
                <h3 className="fs22">Your trip</h3>
                <article className="dates">
                    <h4 className="fs16">Dates</h4>
                    <p className="fs16">{formattedTimeRange}</p>
                </article>
                <article className="guests">
                    <h4 className="fs16">Guests</h4>
                    <p>{guestCount} guest{guestCount !== 1 && 's'}</p>
                </article>
            </section>

            <section className="message-host">
                <article className="intro">
                    <h3 className="fs22">Required for your trip</h3>
                    <h5 className="fs16">Message the Host</h5>
                    <p>Let the Host know why you're traveling and when you'll check in.</p>
                </article>
                <section className="host-preview flex align-center">
                    <img src={seller.img} alt="host" />
                    <article className="flex column">
                        <span className="fs16 ff-circular-semibold">{seller.fullname} </span>
                        <span>joined in {seller.joined}</span>
                    </article>
                </section>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </section>

            <section className="cancellation-policy">
                <h3 className="fs22">Cancellation policy</h3>
                <p className="fs16">Cancel before {formattedDate} for a partial refund. After that, this reservation is non-refundable.</p>
            </section>

            <p className="declaration fs12 lh18">By selecting the button below, I agree to the irrelevance of the <span>Host's House Rules, Ground rules for guests, StayHub's Rebooking and Refund Policy</span>, and that StayHub can <span>charge my payment method</span>  if I'm responsible for damage.</p>
        </section>
    )
}