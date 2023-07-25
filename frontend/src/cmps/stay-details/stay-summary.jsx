import { CHECKIN, KEY, LOCATION } from "../../services/svg.service.js";
import { OrderContainer } from "../order-container.jsx";
import SvgHandler from "../svg-handler.jsx";

export function StaySummary({stay,hostImgUrl,randomDateJoined}) {

    return (
        <section className='summary-container'>
            <section className='stay-review-details'>
                <section className='about-host flex space-between'>
                    <section className='host-info'>
                        <h2>Entire villa hosted by {stay.host.fullname}</h2>
                        <span>4 guests</span>
                        <span className='dot'>•</span>
                        <span>2 bedrooms</span>
                        <span className='dot'>•</span>
                        <span>2 beds</span>
                        <span className='dot'>•</span>
                        <span>1 bath</span>
                    </section>
                    <img src={hostImgUrl} alt="host" />
                </section>
                <section className='stay-highlights'>
                    <div className='highlight flex'>
                        <span><SvgHandler svgName={LOCATION} /></span>
                        <div className='highlight-txt'>
                            <h3>Great location</h3>
                            <p>100% of recent guests gave the location a 5-star rating.</p>
                        </div>
                    </div>
                    <div className='highlight flex'>
                        <span><SvgHandler svgName={KEY} />
                        </span>
                        <div className='highlight-txt'>
                            <h3>Self check-in</h3>
                            <p>Check yourself in with the lockbox.</p>
                        </div>
                    </div>
                    <div className='highlight flex'>
                        <span><SvgHandler svgName={CHECKIN} /></span>
                        <div className='highlight-txt'>
                            <h3>Free cancellation for 48 hours.</h3>
                            <p></p>
                        </div>
                    </div>
                </section>
                <section className='amenities' id='amenities'>
                    <h3>What this place offers</h3>
                    <div className='amenities-list'>
                        {stay.amenities.slice(0, 8).map(amenity => {
                            return (
                                <div className="amenity fs16 flex" key={amenity}>
                                    <SvgHandler svgName={amenity} />
                                    <span>{amenity}</span>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <div className="date-container">
                    <h3>Select check-in date</h3>
                    <p>Add your travel dates for exact pricing</p>
                    {/* <DatePicker /> */}
                </div>
            </section>
            <section className='order-container'>
                <OrderContainer stay={stay} randomDate={randomDateJoined} hostImgUrl={hostImgUrl} />
            </section>
        </section>
    )
}