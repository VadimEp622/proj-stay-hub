import { useSelector } from "react-redux"
import { reviewService } from "../services/review.service"
import { stayService } from "../services/stay.service"
import { STAR } from "../services/svg.service"
import { utilService } from "../services/util.service"
// import DatePicker from "./date-picker"
import SvgHandler from "./svg-handler"

export function OrderContainer({ stay }) {

    const checkIn = stayService.getDate(stay.checkIn)
    const checkOut = stayService.getDate(stay.checkOut)
    const nightsCount = stayService.calculateHowManyNights(stay.checkIn, stay.checkOut)
    const nightsPrice = nightsCount * (stay.price)
    const cleaningFee = utilService.getRandomIntInclusive(100, 500)
    const serviceFee = utilService.getRandomIntInclusive(100, 500)
    const totalPrice = nightsPrice + cleaningFee + serviceFee
    const guestsObject = useSelector(storeState => storeState.stayModule.guests)
    function _createButtonDivContainer() {
        const divElements = []
        for (let i = 0; i < 100; i++) {
            divElements.push(<div className="cell" key={i}></div>)
        }
        return divElements
    }
    let guestsString = ''
    if (Object.keys(guestsObject).length === 0) {
        guestsString = '1 guest'
    } else {
        const { adults, children, infants, pets } = guestsObject
        const guestCount = adults + children

        guestsString = `${guestCount} guest${guestCount !== 1 ? 's' : ''}`
        if (infants > 0) {
            guestsString += `, ${infants} infant${infants !== 1 ? 's' : ''}`
        }
        if (pets > 0) {
            guestsString += `, ${pets} pet${pets !== 1 ? 's' : ''}`
        }
    }


    return (
        <section className="order-modal">
            <section className="order-modal-form flex">
                {/* <DatePicker stay={stay} /> */}
                <div className="order-container-header flex align-baseline">
                    <h2><span>${stay.price.toLocaleString()}</span> night</h2>
                    <div className="order-rate flex align-baseline">
                        <span > <SvgHandler svgName={STAR} /></span>
                        <span className="review-rate">{reviewService.getAverageReview(stay)}</span>
                        <span className="period">·</span>
                        <span className="review-count">{stay.reviews.length} reviews</span>
                    </div>
                </div>
                <section className="order-data">
                    <div className="order-date-container flex">
                        <div className="check-in flex">
                            <span className="uppertext">check-in</span>
                            <span>{checkIn}</span>
                        </div>
                        <div className="check-out flex">
                            <span className="uppertext">checkout</span>
                            <span>{checkOut}</span>
                        </div>
                    </div>
                    <div className="guests-container">
                        <div className="guests flex">
                            <span className="uppertext">guests</span>
                            <span>{guestsString}</span>
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
                        <p className="underline">${stay.price.toLocaleString()} x {nightsCount} nights</p>
                        <p>${nightsPrice.toLocaleString()}</p>
                    </section>
                    <section className="flex space-between">
                        <p className="underline">Cleaning fee</p>
                        <span>${cleaningFee.toLocaleString()}</span>
                    </section>
                    <div className="flex space-between" >
                        <p className="underline">StayHub service fee</p>
                        <span>${serviceFee.toLocaleString()}</span>
                    </div>
                    <hr />
                    <div className="total-price-container flex space-between fs16">
                        <h5>Total</h5>
                        <h5>${totalPrice.toLocaleString()}</h5>
                    </div>
                </section>
            </section>

        </section>
    )
}