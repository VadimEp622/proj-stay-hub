// Node modules
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

// Services
import { ARROW_LEFT, STAR } from "../services/svg.service.js"
import { utilService } from "../services/util.service.js"
import { socketService, SOCKET_EMIT_SET_STAYID, SOCKET_EMIT_STAY_RESERVED, SOCKET_EVENT_STAY_RESERVED } from "../services/socket.service.js"

// Store
import { addConfirmedTrip } from "../store/user.actions.js"

// Custom hooks
import { useClickOutside } from "../customHooks/useClickOutsideModal.js"

// Components
import { ButtonMain } from "../cmps/_reuseable-cmps/button-main.jsx"
import SvgHandler from "../cmps/_reuseable-cmps/svg-handler.jsx"



// TODO: figure out what's going on here
// TODO: may have to redo this from scratch, this is a mess...


export function OrderConfirmation() {

    const navigate = useNavigate()
    const orderObject = useSelector(storeState => storeState.userModule.order)


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
        console.log('orderObject', orderObject)
    }, [orderObject])





    // const hostImgUrl = useSelector(storeState => storeState.stayModule.currHostImgUrl)
    if (!orderObject || !orderObject.stayDetails || !orderObject.orderPrice) return <div>Loading..</div>


    const { stayDetails, guestsNumber, checkIn, checkOut, orderPrice, nightsCount, nightsPrice, seller } = orderObject
    const { reviewsCount, type, summary, rate, image, id } = stayDetails
    const { total, serviceFee, cleaningFee, price } = orderPrice

    const formattedTimeRange = utilService.getFormattedTimeRange(checkIn, checkOut)
    // const sellerFirstName = seller.fullname.substring(0, seller.fullname.indexOf(' '))
    const formattedDate = new Date(utilService.getFutureTime(2, 'day')).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    })


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
            console.log('orderObject', orderObject)
            await addConfirmedTrip(orderObject)
            socketService.emit(SOCKET_EVENT_STAY_RESERVED, orderObject.seller._id)
        } catch (error) {
            console.error('Error adding confirmed trip:', error)
        }
    }

    return (
        <section className="order-confirmation" >
            <section className="confirmation-header flex">
                <Link className="return-btn" to={`/stay/${id}`}>
                    <SvgHandler svgName={ARROW_LEFT} />
                </Link>
                <h2>Confirm and pay</h2>
            </section>
            <section className="confirmation-container">
                <div className="confirmation-details">

                    <div className="trip-details">
                        <h3 className="fs22">Your trip</h3>
                        <div className="trip-detail">
                            <h4 className="fs16">Dates</h4>
                            <p className="fs16">{formattedTimeRange}</p>

                        </div>
                        <div className="trip-detail">
                            <h4 className="fs16">Guests</h4>
                            <p>{guestsNumber} guest{guestsNumber !== 1 && 's'}</p>
                        </div>
                        {/* <ButtonMain onClickButton={onOpenModal} text={'Approve'} /> */}
                    </div>
                </div>
                <div className="message-host">
                    <h3 className="fs22">Required for your trip</h3>
                    <h5 className="fs16">Message the Host</h5>
                    <p>Let the Host know why you're traveling and when you'll check in.</p>
                    <div className="host-details-preview flex align-center">
                        <img src={seller.img} alt="host" />
                        <section className="host-mini-info">
                            <span>{seller.fullname} </span>
                            <span>joined in {seller.joined}</span>
                        </section>
                    </div>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="cancellation-policy">
                    <h3 className="fs22">Cancellation policy</h3>
                    <p className="fs16">Cancel before {formattedDate} for a partial refund. After that, this reservation is non-refundable.</p>
                </div>
                <aside className="flex">
                    <div className="confirmation-preview flex">
                        <img src={image} alt="stay-image" />
                        <div className="detail">
                            <p className="fs12">{type}</p>
                            <span className="short-summary">{summary}</span>
                            <section className="confirmation-reviews flex align-center">
                                {reviewsCount > 0 && (
                                    <>
                                        <span><SvgHandler svgName={STAR} /></span>
                                        <span>{rate}</span>
                                        <span>({reviewsCount} review{reviewsCount !== 1 && 's'})</span>
                                    </>
                                )}
                            </section>
                        </div>
                    </div>
                    <div className="price-details">
                        <h3 className="fs22">Price details</h3>
                        <div className="price flex space-between fs16">
                            <div className="inside-price">${utilService.addCommas(price)} x {nightsCount} night{nightsCount !== 1 && 's'}</div>
                            <div className="price-total">
                                ${utilService.addCommas(nightsPrice)}
                            </div>
                        </div>
                        <div className="cleaning-fee flex flex space-between fs16">
                            <div className="inside-price underline">Cleaning fee</div>
                            <div className="price-total">
                                ${utilService.addCommas(cleaningFee)}
                            </div>
                        </div>
                        <div className="service-fee flex flex space-between fs16">
                            <div className="inside-price underline">StayHub service fee</div>
                            <div className="price-total">
                                ${utilService.addCommas(serviceFee)}
                            </div>
                        </div>
                        <div className="total-price flex space-between fs16">
                            <span>Total (USD)</span>
                            <span>${utilService.addCommas(total)}</span>
                        </div>
                    </div>
                </aside>
                <p className="declaration">By selecting the button below, I agree to the <span>Host's House Rules, Ground rules for guests, Airbnb's Rebooking and Refund Policy</span>, and that Airbnb can <span>charge my payment method</span>  if I'm responsible for damage.</p>
            </section>
            <section className="confirm-btn">
                <ButtonMain text={'Confirm and pay'} onClickButton={handleOrderConfirm} />
            </section>
        </section>
    )
}