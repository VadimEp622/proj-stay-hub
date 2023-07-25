import { useEffect, useState, Fragment } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { stayService } from "../services/stay.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { reviewService } from '../services/review.service.js'
import { OrderContainer } from '../cmps/order-container.jsx'
import { DetailsHeader } from '../cmps/details-header.jsx'
import { DetailsReviews } from '../cmps/details-reviews.jsx'
import { getDate } from '../services/stay.service.js'
import SvgHandler from '../cmps/svg-handler.jsx'
import { HEART_16, RED_HEART_16, SHARE, STAR, STAR_16, LOCATION, CHECKIN, KEY, VERIFIED, RED_TAG, BLACK_SUPERHOST_16 } from '../services/svg.service.js'
import GoogleMap from '../cmps/map.jsx'
import { Helmet } from 'react-helmet';
import { utilService } from '../services/util.service.js'
import { Loader } from '../cmps/reuseableCmp/loader.jsx'
import { socketService } from '../services/socket.service.js'
import { useSelector } from 'react-redux'
import { setModal } from '../store/stay.actions.js'
import { AddToWishlist, removeFromWishlist } from '../store/user.actions.js'
import { userService } from '../services/user.service.js'
import { ThingsToKnow } from '../cmps/stay-details/things-to-know.jsx'
import { HostDetails } from '../cmps/stay-details/host-details.jsx'
import { StayMap } from '../cmps/stay-details/stay-map.jsx'
import { StayReviews } from '../cmps/stay-details/stay-reviews.jsx'

export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const navigate = useNavigate()
    const reviewsToDisplay = stay?.reviews?.slice(0, 6)
    const [isLikeClicked, setIsLikeClicked] = useState(false)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const wishedListItems = useSelector(storeState => storeState.userModule.user?.wishlist)
    const likeSvg = isLikeClicked ? RED_HEART_16 : HEART_16

    useEffect(() => {
        loadStay()
    }, [stayId])


    useEffect(() => {
        const likedId = wishedListItems?.some((wishlist) => wishlist._id === stayId)
        setIsLikeClicked((likedId))
    }, [wishedListItems, stayId, isLikeClicked])


    async function onLikeClicked(ev) {
        console.log(likeSvg)
        if (ev) {
            ev.preventDefault()
            ev.stopPropagation()
        }
        if (!loggedInUser) {
            // setModal('logIn')
            return
        }
        if (likeSvg === RED_HEART_16) {
            console.log('hi from remove wishlist')
            removeFromWishlist(stay)
            await userService.update(loggedInUser._id, 'wishlist', stay, 'remove')
            // setIsLikeClicked(false)
        } else {
            console.log('hi from add wishlist')
            AddToWishlist(stay)
            await userService.update(loggedInUser._id, 'wishlist', stay)
            // setIsLikeClicked(true)
        }
        // setIsLikeClicked(prevHeart => !prevHeart)
    }


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

    function displayReviewsCriteria() {
        if (!stay || !stay.reviews || stay.reviews.length === 0) return null;

        const criteria = stay.reviews.reduce((acc, review) => {
            if (!review.reviewInputs) return
            Object.entries(review.reviewInputs).forEach(([input, value]) => {
                const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1)
                acc[capitalizedInput] = acc[capitalizedInput] ? (acc[capitalizedInput] + value) : value
            })
            return acc
        }, {})

        if (!criteria) return []
        Object.entries(criteria).forEach(([input, value]) => {
            criteria[input] = value / stay.reviews.length;
        });
        return criteria;
    }

    // function calculatePercentage(value) {
    //     const percentage = (value / 5) * 100
    //     return percentage.toFixed(1)
    // }

    if (!stay) return <section className="loading"><Loader /></section>
    const reviewsInputs = displayReviewsCriteria()
    const reviews = stay.reviews.length > 1 ? 'reviews' : 'review'
    const capitalizedReviewsString = reviews.charAt(0).toUpperCase() + reviews.slice(1)
    const randomDateJoined = utilService.getRandomMonthAndYear()
    const hostImgUrl = stay.host.isInDB ? stay.host.pictureUrl : userService.randomHostImg()

    return <>
        <div>
            <Helmet>
                <title>{stay.name}</title>
            </Helmet>
        </div>

        <section className="stay-details" id='photos'>
            {<DetailsHeader stay={stay} />}
            <section className='stay-review flex' >
                <h1>{stay.name}</h1>
                <section className='info-bar flex space-between align-center'>
                    <section className='info flex'>
                        <SvgHandler svgName={STAR} />
                        <span>{reviewService.getAverageReview(stay)}</span>
                        <span>•</span>
                        <span className='info-review'>{stay.reviews.length} {reviews}</span>
                        <span>•</span>
                        <span className='info-loc'>{stay.loc.city}, {stay.loc.country}</span>
                    </section>
                    <section className='btns flex'>
                        <div className='share-btn flex'>
                            <SvgHandler svgName={SHARE} />
                            <span>Share</span>
                            <div className="share-btn-overlay"></div>
                        </div>
                        <div className='save-btn flex'
                            // onClick={() => setIsLikeClicked(prevHeart => !prevHeart)}
                            onClick={(ev) => onLikeClicked(ev)}
                        >
                            <SvgHandler svgName={likeSvg} />
                            {
                                likeSvg === HEART_16 &&
                                <span>Save</span>
                            }
                            {
                                likeSvg === RED_HEART_16 &&
                                <span>Save</span>
                            }
                            <div className="save-btn-overlay"></div>
                        </div>
                    </section>
                </section>
            </section>
            <section className="img-container">
                {stay.imgUrls.slice(0, 5).map((url, index) => (
                    <div className="img" key={index}>
                        <img src={url} alt={`Image ${index}`} className="fade-image" />
                        <div className="overlay"></div>
                    </div>
                ))}
            </section>
            <section className='details-container'>
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
                        <img src={hostImgUrl} alt="host image" />
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

            {
                stay.reviews.length > 0 &&
                <StayReviews
                    stay={stay}
                    reviewsInputs={reviewsInputs}
                    reviewsToDisplay={reviewsToDisplay}
                />
            }

            <StayMap stay={stay} />
            <HostDetails
                stay={stay}
                hostImgUrl={hostImgUrl}
                randomDateJoined={randomDateJoined}
                capitalizedReviewsString={capitalizedReviewsString}
            />
            <ThingsToKnow stay={stay} />
        </section >
    </>
}