// Node modules
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// Services
import { reviewService } from "../../../services/review.service.js"
import { stayService } from "../../../services/stay.service.js"
import { STAR, RED_TAG } from "../../../services/svg.service.js"
import { utilService } from "../../../services/util.service.js"
import { userService } from "../../../services/user.service.js"

// Store
import { setOrder } from "../../../store/user.actions.js"
import { setModal } from "../../../store/stay.actions.js"

// Custom Hooks
import { useClickOutside } from "../../../customHooks/clickOutsideModal.js"

// Components
// import DatePicker from "./date-picker.jsx"
import { OrderConfirmation } from "../../../pages/order-confirmation.jsx"
import { LoginSignup } from "../../login-signup.jsx"
import { DatePicker } from "../../_reuseable-cmps/date-picker.jsx"
import SvgHandler from "../../svg-handler.jsx"
import { AirbnbButton } from "../../_reuseable-cmps/airbnb-button.jsx"


// TODO: figure out what the hell's going on here
// TODO-priority-high: make sure if not logged in, cant order!, open login/register modal instead! 


export function OrderSidebar({ stay, randomDate, hostImgUrl }) {
    // console.log('orderImg', hostImgUrl)
    // const hostImgUrlPass = hostImgUrl
    // console.log('orderImgPass', hostImgUrlPass)

    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const guestsObject = useSelector(storeState => storeState.userModule.guests)

    const [orderObject, setOrderObject] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)

    const dateModalRef = useClickOutside(onDateModalClickOutside)

    const navigate = useNavigate()


    const checkIn = stayService.getDate(stay.availableDates[0].from)
    const checkOut = stayService.getDate(stay.availableDates[0].to)
    const nightsCount = stayService.calculateHowManyNights(stay.availableDates[0].from, stay.availableDates[0].to)
    const nightsPrice = nightsCount * (stay.price)
    const cleaningFee = utilService.getRandomIntInclusive(100, 500)
    const serviceFee = utilService.getRandomIntInclusive(100, 500)
    const totalPrice = nightsPrice + cleaningFee + serviceFee
    const guestsString = userService.buildGuestsString(guestsObject)
    let guestCount = 1



    useEffect(() => {
        createStayObject()
    }, [])

    useEffect(() => {
        updateStayObjectBuyer()
    }, [loggedInUser])


    useEffect(() => {
        if (Object.keys(orderObject).length !== 0) setOrder(orderObject)
    }, [orderObject])


    function onDateModalClickOutside() {
        // if (!isDateModalOpen) 
        setIsDateModalOpen(false)
    }

    function createStayObject() {
        const stayObject = {
            buyer: {
                _id: loggedInUser ? loggedInUser._id : '',
                fullname: loggedInUser ? loggedInUser.fullname : '',
                img: loggedInUser?.imgUrl,
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
        }

        setOrderObject(stayObject)
    }

    function updateStayObjectBuyer() {
        if (loggedInUser) {
            const { _id, fullname, img } = loggedInUser
            const buyer = { _id, fullname, img, randomDate:randomDate }
            setOrderObject((prevOrder) => ({ ...prevOrder, buyer }))
        } else {
            setOrderObject((prevOrder) => ({ ...prevOrder, buyer: {} }))
        }
    }

    function openDateModal(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        setIsDateModalOpen(true)
    }


    function onClickButton(ev) {
        console.log('ev', ev)
        ev.preventDefault()
        ev.stopPropagation()
        if (!loggedInUser) {
            console.log("NOT logged in click")
            setModal("logIn")
        }
        else {
            console.log("logged in click")
            navigate(`/stay/book/${stay._id}`)
        }
    }

    return (
        <section className="order-sidebar">
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
                <AirbnbButton text={'Reserve'} onClickButton={(ev) => onClickButton(ev)} />
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