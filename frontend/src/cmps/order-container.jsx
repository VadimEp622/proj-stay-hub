import { useSelector } from "react-redux"
import { reviewService } from "../services/review.service"
import { stayService } from "../services/stay.service"
import { STAR } from "../services/svg.service"
import { utilService } from "../services/util.service"
// import DatePicker from "./date-picker"
import SvgHandler from "./svg-handler"
import { useState } from "react"
import { OrderConfirmation } from "./order-confirmation"
import { userService } from "../services/user.service"

export function OrderContainer({ stay }) {

    const checkIn = stayService.getDate(stay.checkIn)
    const checkOut = stayService.getDate(stay.checkOut)
    const nightsCount = stayService.calculateHowManyNights(stay.checkIn, stay.checkOut)
    const nightsPrice = nightsCount * (stay.price)
    const cleaningFee = utilService.getRandomIntInclusive(100, 500)
    const serviceFee = utilService.getRandomIntInclusive(100, 500)
    const totalPrice = nightsPrice + cleaningFee + serviceFee
    const guestsObject = useSelector(storeState => storeState.userModule.guests)
    const [orderObject, setOrderObject] = useState({})
    // const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const guestsString = userService.buildGuestsString(guestsObject)
    const [openModal, setOpenModal] = useState(false)
    let guestCount = 1

    function onOpenModal() {
        setOpenModal(true)
        setOrderObject({
            // buyer: {
            //     fullname: user.fullName,
            //     _id: user.id
            // },
            seller: {
                fullname: stay.host.fullname,
                _id: stay.host._id,
                image: stay.host.img
            },
            checkIn: stay.checkIn,
            checkOut: stay.checkOut,
            orderPrice: {
                total: totalPrice,
                serviceFee: serviceFee,
                cleaningFee: cleaningFee,
                price: stay.price
            },
            guestsNumber: guestCount,
            stayDetails: {
                reviewsCount: stay.reviews.length,
                type: stay.type,
                id: stay._id,
                rate: stay.rate,
                summary: stay.summary,
                image: stay.imgUrls[0]
            },
            nightsCount: nightsCount,
            nightsPrice: nightsPrice
        })
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
                <div className="btn-container" onClick={() => onOpenModal()}>
                    {utilService.createDivsForButtonContainer()}
                    <div className="content">
                        <button className="action-btn" >
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
            <div className="modal-container">            {openModal && <OrderConfirmation setOpenModal={setOpenModal} orderObject={orderObject} />}
            </div>
        </section>
    )
}