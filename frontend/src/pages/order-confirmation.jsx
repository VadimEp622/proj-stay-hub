// Node modules
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

// Services
import { ARROW_LEFT, STAR } from "../services/svg.service.js"
import { utilService } from "../services/util.service.js"
import { socketService, SOCKET_EMIT_SET_STAYID, SOCKET_EMIT_STAY_RESERVED, SOCKET_EVENT_STAY_RESERVED } from "../services/socket.service.js"

// Store
import { addConfirmedTrip } from "../store/user.actions.js"

// Custom hooks
import { useClickOutside } from "../customHooks/useClickOutsideModal.js"
import useScrollToTop from "../customHooks/useScrollToTop.js"

// Components
import { ButtonMain } from "../cmps/_reuseable-cmps/button-main.jsx"
import SvgHandler from "../cmps/_reuseable-cmps/svg-handler.jsx"
import { Loader } from "../cmps/_reuseable-cmps/loader.jsx"


// TODO: set redirect when clicking back, using history, instead of new link
// TODO: when logging out, redirect to stay-details


export function OrderConfirmation() {
    useScrollToTop()
    const navigate = useNavigate()
    const location = useLocation()
    const orderObject = useSelector(storeState => storeState.userModule.order)
    console.log('orderObject', orderObject)


    // useEffect(() => {
    //     socketService.on(SOCKET_EMIT_SET_STAYID, doSomething)
    //     socketService.emit(SOCKET_EMIT_SET_TOYID, toy._id)
    //     return () => {
    //         socketService.off(SOCKET_EMIT_SET_STAYID, doSomething)
    //     }
    // }, [])
    // function doSomething(something) {
    //     console.log('something', something)
    // }

    useEffect(() => {
        //  if refreshed, or entered URL path directly with /book/ inside, redirect to stay page (stay-details)
        if (Object.keys(orderObject).length === 0) {
            const pathName = location.pathname.split('/')
            const newPathName = pathName.filter(name => name !== 'book').join('/')
            navigate(newPathName)
        }
    }, [])



    async function handleOrderConfirm(ev) {
        await onOrderConfirm(ev)
        navigate('/trips')
    }

    async function onOrderConfirm(ev) {
        if (ev) {
            ev.stopPropagation()
            ev.preventDefault()
        }
        // removeUndefinedProperties(orderObject)
        try {
            console.log('onOrderConfirm -> orderObject', orderObject)
            await addConfirmedTrip(orderObject)
            socketService.emit(SOCKET_EVENT_STAY_RESERVED, orderObject.seller._id)
        } catch (error) {
            console.error('Error adding confirmed trip:', error)
        }
    }



    if (Object.keys(orderObject).length === 0) return <Loader />

    const { stayDetails, guestCount, checkIn, checkOut, orderPrice, nightsCount, nightsPrice, seller } = orderObject
    const { reviewsCount, type, summary, rate, image, id } = stayDetails
    const { total, serviceFee, cleaningFee, price } = orderPrice

    const formattedTimeRange = utilService.getFormattedTimeRange(checkIn, checkOut)
    // const sellerFirstName = seller.fullname.substring(0, seller.fullname.indexOf(' '))
    const formattedDate = new Date(utilService.getFutureTime(2, 'day')).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    })


    return (
        <section className="order-confirmation" >

            <section className="confirmation-header flex align-center">
                <Link className="return-btn" to={`/stay/${id}`} title="return">
                    <SvgHandler svgName={ARROW_LEFT} />
                </Link>
                <h2>Confirm and pay</h2>
            </section>

            <section className="confirmation-main">

                <section className="dates-guests">

                    <h3 className="fs22">Your trip</h3>
                    <article className="dates">
                        <h4 className="fs16">Dates</h4>
                        <p className="fs16">{formattedTimeRange}</p>
                    </article>
                    <article className="guests">
                        <h4 className="fs16">Guests</h4>
                        <p>{guestCount} guest{guestCount !== 1 && 's'}</p>
                    </article>

                </section>

                <section className="message-host">
                    <article className="intro">
                        <h3 className="fs22">Required for your trip</h3>
                        <h5 className="fs16">Message the Host</h5>
                        <p>Let the Host know why you're traveling and when you'll check in.</p>
                    </article>
                    <section className="host-preview flex align-center">
                        <img src={seller.img} alt="host" />
                        <article className="flex column">
                            <span className="fs16 ff-circular-semibold">{seller.fullname} </span>
                            <span>joined in {seller.joined}</span>
                        </article>
                    </section>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </section>

                <div className="cancellation-policy">
                    <h3 className="fs22">Cancellation policy</h3>
                    <p className="fs16">Cancel before {formattedDate} for a partial refund. After that, this reservation is non-refundable.</p>
                </div>

                <aside className="order-confirmation-sidebar flex">

                    <section className="stay-information flex">
                        <img src={image} alt="stay" />
                        <section className="information">
                            <p className="stay-type fs12">{type}</p>
                            <span className="short-summary">{summary}</span>
                            <article className="confirmation-reviews flex align-center">
                                {reviewsCount > 0 && (
                                    <>
                                        <span><SvgHandler svgName={STAR} /></span>
                                        <span>{rate}</span>
                                        <span>({reviewsCount} review{reviewsCount !== 1 && 's'})</span>
                                    </>
                                )}
                            </article>
                        </section>
                    </section>

                    <section className="price-details">
                        <h3 className="title fs22">Price details</h3>
                        <article className="night-price flex space-between fs16">
                            <span className="underline">${utilService.addCommas(price)} x {nightsCount} night{nightsCount !== 1 && 's'}</span>
                            <span>${utilService.addCommas(nightsPrice)}</span>
                        </article>
                        <article className="cleaning-fee flex space-between fs16">
                            <span className="underline">Cleaning fee</span>
                            <span>${utilService.addCommas(cleaningFee)}</span>
                        </article>
                        <article className="service-fee flex space-between fs16">
                            <span className="underline">StayHub service fee</span>
                            <span>${utilService.addCommas(serviceFee)}</span>
                        </article>
                        <article className="total-price flex space-between fs16 ff-circular-semibold">
                            <span>Total (USD)</span>
                            <span>${utilService.addCommas(total)}</span>
                        </article>
                    </section>
                </aside>

                <p className="declaration fs12 lh18">By selecting the button below, I agree to the irrelevance of the <span>Host's House Rules, Ground rules for guests, StayHub's Rebooking and Refund Policy</span>, and that StayHub can <span>charge my payment method</span>  if I'm responsible for damage.</p>

            </section>

            <section className="confirm-btn">
                <ButtonMain text={'Confirm and pay'} onClickButton={handleOrderConfirm} />
            </section>

        </section>
    )
}