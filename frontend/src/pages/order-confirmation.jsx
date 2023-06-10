import { useClickOutside } from "../customHooks/clickOutsideModal";
import { LEFT_ARROW, STAR } from "../services/svg.service";
import { AirbnbButton } from "../cmps/reuseableCmp/airbnb-button";
import { utilService } from "../services/util.service";
import SvgHandler from "../cmps/svg-handler";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { addConfirmedTrip } from "../store/user.actions";

export function OrderConfirmation() {
    const orderObject = useSelector(storeState => storeState.userModule.order)
    if (!orderObject || !orderObject.stayDetails || !orderObject.orderPrice) return <div>Loading..</div>
    const { stayDetails, guestsNumber, checkIn, checkOut, orderPrice, nightsCount, nightsPrice, seller } = orderObject
    const { reviewsCount, type, summary, rate, image, id } = stayDetails
    const { total, serviceFee, cleaningFee, price } = orderPrice
    const formattedTimeRange = utilService.getFormattedTimeRange(checkIn, checkOut)
    const sellerFirstName = seller.fullname.substring(0, seller.fullname.indexOf(' '))
    const formattedDate = new Date(utilService.getFutureTime(2, 'day')).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    });

    function removeUndefinedProperties(orderObject) {
        for (const prop in orderObject) {
            if (orderObject[prop] === undefined || Number.isNaN(orderObject[prop])) {
                delete orderObject[prop];
            } else if (typeof orderObject[prop] === 'object') {
                removeUndefinedProperties(orderObject[prop]);
                if (Object.keys(orderObject[prop]).length === 0) {
                    delete orderObject[prop];
                }
            }
        }
        return orderObject;
    }

    function onOrderConfirm(ev) {
        if (ev) {
            ev.stopPropagation()
            ev.preventDefault()
        }
        console.log(orderObject)
        removeUndefinedProperties(orderObject)
        console.log(orderObject)
        addConfirmedTrip(orderObject)

    }
    return (
        <section className="order-confirmation" >
            <section className="confirmation-header flex">
                <Link className="return-btn" to={`/stay/${id}`}>
                    <SvgHandler svgName={LEFT_ARROW} />
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
                        {/* <AirbnbButton onClickButton={onOpenModal} text={'Approve'} /> */}
                    </div>
                </div>
                <div className="message-host">
                    <h3 className="fs22">Required for your trip</h3>
                    <h5 className="fs16">Message the Host</h5>
                    <p>Let the Host know why you're traveling and when you'll check in.</p>
                    <div className="host-details-preview">
                        {sellerFirstName}
                        {seller.image}
                        Joined in 2020
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
                            <p>{summary}</p>
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
                            <div className="inside-price">${price.toLocaleString()} x {nightsCount} night{nightsCount !== 1 && 's'}</div>
                            <div className="price-total">
                                ${nightsPrice}
                            </div>
                        </div>
                        <div className="cleaning-fee flex flex space-between fs16">
                            <div className="inside-price underline">Cleaning fee</div>
                            <div className="price-total">
                                ${cleaningFee}
                            </div>
                        </div>
                        <div className="service-fee flex flex space-between fs16">
                            <div className="inside-price underline">StayHub service fee</div>
                            <div className="price-total">
                                ${serviceFee}
                            </div>
                        </div>
                        <div className="total-price flex space-between fs16">
                            <span>Total (USD)</span>
                            <span>${total.toLocaleString()}</span>
                        </div>
                    </div>
                </aside>
                <p className="declaration">By selecting the button below, I agree to the <span>Host's House Rules, Ground rules for guests, Airbnb's Rebooking and Refund Policy</span>, and that Airbnb can <span>charge my payment method</span>  if I'm responsible for damage.</p>
            </section>
            <section className="confirm-btn" onClick={onOrderConfirm}>
                <AirbnbButton text={'Confirm and pay'} />
            </section>
        </section>
    )
}