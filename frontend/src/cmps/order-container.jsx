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
import { DatePicker } from "./reuseableCmp/date-picker"
import { useClickOutside } from "../customHooks/clickOutsideModal.js"

export function OrderContainer({ stay, randomDate, hostImgUrl }) {
    // console.log('orderImg', hostImgUrl)
    // const hostImgUrlPass = hostImgUrl
    // console.log('orderImgPass', hostImgUrlPass)

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
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)

    const dateModalRef = useClickOutside(onDateModalClickOutside)
    const x = '123'
    function onDateModalClickOutside() {
        // if (!isDateModalOpen) 
        setIsDateModalOpen(false)
    }

    let guestCount = 1
    useEffect(() => {
        setOrderObject({
            buyer: {
                _id: user ? user._id : '',
                fullname: user ? user.fullname : '',
                img: user?.imgUrl,
                // joined: randomDate.split(' ')[1]
                joined: randomDate
            },
            seller: {
                fullname: stay.host.fullname,
                _id: stay.host._id,
                img: hostImgUrl,
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
            thingsToDo: {
                "Just-for-you": utilService.getRandomIntInclusive(10, 20),
                "Top-rated": utilService.getRandomIntInclusive(30, 50),
                "Sports": utilService.getRandomIntInclusive(30, 60),
                "Tours": utilService.getRandomIntInclusive(50, 120),
                "Sightseeing": utilService.getRandomIntInclusive(50, 120),
                "more": utilService.getRandomIntInclusive(300, 500),
            },
            nightsCount: nightsCount,
            nightsPrice: nightsPrice,
            status: "Pending",
            _id: utilService.makeId()
        });
    }, [])


    useEffect(() => {
        // console.log('orderObject -> order-container.jsx',orderObject)
        setOrder(orderObject)
    }, [orderObject])

    function openDateModal(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        setIsDateModalOpen(true)
    }

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
                <section className="order-data"
                // style={{ zIndex: '1' }}
                >
                    {/* <div className="size-less-order-modal-container" style={{ width: '0px', height: '0px', position: 'relative', float: 'right' }}>
                        {
                            isDateModalOpen &&
                            <section ref={dateModalRef} className="stay-details-date-modal" style={{
                                borderRadius: '32px', right: '-23px', top: '-16px', position: 'absolute',
                                backgroundColor: 'white', padding: '20px', zIndex: '1',
                                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 6px 20px'
                            }}>
                                <DatePicker />
                            </section>
                        }
                    </div> */}
                    <div className="order-date-container flex"
                    // style={{ cursor: 'pointer', position: 'relative', zIndex: '1' }}
                    // onClick={openDateModal}
                    >
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
            {/* <div className="modal-container">
                {openModal && <Test hostImgUrl={hostImgUrl}/>}
            </div> */}
            <section className='order-spacial-info flex'>
                <p><span>Lower price.</span> Your dates are ${(stay.price * 0.4).toFixed(0)} less per night compared to the average nightly rate of the last 60 days.</p>
                <div><SvgHandler svgName={RED_TAG} /></div>
            </section>
        </section>
    )
}