// Services
import { utilService } from "../../services/util.service.js"
import { STAR } from "../../services/svg.service.js"

// Components
import SvgHandler from "../_reuseable-cmps/svg-handler.jsx"


export function ConfirmationSidebar({ orderObject }) {

    const { stayDetails, orderPrice, nightsCount, nightsPrice } = orderObject
    const { reviewsCount, type, summary, rate, image } = stayDetails
    const { total, serviceFee, cleaningFee, price } = orderPrice
    return (
        <aside className="confirmation-sidebar flex">

            <section className="stay-information flex">
                <img src={image} alt="stay" />
                <section className="information">
                    <p className="stay-type fs12">{type}</p>
                    <span className="short-summary">{summary}</span>
                    <article className="confirmation-reviews flex align-center">
                        {reviewsCount > 0 && (
                            <>
                                <span><SvgHandler svgName={STAR} /></span>
                                <span>{rate}</span>
                                <span>({reviewsCount} review{reviewsCount !== 1 && 's'})</span>
                            </>
                        )}
                    </article>
                </section>
            </section>

            <section className="price-details">
                <h3 className="title fs22">Price details</h3>
                <article className="night-price flex space-between fs16">
                    <span className="underline">${utilService.addCommas(price)} x {nightsCount} night{nightsCount !== 1 && 's'}</span>
                    <span>${utilService.addCommas(nightsPrice)}</span>
                </article>
                <article className="cleaning-fee flex space-between fs16">
                    <span className="underline">Cleaning fee</span>
                    <span>${utilService.addCommas(cleaningFee)}</span>
                </article>
                <article className="service-fee flex space-between fs16">
                    <span className="underline">StayHub service fee</span>
                    <span>${utilService.addCommas(serviceFee)}</span>
                </article>
                <article className="total-price flex space-between fs16 ff-circular-semibold">
                    <span>Total (USD)</span>
                    <span>${utilService.addCommas(total)}</span>
                </article>
            </section>
        </aside>
    )
}