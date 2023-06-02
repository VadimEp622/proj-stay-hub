import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { stayService } from "../services/stay.service.local.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { reviewService } from '../services/review.service.js'
import { OrderContainer } from '../cmps/order-container.jsx'

import SvgHandler from '../cmps/svg_handler.jsx'
import { HEART_16, RED_HEART_16, SHARE, STAR, LOCATION, CHECKIN, KEY } from '../services/svg.service.js'
import { DatePicker } from '../cmps/date-picker.jsx'

export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const navigate = useNavigate()
    const [isHeartClicked, setIsHeartClicked] = useState(false)
    const heartSvg = isHeartClicked ? 'heart-red-16' : 'heart-16'

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
        if (stay.reviews.length > 6) {
            return (
                <>
                    {stay.reviews.slice(0, 6).map((review, idx) => (
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
        } else {
            const reviews = stay.reviews.map((review, idx) => (
                <div className="review-container" key={idx}>
                    {review.by.fullname}
                    {review.by.date}



                    <div className="description-container">
                        {review.txt}
                    </div>
                </div>
            ))

            return reviews;
        }
    }

    if (!stay) return <div>Loading...</div>

    function displayReviewsCriteria() {
        if (!stay || !stay.reviews || stay.reviews.length === 0) return null;

        const criteria = stay.reviews.reduce((acc, review) => {
            Object.entries(review.reviewInputs).forEach(([input, value]) => {
                const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1);
                acc[capitalizedInput] = acc[capitalizedInput] ? (acc[capitalizedInput] + value) : value;
            });
            return acc;
        }, {});

        // Calculate the average
        Object.entries(criteria).forEach(([input, value]) => {
            criteria[input] = value / stay.reviews.length;
        });

        return criteria;
    }

    const reviewsInputs = displayReviewsCriteria()
    console.log(reviewsInputs)
    const reviews = stay.reviews.length > 1 ? 'reviews' : 'review'
    return <section className="stay-details">
        <section className='stay-review flex'>
            <h1>{stay.name}</h1>
            <section className='info-bar flex space-between align-center'>
                <section className='info flex'>
                    <SvgHandler svgName={STAR} />
                    <span>{reviewService.getAverageReview(stay)}</span>
                    <span className='info-review'>{stay.reviews.length} Review</span>
                    <span className='info-loc'>{stay.loc.city}, {stay.loc.country}</span>
                </section>
                <section className='btns flex'>
                    <div className='share-btn flex'>
                        <SvgHandler svgName={SHARE} />
                        <span>Share</span>
                    </div>
                    <div className='save-btn flex' onClick={() => setIsHeartClicked(prevHeart => !prevHeart)}>
                        <SvgHandler svgName={heartSvg} />
                        <span>Save</span>
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
            <section className='about-host flex space-between'>
                <section className='host-info'>
                    <h2>Entire villa hosted by Joan Felip</h2>
                    <span>4 • guests1 • bedroom2 • beds1 • bath</span>
                </section>
                <img src="https://a0.muscache.com/im/pictures/user/59da4e65-e5a0-4fde-b4d9-e48f20c1ba43.jpg?im_w=240" alt="host image" />
            </section>
            <section className='stay-highlights'>
                <div className='highlight flex'>
                    <span><SvgHandler svgName={LOCATION} /></span>
                    <div>
                        <h3>Great location</h3>
                        <p>100% of recent guests gave the location a 5-star rating.</p>
                    </div>
                </div>
                <div className='highlight flex'>
                    <span><SvgHandler svgName={KEY} />
                    </span>
                    <div>
                        <h3>Self check-in</h3>
                        <p>Check yourself in with the lockbox.</p>
                    </div>
                </div>
                <div className='highlight flex'>
                    <span><SvgHandler svgName={CHECKIN} /></span>
                    <div>
                        <h3>Free cancellation for 48 hours.</h3>
                        <p></p>
                    </div>
                </div>
            </section>
            <section className='amenities'>
                <h3>What this place offers</h3>
                <div className='highlight flex'>
                    {stay.amenities.map(amenity => {
                        return <div className="amenity" key={amenity}>
                            <SvgHandler svgName={amenity} />
                            {amenity}
                        </div>
                    })}
                </div>
            </section>
            <OrderContainer className='order-container' stay={stay} />
            <div className="date-container">
                <h3>Select check-in date</h3>
                <p>Add your travel dates for exact pricing</p>
                <DatePicker />
            </div>
        </section>
        {stay.reviews.length > 0 &&
            <section className="review-container">
                <div className="review-title"><SvgHandler svgName={STAR} />
                    {reviewService.getAverageReview(stay)} • {stay.reviews.length} {reviews}
                </div>
                <div className="reviews-inputs">
                    {Object.entries(reviewsInputs).map(([key, value]) => (
                        <div className="review-input" key={key}>
                            <div className="review-input-key">{key}</div>
                            <div className="review-input-bar" ></div>
                            <div className="review-input-value">{value}</div>
                        </div>
                    ))}
                </div>
                {displayReviews()}
                {stay.reviews.length > 6 && <button>Show all {stay.reviews.length} reviews</button>}
            </section>}


        <section className="map-container">
            <h3>Where you'll be</h3>
            {stay.loc.city}, {stay.loc.country}

        </section>
        <section className="host-details-container">

        </section>
    </section >
}