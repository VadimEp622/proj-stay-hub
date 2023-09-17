// Node Modules
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Services
import { reviewService } from '../services/review.service.js'
import { utilService } from '../services/util.service.js'
// import { socketService } from '../services/socket.service.js'

// Store
import { toggleWishlist } from '../store/user.actions.js'
import { setAppModal } from '../store/system.action.js'
import { SET_APP_MODAL_LOGIN } from '../store/system.reducer.js'

// Custom hooks
import useLoadStay from '../customHooks/useLoadStay.js'
import useStayDates from '../customHooks/useStayDates.js'

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


// TODO: at 790px screen width, turn stay-details into mobile
//     1. stay pictures only has 1 picture full screen width
//     2. rest of stay-details is at distance of 24px from left/right screen edge


export function StayDetails() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const { stayId } = useParams()
    const [stay, hostImgUrl] = useLoadStay(stayId)

    // TODO: remake useStayDates, to [selectedRange, setSelectedRange] = useStayDates(stay) (setSelectedRange will be changed in handleRangeSelect)
    const [checkIn, checkOut, selectedRange, handleDateChange] = useStayDates(stay)


    function isStayWishlist() {
        return loggedInUser?.wishlist?.some(wishlist => wishlist._id === stayId)
    }

    function onLikeClicked(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        if (!loggedInUser) {
            setAppModal(SET_APP_MODAL_LOGIN)
            return
        }
        toggleWishlist(loggedInUser, stay)
    }

    function handleRangeSelect(range) {
        console.log('range', range)
        if (!range) handleDateChange('', '')
        else {
            if (Date.parse(range.from) === Date.parse(range.to)) handleDateChange(range.from, '')
            else handleDateChange(range.from, range.to)
        }

    }

    // TODO: improve below function
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
    const averageReviewScore = reviewService.getAverageReview(stay)

    return (
        <section className="stay-details" id='photos'>
            <StayDetailsAltHeader stay={stay} loggedInUser={loggedInUser} />
            <StayTitle
                stay={stay}
                averageReviewScore={averageReviewScore}
                onLikeClicked={onLikeClicked}
                isStayWishlist={isStayWishlist}
            />
            <StayPhotos stay={stay} />
            <StaySummary
                stay={stay}
                hostImgUrl={hostImgUrl}
                randomDateJoined={randomDateJoined}
                selectedRange={selectedRange}
                checkIn={checkIn}
                checkOut={checkOut}

                handleDateChange={handleDateChange}

                handleRangeSelect={handleRangeSelect}
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
    )
}