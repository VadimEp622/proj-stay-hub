import { STAR } from "../services/svg.service";
import { utilService } from "../services/util.service";
import SvgHandler from "./svg-handler";

export function OrderConfirmation({ setOpenModal, orderObject }) {
    const { stayDetails, guestsNumber, checkIn, checkOut, orderPrice, nightsCount, nightsPrice, seller } = orderObject
    const { reviewsCount, type, summary, rate, image } = stayDetails
    const { total, serviceFee, cleaningFee, price } = orderPrice
    const formattedTimeRange = utilService.getFormattedTimeRange(checkIn, checkOut)
    const sellerFirstName = seller.fullName.substring(0, str.indexOf(' '))
    return (
        <section className="order-confirmation">
            <div className="confirmation-details">
                <h3>Confirmation</h3>
                <div className="rare-find">
                    <h5>This is rare find.</h5>
                    {/* insert SVG of diamond here */}
                    <p>{sellerFirstName}'s place is usually booked.</p>
                </div>
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
                    <div className="buttons-container">
                        <button onClick={() => setOpenModal(false)}>Close</button>
                        <div className="btn-container">
                            {utilService.createDivsForButtonContainer()}
                            <div className="content">
                                <button className="action-btn">
                                    <span>Approve</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <aside>
                <div className="confirmation-preview">
                    <img src={image} alt="stay-image" />
                    <div className="detail">
                        <p>{type}</p>
                        <p>{summary}</p>
                        {reviewsCount > 0 && (
                            <p><SvgHandler svgName={STAR} />{rate}({reviewsCount} 'review' {reviewsCount !== 1 && 's'})</p>
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
        </section>
    )
}