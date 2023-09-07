// Node modules
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

// Services
import { utilService } from "../../../services/util.service.js"
import { reviewService } from "../../../services/review.service.js"
import { HEART_24_WHITE_STROKE, HEART_24_WHITE_STROKE_RED_FILL, STAR_12 } from "../../../services/svg.service.js"

// Store
import { toggleWishlist } from "../../../store/user.actions.js"
import { SET_APP_MODAL_LOGIN } from "../../../store/system.reducer.js"
import { setAppModal } from "../../../store/system.action.js"

// Components
import { PreviewImageCarousel } from "./stay-preview/preview-image-carousel.jsx"
import SvgHandler from "../../_reuseable-cmps/svg-handler.jsx"

// stay-preview.jsx:78
// Error getting user location: GeolocationPositionErrorcode: 1message: "User denied Geolocation"[[Prototype]]: GeolocationPositionError
// (anonymous) @ stay-preview.jsx:78
// TODO-high-priority: find out why stay-preview asks for geolocation, and upon getting denied, spams with the above console.logs!

// TODO-low-priority: distance from user suddenly gets changed, a few seconds after loading

// **TODO: stay-preview should be a dumb component(!!!), that only display data, and not calculate inside it with functions(!!!)


export function StayPreview({ stay }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const location = useLocation()
    const isWishlistPage = location.pathname.includes('/wishlist')
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)


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




    if ("geolocation" in navigator && !isWishlistPage) {
        navigator.geolocation.watchPosition(
            function (position) {
                setLat(position.coords.latitude)
                setLng(position.coords.longitude)
            },
            function (error) {
                console.error("Error getting user location:", error)
            }
        )
    }

    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371 // km
        var dLat = toRad(lat2 - lat1)
        var dLon = toRad(lon2 - lon1)
        lat1 = toRad(lat1)
        lat2 = toRad(lat2)

        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        var d = R * c
        return utilService.addCommas(d)
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180
    }

    // TODO: make it so that if user filtered by dates, don't display range for dates before those filtered dates,
    //   in stay-preview
    const dateRange = utilService.getStayPreviewDateRange(
        stay.availableDates[0].daysFromToday,
        stay.availableDates[0].until
    )
    const distanceFromUser = calcCrow(lat, lng, stay.loc.lat, stay.loc.lan)
    const averageReviewScore = reviewService.getAverageReview(stay)
    return (
        <section className="stay-preview" key={stay._id}>

            <section className="img-container">
                <PreviewImageCarousel imgs={stay.imgUrls} stay={stay} />
            </section>

            <section className="heart-svg" onClick={(ev) => onLikeClicked(ev)}>
                <SvgHandler svgName={isStayWishlist() ? HEART_24_WHITE_STROKE_RED_FILL : HEART_24_WHITE_STROKE} />
            </section>

            <Link to={`/stay/${stay._id}`}>
                <section className="preview-info">

                    <article className="preview-header">
                        <p>{stay.loc.city}, {stay.loc.country}</p>
                        <p className="review-rate"><SvgHandler svgName={STAR_12} /><span>{averageReviewScore}</span></p>
                    </article>

                    <article className="stay-info">
                        {!isWishlistPage ? (
                            <p>
                                {filterBy.labels ? filterBy.labels : `${distanceFromUser} kilometers away`}
                            </p>
                        ) : (
                            <p>{stay.type}</p>
                        )}
                        <p>{dateRange}</p>
                        <p className="price-preview"><span>${utilService.addCommas(stay.price)}</span> night</p>
                    </article>

                </section>
            </Link>
        </section>
    )
}