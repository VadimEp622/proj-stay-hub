// Node Modules
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Services
import { reviewService } from '../services/review.service.js'
import { utilService } from '../services/util.service.js'
import { orderService } from '../services/order.service.js'
// import { socketService } from '../services/socket.service.js'

// Store
import { setOrder, toggleWishlist } from '../store/user.actions.js'
import { setAppModal } from '../store/system.action.js'
import { SET_APP_MODAL_LOGIN } from '../store/system.reducer.js'

// Custom hooks
import useLoadStay from '../customHooks/useLoadStay.js'
import useStayDates from '../customHooks/useStayDates.js'
import useStayGuests from '../customHooks/useStayGuests.js'
import useStayDetails from '../customHooks/useStayDetails.js'

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
import { stayService } from '../services/stay.service.js'



// TODO: at 790px screen width, turn stay-details into mobile
//     1. stay pictures only has 1 picture full screen width
//     2. rest of stay-details is at distance of 24px from left/right screen edge

// TODO: I made pricing change depending on guest amount because I spotted similar behavior in airbnb,
//    need to check again, if it's there, if it's only in some stays, or if it's in none at all,
//    and then decide if I want to keep such feature.


// TODO: when "selectedRange" has either "from" or "to", equal to an empty string,
//   1. hide pricing in orderContainer (in altHeader, display only price for SINGLE NIGHT, for ALL the guests) 
//   2. change "order" button in orderSidebar and altHeader to "Check Availability" button, which will later open a datePicker floating modal



// TODO: consider combining all those hooks into one hook, since they use data from loading a stay,
//    maybe something like:  [stay, reservation, setReservation] = useStayDetails(stayId)


export function StayDetails() {
    const navigate = useNavigate()
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const { stayId } = useParams()

    const [stay, hostImgUrl] = useLoadStay(stayId)
    const [guests, setGuests] = useStayGuests()
    const [checkIn, checkOut, selectedRange, setSelectedRange] = useStayDates(stay)
    const [orderDetails] = useStayDetails(stay, checkIn, checkOut, guests)


    function isStayWishlist() {
        return loggedInUser?.wishlist?.some(wishlist => wishlist._id === stayId)
    }

    function onCheckAvailabilityClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        console.log('hi from check availability')
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

    function onReserveClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        if (!loggedInUser) {
            setAppModal(SET_APP_MODAL_LOGIN)
        }
        else {
            const order = createOrder(orderDetails)
            console.log('order', order)
            setOrder(order)
            navigate(`/stay/book/${stay._id}`)
        }
    }

    function createOrder({ guestCount, price, nightsCount, serviceFee, cleaningFee }) {
        return {
            buyer: {
                _id: loggedInUser._id,
                fullname: loggedInUser.fullname,
                img: loggedInUser.imgUrl,
                joined: loggedInUser.joined ? loggedInUser.joined : utilService.getRandomMonthAndYear()
            },
            seller: {
                _id: stay.host._id,
                fullname: stay.host.fullname,
                img: hostImgUrl,
                joined: utilService.getRandomMonthAndYear()
            },
            checkIn,
            checkOut,
            nightsCount,
            guestCount,
            nightsPrice: nightsCount * stay.price,
            orderPrice: {
                price,
                serviceFee,
                cleaningFee,
                total: (price * nightsCount) + serviceFee + cleaningFee
            },
            stayDetails: {
                id: stay._id,
                image: stay.imgUrls[0],
                loc: stay.loc,
                summary: stay.summary,
                type: stay.type,
                rate: stay.reviews.rate,
                reviewsCount: stay.reviews.length
            },
            explore: orderService.getOrderExploreList(),
            status: "Pending",
            _id: utilService.makeId()// TODO: remove this, seems redundant
        }
    }

    function handleRangeSelect(range) {
        const newRange = { from: '', to: '' }
        if (range) {
            newRange.from = range.from
            newRange.to = range.to
            if (!range.from) newRange.from = ''
            if (!range.to) newRange.to = ''
            if (range.from && (Date.parse(range.from) === Date.parse(range.to))) {
                if ((Date.parse(selectedRange.from) === Date.parse(range.from)) && selectedRange.to === '') newRange.from = ''
                newRange.to = ''
            }
        } else {
            if (selectedRange.from && selectedRange.to) newRange.from = selectedRange.from
        }

        setSelectedRange(prev => ({ ...prev, ...newRange }))
    }


    if (!stay || !selectedRange || Object.keys(orderDetails).length === 0) return <section className='loading'><Loader /></section>

    const reviewScores = stayService.getStayReviewScores(stay.reviews)
    const randomDateJoined = utilService.getRandomMonthAndYear()
    const averageReviewScore = reviewService.getAverageReview(stay)

    return (
        <section className='stay-details' id='photos'>
            <StayDetailsAltHeader
                stay={stay}
                selectedRange={selectedRange}
                onReserveClick={onReserveClick}
                onCheckAvailabilityClick={onCheckAvailabilityClick}
            />
            <StayTitle
                stay={stay}
                averageReviewScore={averageReviewScore}
                onLikeClicked={onLikeClicked}
                isStayWishlist={isStayWishlist}
            />
            <StayPhotos stay={stay} />
            <StaySummary
                stay={stay} hostImgUrl={hostImgUrl}
                checkIn={checkIn} checkOut={checkOut} selectedRange={selectedRange} handleRangeSelect={handleRangeSelect}
                guests={guests} setGuests={setGuests}
                orderDetails={orderDetails}
                onCheckAvailabilityClick={onCheckAvailabilityClick} onReserveClick={onReserveClick}
            />
            {
                stay.reviews?.length > 0 &&
                <StayReviews
                    stay={stay}
                    reviewsInputs={reviewScores}
                    averageReviewScore={averageReviewScore}
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