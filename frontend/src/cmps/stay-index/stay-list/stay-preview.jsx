// Node modules
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Services
import { utilService } from '../../../services/util.service.js'
import { reviewService } from '../../../services/review.service.js'
import { HEART_24_WHITE_STROKE, HEART_24_WHITE_STROKE_RED_FILL, STAR_12 } from '../../../services/svg.service.js'

// Store
import { toggleWishlist } from '../../../store/user.actions.js'
import { SET_APP_MODAL_LOGIN } from '../../../store/system.reducer.js'
import { setAppModal } from '../../../store/system.action.js'

// Components
import { PreviewImageCarousel } from './stay-preview/preview-image-carousel.jsx'
import SvgHandler from '../../_reuseable-cmps/svg-handler.jsx'


// **TODO: stay-preview should be a dumb component(!!!), that only display data, and not calculate inside it with functions(!!!)

export function StayPreview({ stay, geoLocation }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const location = useLocation()
    const isWishlistPage = location.pathname.includes('/wishlist')


    function isStayWishlist() {
        return loggedInUser?.wishlist?.some(wishlist => wishlist._id === stay._id)
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

    function calcCrow(lat1, lon1, lat2, lon2) {
        const R = 6371 // km
        const dLat = toRad(lat2 - lat1)
        const dLon = toRad(lon2 - lon1)
        lat1 = toRad(lat1)
        lat2 = toRad(lat2)

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const d = R * c
        return utilService.addCommas(d)
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180
    }

    function getDistance() {
        const distance = calcCrow(geoLocation.coordinates.lat, geoLocation.coordinates.lng, stay.loc.lat, stay.loc.lan)
        return `${distance} kilometers away`
    }


    // TODO: make it so that if user filtered by dates, don't display range for dates before those filtered dates,
    //   in stay-preview
    const dateRange = utilService.getStayPreviewDateRange(
        stay.availableDates[0].daysFromToday,
        stay.availableDates[0].until
    )
    const averageReviewScore = reviewService.getAverageReview(stay)
    return (
        <section className='stay-preview' key={stay._id}>

            <section className='img-container'>
                <PreviewImageCarousel imgs={stay.imgUrls} stay={stay} />
            </section>

            <section className='heart-svg' onClick={(ev) => onLikeClicked(ev)}>
                <SvgHandler svgName={isStayWishlist() ? HEART_24_WHITE_STROKE_RED_FILL : HEART_24_WHITE_STROKE} />
            </section>

            <Link to={`/stay/${stay._id}`}>
                <section className='preview-info'>

                    <article className='preview-header'>
                        <p>{stay.loc.city}, {stay.loc.country}</p>
                        <p className='review-rate'>
                            <SvgHandler svgName={STAR_12} />
                            <span>{averageReviewScore}</span>
                        </p>
                    </article>

                    <article className='stay-info'>
                        {!isWishlistPage ? (
                            <p>
                                {
                                    geoLocation.loaded && geoLocation?.coordinates
                                        ? getDistance()
                                        : stay.type || 'Other'
                                }
                            </p>
                        ) : (
                            <p>{stay.type}</p>
                        )}
                        <p>{dateRange}</p>
                        <p className='price-preview'><span>${utilService.addCommas(stay.price)}</span> night</p>
                    </article>

                </section>
            </Link>
        </section>
    )
}