// Node Modules
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// Services
import { utilService } from '../services/util.service.js'
import { orderService } from '../services/order.service.js'
import { stayService } from '../services/stay.service'
import { SET_APP_MODAL_LOGIN } from '../services/resources-strings.service.js'

// Store
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { systemSetAppModal } from '../store/systemSlice'
import { userSetOrder } from '../store/userSlice'
import { toggleWishlistStay } from '../store/wishlist-stay.slice'

// Custom hooks
import useIsMobile from '../customHooks/useIsMobile.js'
import useStayDetails from '../customHooks/useStayDetails.js'
import useStayDetailsIntersectionObserver from '../customHooks/useStayDetailsIntersectionObserver.js'

// Components
import { Loader } from '../cmps/_reuseable-cmps/loader.jsx'
import { StayDetailsNavReserveSticky } from '../cmps/stay-details/stay-details-nav-reserve-sticky.jsx'
import { ThingsToKnow } from '../cmps/stay-details/stay-things-to-know.jsx'
import { HostDetails } from '../cmps/stay-details/stay-host-details.jsx'
import { StayMap } from '../cmps/stay-details/stay-map.jsx'
import { StayReviews } from '../cmps/stay-details/stay-reviews.jsx'
import { StayTitle } from '../cmps/stay-details/stay-title.jsx'
import { StaySummary } from '../cmps/stay-details/stay-summary.jsx'
import { StayPhotos } from '../cmps/stay-details/stay-photos.jsx'
import { StayDetailsMobileReturnHeader } from '../cmps/stay-details/stay-details-mobile-return-header.jsx'


// --------------------------------------------
// --------------- Low Priority ---------------
// --------------------------------------------
// TODO: I made pricing change depending on guest amount because I spotted similar behavior in airbnb,
//    need to check again, if it's there, if it's only in some stays, or if it's in none at all,
//    and then decide if I want to keep such feature.
// --------------------------------------------
// --------------------------------------------



export function StayDetails() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { stayId } = useParams()
    const loggedInUser = useAppSelector(storeState => storeState.userModule.user)
    const wishlistIds = useAppSelector(storeState => storeState.stayModule.wishlistIds)
    const isMobile = useIsMobile()

    const [
        isLoading,
        stay, hostImgUrl,
        checkIn, checkOut, selectedRange, setSelectedRange,
        guests, setGuests,
        orderDetails,
    ] = useStayDetails(stayId)
    useStayDetailsIntersectionObserver(isLoading || isMobile)



    function isStayWishlist() {
        return loggedInUser ? wishlistIds.some(wishlistId => wishlistId === stayId) : false
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
            dispatch(systemSetAppModal(SET_APP_MODAL_LOGIN))
            return
        }
        dispatch(toggleWishlistStay({ stayId }))
    }

    function onReserveClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        if (!loggedInUser) {
            dispatch(systemSetAppModal(SET_APP_MODAL_LOGIN))
        }
        else {
            const order = createOrder(orderDetails)
            dispatch(userSetOrder(order))
            navigate(`/stay/book/${stay._id}`)
        }
    }

    function onReturnClicked(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        navigate('/')
    }

    function createOrder({ guestCount, singleNightPrice, nightsCount, serviceFee, cleaningFee }) {
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
            orderDetails: {
                checkIn,
                checkOut,
                nightsCount,
                guestCount,
                singleNightPrice
            },
            orderPrice: {
                price: (singleNightPrice * nightsCount),
                serviceFee,
                cleaningFee,
                total: (singleNightPrice * nightsCount) + serviceFee + cleaningFee
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


    if (isLoading) return <Loader />

    const stayCategoryScores = stayService.getStayCategoryScores(stay.reviews)
    const randomDateJoined = utilService.getRandomMonthAndYear()
    const averageReviewScore = stayService.getStayScore(stay.reviews)

    return (
        <section className={`stay-details full details-layout${isMobile ? ' mobile' : ''}`} id='photos'>
            <Helmet>
                {stay?.name && <title>{stay.name}</title>}
                {stay?.host?.fullname && <meta name='description' content={`Entire villa hosted by ${stay.host.fullname}`} />}
            </Helmet>
            {isMobile &&
                <StayDetailsMobileReturnHeader
                    onLikeClicked={onLikeClicked}
                    isStayWishlist={isStayWishlist}
                    onReturnClicked={onReturnClicked}
                />
            }
            <StayDetailsNavReserveSticky
                stay={stay}
                selectedRange={selectedRange}
                onReserveClick={onReserveClick}
                onCheckAvailabilityClick={onCheckAvailabilityClick}
                isMobile={isMobile}
            />
            <section className='stay-photos-title-container full'>
                <StayPhotos photos={stay.imgUrls} isMobile={isMobile} />
                <StayTitle
                    stay={stay}
                    averageReviewScore={averageReviewScore}
                    onLikeClicked={onLikeClicked}
                    isStayWishlist={isStayWishlist}
                    isMobile={isMobile}
                />
            </section>
            <StaySummary
                stay={stay} hostImgUrl={hostImgUrl}
                checkIn={checkIn} checkOut={checkOut} selectedRange={selectedRange} handleRangeSelect={handleRangeSelect}
                guests={guests} setGuests={setGuests}
                orderDetails={orderDetails}
                onCheckAvailabilityClick={onCheckAvailabilityClick} onReserveClick={onReserveClick}
                isMobile={isMobile}
            />
            {
                stay.reviews?.length > 0 &&
                <StayReviews
                    stay={stay}
                    stayCategoryScores={stayCategoryScores}
                    averageReviewScore={averageReviewScore}
                />
            }
            <StayMap stay={stay} />
            <HostDetails
                stay={stay}
                hostImgUrl={hostImgUrl}
                randomDateJoined={randomDateJoined}
            />
            <ThingsToKnow isMobile={isMobile} checkIn={checkIn} />
        </section >
    )
}