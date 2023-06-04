import { useEffect, useState, Fragment } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { stayService } from "../services/stay.service.local.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { reviewService } from '../services/review.service.js'
import { OrderContainer } from '../cmps/order-container.jsx'
import { DetailsHeader } from '../cmps/details-header.jsx'
import { getDate } from '../services/stay.service.js'
import SvgHandler from '../cmps/svg_handler.jsx'
import { HEART_16, RED_HEART_16, SHARE, STAR, STAR_16, LOCATION, CHECKIN, KEY } from '../services/svg.service.js'
import { DatePicker } from '../cmps/date-picker.jsx'
import GoogleMap from '../cmps/map.jsx'

export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const navigate = useNavigate()
    const [isHeartClicked, setIsHeartClicked] = useState(false)
    const heartSvg = isHeartClicked ? RED_HEART_16 : HEART_16

    useEffect(() => {
        loadStay()
    }, [stayId])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId);
            setStay(stay);
        } catch (err) {
            console.log('Had issues in stay details', err);
            showErrorMsg('Cannot load stay');
            navigate('/stay');
        }
    }

    function displayReviews() {
        const reviewsToDisplay = (stay.reviews.length > 6) ? stay.reviews.slice(0, 6) : stay.reviews
        return (
            <>
                {reviewsToDisplay.map((review, idx) => (
                    <div className="review-container" key={idx}>
                        {review.by.fullname}
                        {review.by.date}
                        {/* <img src={review.by.imgUrl} alt="host image" /> */}
                        <div className="description-container">
                            {review.txt}
                        </div>
                    </div>
                ))}
            </>
        )
    }

    function displayReviewsCriteria() {
        if (!stay || !stay.reviews || stay.reviews.length === 0) return null;

        const criteria = stay.reviews.reduce((acc, review) => {
            Object.entries(review.reviewInputs).forEach(([input, value]) => {
                const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1);
                acc[capitalizedInput] = acc[capitalizedInput] ? (acc[capitalizedInput] + value) : value;
            });
            return acc;
        }, {});

        Object.entries(criteria).forEach(([input, value]) => {
            criteria[input] = value / stay.reviews.length;
        });

        return criteria;
    }

    function calculatePercentage(value) {
        const percentage = (value / 5) * 100
        return percentage.toFixed(1)
    }

    if (!stay) return <div>Loading...</div>
    const reviewsInputs = displayReviewsCriteria()
    const reviews = stay.reviews.length > 1 ? 'reviews' : 'review'
    const capitalizedReviewsString = reviews.charAt(0).toUpperCase() + reviews.slice(1)

    return <Fragment>
        <section className="stay-details" id='scroll-1'>
            {<DetailsHeader stay={stay} />}
            <section className='stay-review flex' >
                <h1>{stay.name}</h1>
                <section className='info-bar flex space-between align-center'>
                    <section className='info flex'>
                        <SvgHandler svgName={STAR} />
                        <span>{reviewService.getAverageReview(stay)}</span>
                        <span className='info-review'>{stay.reviews.length} {reviews}</span>
                        <span className='info-loc'>{stay.loc.city}, {stay.loc.country}</span>
                    </section>
                    <section className='btns flex'>
                        <div className='share-btn flex'>
                            <SvgHandler svgName={SHARE} />
                            <span>Share</span>
                            <div className="share-btn-overlay"></div>
                        </div>
                        <div className='save-btn flex' onClick={() => setIsHeartClicked(prevHeart => !prevHeart)}>
                            <SvgHandler svgName={heartSvg} />
                            <span>Save</span>
                            <div className="save-btn-overlay"></div>
                        </div>
                    </section>
                </section>
            </section>
            <section className="img-container">
                {(() => {
                    const images = [];
                    for (let i = 0; i < 5; i++) {
                        const url = stay.imgUrls[i];
                        images.push(
                            <div className="img" key={i}>
                                <img src={url} alt={`Image ${i}`} className="fade-image" />
                                <div className="overlay"></div>
                            </div>
                        )
                    }
                    return images;
                })()}
            </section>
            <section className='details-container'>
                <section className='stay-review-details'>
                    <section className='about-host flex space-between'>
                        <section className='host-info'>
                            <h2>Entire villa hosted by {stay.owner ? stay.owner : 'Juan'}</h2>
                            <span>4 guests • 1 bedroom • 2 beds • 1 bath</span>
                        </section>
                        <img src="https://a0.muscache.com/im/pictures/user/59da4e65-e5a0-4fde-b4d9-e48f20c1ba43.jpg?im_w=240" alt="host image" />
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
                    <section className='amenities' id='scroll-2'>
                        <h3>What this place offers</h3>
                        <div className='amenities-list'>
                            {stay.amenities.map(amenity => {
                                return <div className="amenity fs16 flex" key={amenity}>
                                    <SvgHandler svgName={amenity} />
                                    {amenity}
                                </div>
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
                    <OrderContainer stay={stay} />
                </section>
            </section>
            {stay.reviews.length > 0 &&
                <section className="review-container " id='scroll-3'>
                    <div className="review-title fs22 flex align-center"><SvgHandler svgName={STAR_16} />
                        <span>{reviewService.getAverageReview(stay)} • {stay.reviews.length} {reviews} </span>
                    </div>
                    <div className="reviews-inputs">
                        {Object.entries(reviewsInputs).map(([key, value]) => (
                            <div className="review-input" key={key}>
                                <div className="review-input-key">{key}</div>
                                <section className='review-rate flex align-center'>
                                    <div className="progress-bar-container flex align-center">
                                        <div className="review-input-bar" style={{ width: `${calculatePercentage(value)}%` }}></div>
                                    </div>
                                    <span className='fs12'>{value.toFixed(1)}</span>
                                </section>
                            </div>
                        ))}
                    </div>
                    <section className='reviews-sum'>
                        {displayReviews()}
                        {stay.reviews.length > 6 && <button>Show all {stay.reviews.length} reviews</button>}
                    </section>
                </section>}
            <section className="map-container" id='scroll-4'>
                <h3>Where you'll be</h3>
                <div className="map">
                    <GoogleMap loc={stay.loc.coordinates} />
                </div>
                <section className='location-about'>
                    <h3 className='fs16'>{stay.loc.city}, {stay.loc.country}</h3>
                </section>
            </section>
            <section className="host-details-container">
                <div className="name-details">
                    <img src="https://a0.muscache.com/im/pictures/user/59da4e65-e5a0-4fde-b4d9-e48f20c1ba43.jpg?im_w=240" alt="host image" />
                    Hosted by {stay.owner ? stay.owner : 'Juan'}
                    <p>Joined in March 2014</p>
                </div>
                <div className="sub-details">
                    <SvgHandler svgName={STAR} />
                    {stay.reviews.length} {capitalizedReviewsString}
                    <SvgHandler svgName={STAR} />
                    Identity verified
                    {stay.superhost && (
                        <>
                            <SvgHandler svgName={STAR} />
                            Superhost
                        </>
                    )}
                </div>
                {stay.superhost && (
                    <>
                        <p>{stay.owner} is a Superhost</p>
                        <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                    </>
                )}
                Language: English
                Response rate: 100%
                Response time: within a couple of hours
                <button>Contact Host</button>
            </section>
            <section className="things-to-know">
                <div className="house-rules">
                    <p>House rules</p>
                    <p>Check-in after 4:00 PM</p>
                    <p>Checkout before 10:00 AM</p>
                    <p>Pets allowed</p>
                </div>
                <div className="house-rules">
                    <p>Safety & property</p>
                    <p>No smoke alarm</p>
                    <p>Pool/hot tub without a gate or lock</p>
                    <p>Carbon monoxide detector not required</p>
                </div>
                <div className="house-rules">
                    <p>Cancellation policy</p>
                    <p>Free cancellation before {getDate(stay.checkIn)}</p>
                    <p>Review the Host's full cancellation policy which applies even if you cancel for illness for disruptions caused by COVID-19</p>
                </div>
            </section>
        </section >
    </Fragment>
}