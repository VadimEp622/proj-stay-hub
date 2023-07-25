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
import { StayTitle } from '../cmps/stay-details/stay-title.jsx'
import { StaySummary } from '../cmps/stay-details/stay-summary.jsx'
import { StayPhotos } from '../cmps/stay-details/stay-photos.jsx'

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


    if (!stay) return <section className="loading"><Loader /></section>
    const reviewsInputs = displayReviewsCriteria()
    const reviews = stay.reviews.length > 1 ? 'reviews' : 'review'
    const capitalizedReviewsString = reviews.charAt(0).toUpperCase() + reviews.slice(1)
    const randomDateJoined = utilService.getRandomMonthAndYear()
    const hostImgUrl = stay.host.isInDB ? stay.host.pictureUrl : userService.randomHostImg()
    const averageReviewScore = reviewService.getAverageReview(stay)

    return <>
        <section className="stay-details" id='photos'>
            {<DetailsHeader stay={stay} />}
            <StayTitle
                stay={stay}
                averageReviewScore={averageReviewScore}
                likeSvg={likeSvg}
                onLikeClicked={onLikeClicked}
            />
            <StayPhotos stay={stay} />
            <StaySummary
                stay={stay}
                hostImgUrl={hostImgUrl}
                randomDateJoined={randomDateJoined}
            />
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