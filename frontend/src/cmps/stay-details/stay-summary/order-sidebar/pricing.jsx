import { utilService } from "../../../../services/util.service.js"

export function Pricing({ orderDetails }) {

    const { price, nightsCount, serviceFee, cleaningFee } = orderDetails
    const totalPrice = (price * nightsCount) + serviceFee + cleaningFee
    return (
        <section className="pricing">

            <section className="individual-fees">
                <article className="flex space-between">
                    <span className="fs16 lh20 underline">${price.toLocaleString()} x {nightsCount} nights</span>
                    <span className="fs16 lh20">${price * nightsCount}</span>
                </article>
                <article className="flex space-between">
                    <span className="fs16 lh20 underline">Cleaning fee</span>
                    <span className="fs16 lh20">${utilService.addCommas(cleaningFee)}</span>
                </article>
                <article className="flex space-between" >
                    <span className="fs16 lh20 underline">StayHub service fee</span>
                    <span className="fs16 lh20">${serviceFee.toLocaleString()}</span>
                </article>
            </section>

            <section className="total">
                <article className="flex space-between ff-circular-semibold">
                    <span className="fs16 lh20">Total</span>
                    <span className="fs16 lh20">${utilService.addCommas(totalPrice)}</span>
                </article>
            </section>
        </section>
    )
}