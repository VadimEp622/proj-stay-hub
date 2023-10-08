import { utilService } from '../../services/util.service.js'
import { STAR } from '../../services/svg.service.js'
import SvgHandler from '../_reuseable-cmps/svg-handler.jsx'


export function ConfirmationSidebar({ orderObject }) {

    const { stayDetails, orderPrice, orderDetails } = orderObject

    const { reviewsCount, type, summary, rate, image } = stayDetails
    const { nightsCount, singleNightPrice } = orderDetails
    const { total, serviceFee, cleaningFee, price } = orderPrice

    const singleNightPriceStr = utilService.addCommas(singleNightPrice)
    const priceStr = utilService.addCommas(price)
    const cleaningFeeStr = utilService.addCommas(cleaningFee)
    const serviceFeeStr = utilService.addCommas(serviceFee)
    const totalStr = utilService.addCommas(total)

    const nightsCountStr = `${nightsCount} ${nightsCount === 1 ? 'night' : 'nights'}`
    const reviewsCountStr = `${reviewsCount} ${reviewsCount === 1 ? 'review' : 'reviews'}`
    return (
        <aside className='confirmation-sidebar flex column'>

            <section className='stay-information'>
                <section className='img-container flex'>
                    <img src={image} alt='stay' />
                </section>
                <section className='information'>
                    <p className='stay-type fs12'>{type}</p>
                    <span className='short-summary lh24'>{summary}</span>
                    <article className='confirmation-reviews fs12 flex align-center flex-nowrap'>
                        {reviewsCount > 0 && (
                            <>
                                <span><SvgHandler svgName={STAR} /></span>
                                <span>{rate}</span>
                                <span className='white-space-nowrap'>{reviewsCountStr}</span>
                            </>
                        )}
                    </article>
                </section>
            </section>

            <section className='price-details fs16'>
                <h3 className='title fs22'>Price details</h3>
                <article className='night-price flex space-between gap16'>
                    <span className='underline'>${singleNightPriceStr} x {nightsCountStr}</span>
                    <span>${priceStr}</span>
                </article>
                <article className='cleaning-fee flex space-between gap16'>
                    <span className='underline'>Cleaning fee</span>
                    <span>${cleaningFeeStr}</span>
                </article>
                <article className='service-fee flex space-between gap16'>
                    <span className='underline'>StayHub service fee</span>
                    <span>${serviceFeeStr}</span>
                </article>
                <article className='total-price flex space-between gap16 ff-circular-semibold'>
                    <span>Total (USD)</span>
                    <span>${totalStr}</span>
                </article>
            </section>
        </aside>
    )
}