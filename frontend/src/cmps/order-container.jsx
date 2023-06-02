import { reviewService } from "../services/review.service"
import { stayService } from "../services/stay.service"
import { STAR } from "../services/svg.service"
import { utilService } from "../services/util.service"
// import DatePicker from "./date-picker"
import SvgHandler from "./svg_handler"

export function OrderContainer({ stay }) {

    const nightsPrice = stayService.calculateHowManyNights(stay) * stay.price
    const cleaningFee = utilService.getRandomIntInclusive(100, 500)
    const serviceFee = utilService.getRandomIntInclusive(100, 500)
    const totalPrice = nightsPrice + cleaningFee + serviceFee
    const nightsCount = stayService.calculateHowManyNights(stay)
    function _createButtonDivContainer() {
        const divElements = []
        for (let i = 0; i < 100; i++) {
            divElements.push(<div className="cell"></div>)
        }
        return divElements
    }

    return (
        <section className="order-container flex">
            {/* <DatePicker stay={stay} /> */}
            <div className="order-container-header flex space-between align-center">
                <h2><span>${stay.price.toLocaleString()}</span> night</h2>
                <div className="order-rate flex">
                    <span className="review-rate"> <SvgHandler svgName={STAR} />{reviewService.getAverageReview(stay)}</span>
                    <span>·</span>
                    <span className="review-count">{stay.reviews.length} reviews</span>
                </div>
            </div>
            <div className="date-container">
                <div className="check-in">
                    <p>CHECK-IN</p>
                    <p>Add Date</p>
                </div>
            </div>
            <div className="date-container">
                <div className="check-out">
                    <p>CHECKOUT</p>
                    <p>Add Date</p>
                </div>
            </div>
            <div className="btn-container">
                {_createButtonDivContainer()}
                <div className="content">
                    <button className="action-btn">
                        <span>Reserve</span>
                    </button>
                </div>
                <p>You won't be charged yet</p>
                <div className="price-container">
                    <p>${stay.price.toLocaleString()} x {nightsCount} nights</p>
                    <p>${nightsPrice}</p>
                </div>
                <div className="price-container">
                    <p>Cleaning fee</p>
                    <span>{cleaningFee}</span>
                </div>
                <div className="price-container">
                    <p>StayHub service fee</p>
                    <span>{serviceFee}</span>
                </div>
                <hr />
                <div className="total-price-container">
                    <h5>Total</h5>
                    <h5>{totalPrice}</h5>
                </div>
            </div>
        </section>
    )
}