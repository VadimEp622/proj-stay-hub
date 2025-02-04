// Node modules
import { Link } from 'react-router-dom'

// Services
import { stayService } from '../../../services/stay.service'
import { utilService } from '../../../services/util.service.js'
import { HEART_24_WHITE_STROKE, HEART_24_WHITE_STROKE_RED_FILL, STAR_12 } from '../../../services/svg.service.js'

// Components
import { PreviewImageCarousel } from './stay-preview/preview-image-carousel.jsx'
import SvgHandler from '../../_reuseable-cmps/svg-handler.jsx'


// **TODO: stay-preview should be a dumb component(!!!), that only display data, and not calculate inside it with functions(!!!)

export function StayPreview({ stay, geoLocation, isMobile, lastStayElementRef = null, isStayWishlist, onLikeClicked }) {
    // function getResizeMobilePictures() {
    // if (!isMobile) return stay.imgUrls

    // const stayImages = stay.imgUrls.map((imgStr) => {
    //     const strIdx = imgStr.indexOf('/upload/') + 8
    //     const firstPart = imgStr.substring(0, strIdx)
    //     const middlePart = 'c_fit,w_500/'
    //     const lastPart = imgStr.substring(strIdx)
    //     return firstPart + middlePart + lastPart
    // })

    // return stayImages
    // }


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

    const stayScore = stayService.getStayScore(stay.reviews)

    return (
        <section className='stay-preview' key={stay._id} ref={lastStayElementRef}>
            <PreviewImageCarousel imgs={stay.imgUrls} stay={stay} />

            <section className='heart-svg' onClick={(ev) => onLikeClicked(ev, stay._id)}>
                <SvgHandler svgName={isStayWishlist(stay._id) ? HEART_24_WHITE_STROKE_RED_FILL : HEART_24_WHITE_STROKE} />
            </section>

            <Link to={`/stay/${stay._id}`}>
                <section className='preview-info fs15'>

                    <section className='preview-header flex space-between align-center'>
                        <p className='ff-circular-semibold lh19'>{stay.loc.city}, {stay.loc.country}</p>
                        <p className='review-score flex align-baseline lh19'>
                            <SvgHandler svgName={STAR_12} />
                            <span className='lh19'>{stayScore}</span>
                        </p>
                    </section>

                    <p className='type-or-distance lh19'>
                        {
                            geoLocation.loaded && geoLocation?.coordinates
                                ? getDistance()
                                : stay.type || 'Other'
                        }
                    </p>

                    <p className='date-range lh19'>{dateRange}</p>

                    <p className='price-preview lh19'>
                        <span className='ff-circular-semibold'>{`$${utilService.addCommas(stay.price)} `}</span>
                        night
                    </p>

                </section>
            </Link>
        </section>
    )
}