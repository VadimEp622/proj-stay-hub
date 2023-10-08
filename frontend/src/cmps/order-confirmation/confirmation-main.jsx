// Services
import { utilService } from '../../services/util.service.js'


export function ConfirmationMain({ orderObject }) {

    const { fullname, img: sellerPicture, joined } = orderObject.seller
    const { checkIn, checkOut, guestCount } = orderObject.orderDetails

    const guestCountStr = `${guestCount} ${guestCount === 1 ? 'guest' : 'guests'}`
    const formattedTimeRange = utilService.getFormattedTimeRange(checkIn, checkOut)
    const formattedDate = new Date(utilService.getFutureTime(2, 'day')).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    })
    return (
        <section className='confirmation-main'>

            <section className='dates-guests'>
                <h3 className='fs22'>Your trip</h3>
                <section className='dates fs16'>
                    <h4>Dates</h4>
                    <p>{formattedTimeRange}</p>
                </section>
                <section className='guests fs16'>
                    <h4>Guests</h4>
                    <p>{guestCountStr}</p>
                </section>
            </section>

            <section className='message-host'>
                <section className='intro'>
                    <h3 className='fs22'>Required for your trip</h3>
                    <h5 className='fs16'>Message the Host</h5>
                    <p>Let the Host know why you're traveling and when you'll check in.</p>
                </section>

                <section className='host-preview flex align-center gap16'>
                    <section className='img-container flex'>
                        <img src={sellerPicture} alt='host' />
                    </section>
                    <section className='flex column'>
                        <span className='fs16 ff-circular-semibold'>{fullname}</span>
                        <span className='capitalize'>joined in {joined}</span>
                    </section>
                </section>

                <textarea name='' id='' cols='30' rows='10'></textarea>
            </section>

            <section className='cancellation-policy'>
                <h3 className='capitalize fs22'>cancellation policy</h3>
                <p>Cancel before {formattedDate} for a partial refund. After that, this reservation is non-refundable.</p>
            </section>

            <p className='declaration fs12 lh18'>By selecting the button below, I agree to the irrelevance of the <span className='underline'>Host's House Rules, Ground rules for guests, StayHub's Rebooking and Refund Policy</span>, and that StayHub can <span className='underline'>charge my payment method</span> if I'm responsible for damage.</p>
        </section>
    )
}