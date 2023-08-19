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


// TODO: organize this cmp.
// TODO: seriously consider if rewriting the return() part of the cmp + scss from scratch is needed or not
// TODO: check the date modal cmp, if it's working as intended after making it reusable, or if more work is needed on it


export function OrderSidebarImproved({ stay, randomDate, hostImgUrl }) {
    // =============== NEW DATE HOOK for stay-details dynamic dates for booking a stay ===============
    const [checkIn, checkOut, handleDateChange] = useStayDates()
    // =============================================================================================

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

                    <section className="price-and-review-score flex space-between align-center">
                        <article className="price flex align-end">
                            <span className="fs22 lh26 ff-circular-semibold">${utilService.addCommas(stay.price)}</span>
                            <span className="fs16 lh20">night</span>
                        </article>
                        <article className="review-score flex align-center">
                            <SvgHandler svgName={STAR} />
                            <span className="score fs14 lh18">{reviewService.getAverageReview(stay)}</span>
                            <span className="amount fs14 lh18">{stay.reviews.length} reviews</span>
                        </article>
                    </section>

                    <section className="dates-and-guests">
                        <section className="dates-container">

                            <div className="dates-container-border"></div>
                            <section className="dates flex">

                                <article className="check-in">
                                    <span className="fs10 lh12 ff-circular-bold">check-in</span>
                                    <div className="check-in-border"></div>
                                    <span className="fs14 lh18">{checkIn}</span>
                                </article>

                                <article className="check-out">
                                    <span className="fs10 lh12 ff-circular-bold">checkout</span>
                                    <div className="check-out-border"></div>
                                    <span className="fs14 lh18">{checkOut}</span>
                                </article>
                            </section>

                        </section>
                        <section className="guests-container">

                            <div className="guests-container-border"></div>
                            <section className="guests">

                                <article className="guest-block">
                                    <span className="fs10 lh12 ff-circular-bold">guests</span>
                                    <div className="guests-border"></div>
                                    <span className="fs14 lh18">{guestsString}</span>
                                </article>

                            </section>

                        </section>
                    </section>

                    <section className="main-btn"><ButtonMain text={'Reserve'} /></section>
                </section>

                <article className="assurance flex column align-center">
                    <span className="fs14 lh18">You won't be charged yet</span>
                </article>

                <section className="pricing">
                    <article className="individual-fees">individual-fees</article>
                    <article className="total">total</article>
                </section>

            </section>

            <section className="order-special-info flex">
                <article className="info-container">
                    <span className="bold fs16 lh20">Lower price.</span>
                    <span className="fs16 lh20">Your dates are ${(stay.price * 0.4).toFixed(0)} less per night compared to the average nightly rate of the last 60 days.</span>
                </article>
                <article><SvgHandler svgName={RED_TAG} /></article>
            </section>

        </section>
    )
}