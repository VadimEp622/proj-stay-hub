import { reviewService } from "../services/review.service"
import { stayService } from "../services/stay.service"
import { STAR } from "../services/svg.service"
import { utilService } from "../services/util.service"
// import DatePicker from "./date-picker"
import SvgHandler from "./svg_handler"

export function OrderContainer({ stay }) {

    const checkIn = stayService.getDate(stay.checkIn)
    const checkOut = stayService.getDate(stay.checkOut)
    const nightsPrice = stayService.calculateHowManyNights(stay) * (stay.price)
    const cleaningFee = utilService.getRandomIntInclusive(100, 500)
    const serviceFee = utilService.getRandomIntInclusive(100, 500)
    const totalPrice = nightsPrice + cleaningFee + serviceFee
    const nightsCount = stayService.calculateHowManyNights(stay)
    function _createButtonDivContainer() {
        const divElements = []
        for (let i = 0; i < 100; i++) {
            divElements.push(<div className="cell" key={i}></div>)
        }
        return divElements
    }

    return (
        <section className="order-modal">
            <section className="order-modal-form flex">
            {/* <DatePicker stay={stay} /> */}
            <div className="order-container-header flex">
                <h2><span>${stay.price.toLocaleString()}</span> night</h2>
                <div className="order-rate flex">
                    <span > <SvgHandler svgName={STAR} /></span>
                    <span className="review-rate">{reviewService.getAverageReview(stay)}</span>
                    <span className="period">·</span>
                    <span className="review-count">{stay.reviews.length} reviews</span>
                </div>
            </div>
            <section className="order-data">
                <div className="date-container flex">
                    <div className="check-in flex">
                        <span>CHECK-IN</span>
                        <span>{checkIn}</span>
                    </div>
                    <div className="check-out flex">
                        <span>CHECKOUT</span>
                        <span>{checkOut}</span>
                    </div>
                </div>
                <div className="guests-container">
                    <div className="guests flex">
                        <span>GUESTS</span>
                        <span>1 guest</span>
                    </div>
                </div>
            </section>
            <div className="btn-container">
                {_createButtonDivContainer()}
                <div className="content">
                    <button className="action-btn">
                        <span>Reserve</span>
                    </button>
                </div>
            </div>
            <section className="price-container">
                <p>You won't be charged yet</p>
                <section className="flex space-between">
                    <p>${stay.price.toLocaleString()} x {nightsCount} nights</p>
                    <p>${nightsPrice.toLocaleString()}</p>
                </section>
                <section className="flex space-between">
                    <p>Cleaning fee</p>
                    <span>${cleaningFee.toLocaleString()}</span>
                </section>
                <div className="flex space-between" >
                    <p>StayHub service fee</p>
                    <span>${serviceFee.toLocaleString()}</span>
                </div>
                <hr />
                <div className="total-price-container flex space-between fs16">
                    <h5>Total</h5>
                    <h5>${totalPrice}</h5>
                </div>
            </section>
            </section>

        </section>
    )
}