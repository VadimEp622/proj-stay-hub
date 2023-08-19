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


export function OrderSidebarImproved({ stay, randomDate, hostImgUrl }) {
    // =============== NEW DATE HOOK for stay-details dynamic dates for booking a stay ===============
    const [checkIn, checkOut, handleDateChange] = useStayDates()
    // =============================================================================================


    const nightsCount = stayService.calculateHowManyNights(Date.parse(checkIn), Date.parse(checkOut))
    const guestsString = userService.buildGuestsString({
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0
    })
    return (
        <section className="order-sidebar-improved">

            <section className="order-block">
                <section className="order">
                    <CostAndReviewScore stay={stay} />
                    <DatesAndGuests checkIn={checkIn} checkOut={checkOut} guestsString={guestsString} />
                    <ButtonMain text={'Reserve'} />
                </section>
                <article className="assurance flex column align-center">
                    <span className="fs14 lh18">You won't be charged yet</span>
                </article>
                <Pricing stay={stay} nightsCount={nightsCount} />
            </section>

            <SpecialInfo stay={stay} />

        </section>
    )
}