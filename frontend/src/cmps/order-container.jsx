import { reviewService } from "../services/review.service"
import { STAR } from "../services/svg.service"
import { utilService } from "../services/util.service"
import DatePicker from "./date-picker"
import SvgHandler from "./svg_handler"

export function OrderContainer({ stay }) {

    const nightsPrice = calculateHowManyNights() * stay.price
    const cleaningFee = utilService.getRandomIntInclusive(100, 500)
    const serviceFee = utilService.getRandomIntInclusive(100, 500)
    const totalPrice = nightsPrice + cleaningFee + serviceFee
    const nightsCount = calculateHowManyNights()
    function _createButtonDivContainer() {
        const divElements = []
        for (let i = 0; i < 100; i++) {
            divElements.push(<div className="cell"></div>)
        }
        return divElements
    }


    function calculateHowManyNights() {
        const checkInDate = new Date(stay.checkIn * 1000)
        const checkOutDate = new Date(stay.checkOut * 1000)
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime()
        const nightsCount = Math.ceil(timeDiff / (1000 * 3600 * 24))
        return nightsCount
    }

    return (
        <section className="order-container">
            <DatePicker stay={stay} />
            <header><span>${stay.price.toLocaleString()}</span> night
                <p className="review-rate"><SvgHandler svgName={STAR} /><span>{reviewService.getAverageReview(stay)}</span></p>
                <span>·{stay.reviews.length} reviews</span>
            </header>
            <div className="input-container">
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