// Node Modules
import { useEffect, useState} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

// Services
import { userService } from '../services/user.service.js'
import { stayService } from "../services/stay.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { reviewService } from '../services/review.service.js'
import { utilService } from '../services/util.service.js'
import { HEART_16, RED_HEART_16} from '../services/svg.service.js'
// import { socketService } from '../services/socket.service.js'

// Store
import { AddToWishlist, removeFromWishlist } from '../store/user.actions.js'

// Components
import { Loader } from '../cmps/_reuseable-cmps/loader.jsx'
import { StayDetailsAltHeader } from '../cmps/stay-details/stay-details-alt-header.jsx'
import { ThingsToKnow } from '../cmps/stay-details/stay-things-to-know.jsx'
import { HostDetails } from '../cmps/stay-details/stay-host-details.jsx'
import { StayMap } from '../cmps/stay-details/stay-map.jsx'
import { StayReviews } from '../cmps/stay-details/stay-reviews.jsx'
import { StayTitle } from '../cmps/stay-details/stay-title.jsx'
import { StaySummary } from '../cmps/stay-details/stay-summary.jsx'
import { StayPhotos } from '../cmps/stay-details/stay-photos.jsx'


export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const navigate = useNavigate()
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
    const randomDateJoined = utilService.getRandomMonthAndYear()
    const hostImgUrl = stay.host.isInDB ? stay.host.pictureUrl : userService.randomHostImg()
    const averageReviewScore = reviewService.getAverageReview(stay)

    return <>
        <section className="stay-details" id='photos'>
            <StayDetailsAltHeader stay={stay} loggedInUser={loggedInUser} />
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
                stay.reviews?.length > 0 &&
                <StayReviews
                    stay={stay}
                    reviewsInputs={reviewsInputs}
                />
            }
            <StayMap stay={stay} />
            <HostDetails
                stay={stay}
                hostImgUrl={hostImgUrl}
                randomDateJoined={randomDateJoined}
            />
            <ThingsToKnow stay={stay} />
        </section >
    </>
}