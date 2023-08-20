// Node modules
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { startOfDay } from 'date-fns'

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
import useStayDates from "../../../customHooks/useStayDates.js"
import useStayGuests from "../../../customHooks/useStayGuests.js"

// Components
import SvgHandler from "../../svg-handler.jsx"
import { ButtonMain } from "../../_reuseable-cmps/button-main.jsx"
import { CostAndReviewScore } from "./order-sidebar/cost-and-review-score.jsx"
import { DatesAndGuests } from "./order-sidebar/dates-and-guests.jsx"
import { Pricing } from "./order-sidebar/pricing.jsx"
import { SpecialInfo } from "./order-sidebar/special-info.jsx"


// TODO: organize this cmp.
// TODO: seriously consider if rewriting the return() part of the cmp + scss from scratch is needed or not
// TODO: check the date modal cmp, if it's working as intended after making it reusable, or if more work is needed on it


// TODO: after finishing building and organizing this cmp,
//   start removing redundant stuff from the Order Object (need to follow path to back-end, and the get from the front-end)


export function OrderSidebarImproved({ stay, randomDate, hostImgUrl }) {
    // =============== NEW DATE HOOK for stay-details dynamic dates for booking a stay ===============
    const [checkIn, checkOut, handleDateChange] = useStayDates()
    const [guests, setGuests] = useStayGuests()
    // =============================================================================================
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const orderDetailsRef = useRef({
        price: Math.floor(stay.price + ((stay.price / 8) * (guests.adults + guests.children - 1))),
        guestCount: guests.adults + guests.children,
        nightsCount: stayService.calculateHowManyNights(Date.parse(checkIn), Date.parse(checkOut)),
        serviceFee: utilService.getRandomIntInclusive(100, 500),
        cleaningFee: utilService.getRandomIntInclusive(100, 500)
    })

    console.log('stay', stay)
    console.log('loggedInUser', loggedInUser)
    console.log('guests', guests)
    console.log('orderDetailsRef', orderDetailsRef)


    function onReserveClick(ev) {
        console.log('ev', ev)
        ev.preventDefault()
        ev.stopPropagation()
        if (!loggedInUser) {
            console.log("NOT logged in click")
            setModal("logIn")
        }
        else {
            console.log("logged in click")
            const order = createOrder(orderDetailsRef.current)
            console.log('order', order)
            setOrder(order)
            navigate(`/stay/book/${stay._id}`)
        }
    }



    function createOrder({ price, nightsCount, serviceFee, cleaningFee, guestCount }) {
        return {
            buyer: {
                _id: loggedInUser._id,
                fullname: loggedInUser.fullname,
                img: loggedInUser.imgUrl,
                joined: loggedInUser.joined ? loggedInUser.joined : utilService.getRandomMonthAndYear()
            },
            seller: {
                _id: stay.host._id,
                fullname: stay.host.fullname,
                img: hostImgUrl,
                joined: utilService.getRandomMonthAndYear()
            },
            checkIn,
            checkOut,
            nightsCount,
            nightsPrice: nightsCount * stay.price,
            orderPrice: {
                price,
                serviceFee,
                cleaningFee,
                total: (price * nightsCount) + serviceFee + cleaningFee
            },
            stayDetails: {
                id: stay._id,
                image: stay.imgUrls[0],
                loc: stay.loc,
                summary: stay.summary,
                type: stay.type,
                rate: stay.reviews.rate,
                reviewsCount: stay.reviews.length
            },
            thingsToDo: {
                "Just-for-you": utilService.getRandomIntInclusive(10, 20),
                "Top-rated": utilService.getRandomIntInclusive(30, 50),
                "Sports": utilService.getRandomIntInclusive(30, 60),
                "Tours": utilService.getRandomIntInclusive(50, 120),
                "Sightseeing": utilService.getRandomIntInclusive(50, 120),
                "more": utilService.getRandomIntInclusive(300, 500),
            },
            status: "Pending",
            _id: utilService.makeId()
        }
    }


    return (
        <section className="order-sidebar-improved">

            <section className="order-block">
                <section className="order">
                    <CostAndReviewScore stay={stay} orderDetailsRef={orderDetailsRef.current} />
                    <DatesAndGuests checkIn={checkIn} checkOut={checkOut} guests={guests} />
                    <ButtonMain text={'Reserve'} onClickButton={(ev) => onReserveClick(ev)} />
                </section>
                <article className="assurance flex column align-center">
                    <span className="fs14 lh18">You won't be charged yet</span>
                </article>
                <Pricing orderDetailsRef={orderDetailsRef.current} />
            </section>

            <SpecialInfo stay={stay} />

        </section>
    )
}