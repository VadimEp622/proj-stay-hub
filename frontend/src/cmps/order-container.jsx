import { useSelector } from "react-redux"
import { reviewService } from "../services/review.service"
import { stayService } from "../services/stay.service"
import { STAR, RED_TAG } from "../services/svg.service"
import { utilService } from "../services/util.service"
// import DatePicker from "./date-picker"
import SvgHandler from "./svg-handler"
import { useEffect, useState } from "react"
import { OrderConfirmation } from "../pages/order-confirmation"
import { userService } from "../services/user.service"
import { setOrder } from "../store/user.actions"
import { Link } from "react-router-dom"
import { AirbnbButton } from "./reuseableCmp/airbnb-button"

export function OrderContainer({ stay, randomDate }) {

    const checkIn = stayService.getDate(stay.availableDates[0].from)
    const checkOut = stayService.getDate(stay.availableDates[0].to)
    const nightsCount = stayService.calculateHowManyNights(stay.availableDates[0].from, stay.availableDates[0].to)
    const nightsPrice = nightsCount * (stay.price)
    const cleaningFee = utilService.getRandomIntInclusive(100, 500)
    const serviceFee = utilService.getRandomIntInclusive(100, 500)
    const totalPrice = nightsPrice + cleaningFee + serviceFee
    const guestsObject = useSelector(storeState => storeState.userModule.guests)
    const [orderObject, setOrderObject] = useState({})
    const user = useSelector(storeState => storeState.userModule.user)
    const guestsString = userService.buildGuestsString(guestsObject)
    const [openModal, setOpenModal] = useState(false)
    let guestCount = 1
    useEffect(() => {
        setOrderObject({
            buyer: {
                _id: user ? user._id : '',
                name: user ? user.fullname : ''
            },
            seller: {
                fullname: stay.host.fullname,
                _id: stay.host._id,
                image: stay.host.img,
                joined: randomDate.split(' ')[1]
            },
            checkIn: stay.availableDates[0].from,
            checkOut: stay.availableDates[0].to,
            orderPrice: {
                total: totalPrice,
                serviceFee: serviceFee,
                cleaningFee: cleaningFee,
                price: stay.price
            },
            guestsNumber: guestCount,
            stayDetails: {
                reviewsCount: stay.reviews.length,
                loc: stay.loc,
                type: stay.type,
                id: stay._id,
                rate: stay.reviews.rate,
                summary: stay.summary,
                image: stay.imgUrls[0]
            },
            nightsCount: nightsCount,
            nightsPrice: nightsPrice
        });


    }, [])

    useEffect(() => {
        console.log(orderObject)
        setOrder(orderObject)
    }, [orderObject])


    return (
        <section className="order-modal">
            <section className="order-modal-form flex">
                {/* <DatePicker stay={stay} /> */}
                <div className="order-container-header flex align-baseline">
                    <h2><span>${utilService.addCommas(stay.price)}</span> night</h2>
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
                <Link to={`/stay/book/${stay._id}`}>
                    <AirbnbButton text={'Reserve'} />
                </Link>
                <section className="price-container">
                    <p>You won't be charged yet</p>
                    <section className="flex space-between">
                        <p className="underline">${stay.price.toLocaleString()} x {nightsCount} nights</p>
                        <p>${utilService.addCommas(nightsPrice)}</p>
                    </section>
                    <section className="flex space-between">
                        <p className="underline">Cleaning fee</p>
                        <span>${utilService.addCommas(cleaningFee)}</span>
                    </section>
                    <div className="flex space-between" >
                        <p className="underline">StayHub service fee</p>
                        <span>${serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="total-price-container flex space-between fs16">
                        <h5>Total</h5>
                        <h5>${utilService.addCommas(totalPrice)}</h5>
                    </div>
                </section>
            </section>
            <div className="modal-container">{openModal && <OrderConfirmation setOpenModal={setOpenModal} orderObject={orderObject} />}
            </div>
            <section className='order-spacial-info flex'>
                <p><span>Lower price.</span> Your dates are ${(stay.price * 0.4).toFixed(0)} less per night compared to the average nightly rate of the last 60 days.</p>
                <div><SvgHandler svgName={RED_TAG} /></div>
            </section>
        </section>
    )
}