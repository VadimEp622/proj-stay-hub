import { useClickOutside } from "../customHooks/clickOutsideModal";
import { STAR } from "../services/svg.service";
import { AirbnbButton } from "../cmps/reuseableCmp/airbnb-button";
import { utilService } from "../services/util.service";
import SvgHandler from "../cmps/svg-handler";
import { useSelector } from "react-redux";

export function OrderConfirmation() {
    const orderObject = useSelector(storeState => storeState.userModule.order)
    console.log(orderObject)
    const { stayDetails, guestsNumber, checkIn, checkOut, orderPrice, nightsCount, nightsPrice, seller } = orderObject
    console.log(seller)
    const { reviewsCount, type, summary, rate, image } = stayDetails
    const { total, serviceFee, cleaningFee, price } = orderPrice
    const formattedTimeRange = utilService.getFormattedTimeRange(checkIn, checkOut)
    const sellerFirstName = seller.fullname.substring(0, seller.fullname.indexOf(' '))

    return (
        <section className="order-confirmation" >
            <div className="confirmation-details">
                <h3>Confirm and pay</h3>
                <div className="trip-details">
                    <h4>Your Trip</h4>
                    <div className="trip-detail">
                        <h4>Dates</h4>
                        <p>{formattedTimeRange}</p>
                    </div>
                    <div className="trip-detail">
                        <h4>Guests</h4>
                        <p>{guestsNumber} guest{guestsNumber !== 1 && 's'}</p>
                    </div>
                    {/* <AirbnbButton onClickButton={onOpenModal} text={'Approve'} /> */}
                </div>
            </div>
            <aside>
                <div className="confirmation-preview">
                    <img src={image} alt="stay-image" />
                    <div className="detail">
                        <p>{type}</p>
                        <p>{summary}</p>
                        {reviewsCount > 0 && (
                            <p><SvgHandler svgName={STAR} />{rate}({reviewsCount} review{reviewsCount !== 1 && 's'})</p>
                        )}
                    </div>
                </div>
                <div className="price-details">
                    <h3>Price Details</h3>
                    <div className="price">
                        <div className="inside-price underline">${price.toLocaleString()} x {nightsCount} night{nightsCount !== 1 && 's'}</div>
                        <div className="price-total">
                            ${nightsPrice}
                        </div>
                    </div>
                    <div className="price">
                        <div className="inside-price underline">Cleaning Fee</div>
                        <div className="price-total">
                            ${cleaningFee}
                        </div>
                    </div>
                    <div className="price">
                        <div className="inside-price underline">StayHub Service Fee</div>
                        <div className="price-total">
                            ${serviceFee}
                        </div>
                    </div>
                    <div className="total-price">
                        Total<span>${total}</span>
                    </div>
                </div>
            </aside>
            <div className="message-host">
                <h3>Required for your trip</h3>
                <h5>Message the host</h5>
                <p>Let the Host know why you're travelling and when you'll check in.</p>
                <div className="host-details-preview">
                    {sellerFirstName}
                    {seller.image}
                    Joined in 2020
                </div>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="cancellation-policy">
                <h3>Cancellation policy</h3>
                <p>Cancel before {utilService.convertTimestampToDate(utilService.getFutureTime(2, 'day'))} for a partial refund. After that, this reservation is non-refundable.</p>
            </div>
            <p>By selecting the button below, I agree to the Host's House Rules, Ground rules for guests, Airbnb's Rebooking and Refund Policy, and that Airbnb can charge my payment method if I'm responsible for damage.</p>
            <AirbnbButton text={'Confirm and pay'} />
        </section>
    )
}