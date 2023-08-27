// Node modules
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

// Services
import { utilService } from "../../../services/util.service.js"
import { reviewService } from "../../../services/review.service.js"
import { userService } from "../../../services/user.service.js"
import { STAR_12 } from "../../../services/svg.service.js"

// Store
import { AddToWishlist, removeFromWishlist } from "../../../store/user.actions.js"
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
    const [isLikeClicked, setIsLikeClicked] = useState(false)
    const likeSVG = isLikeClicked ? 'heart-red' : 'heart-white'
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const wishedListItems = useSelector(storeState => storeState.userModule.user?.wishlist)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const location = useLocation()
    const isWishlistPage = location.pathname.includes('/wishlist')
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)


    async function onLikeClicked(ev) {
        console.log(likeSVG)
        if (ev) {
            ev.preventDefault()
            ev.stopPropagation()
        }
        if (!loggedInUser) {
            setAppModal(SET_APP_MODAL_LOGIN)
            return
        }
        if (likeSVG === 'heart-red') {
            console.log('hi')
            removeFromWishlist(stay)
            userService.update(loggedInUser._id, 'wishlist', stay, 'remove')
            setIsLikeClicked(true)
        }
        else {
            AddToWishlist(stay)
            console.log('hi')
            await userService.update(loggedInUser._id, 'wishlist', stay)
            setIsLikeClicked(false)
        }
        // setIsLikeClicked(prevHeart => !prevHeart)
    }

    useEffect(() => {
        const likedId = wishedListItems?.some((wishlist) => wishlist._id === stay._id)
        setIsLikeClicked(likedId)
    }, [wishedListItems, stay._id, isLikeClicked])

    const bedrooms = stay.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'
    const bathrooms = stay.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'

    let phrase

    if (filterBy.from && filterBy.to) {
        if (stay.bedrooms === 0 || isNaN(stay.bedrooms) || typeof stay.bedrooms === 'undefined') {
            phrase = stay.bathrooms + " " + bathrooms
        } else if (stay.bedrooms) {
            phrase = stay.bedrooms + " " + bedrooms
        }
    } else {
        phrase = utilService.getFormattedTimeRange(stay.availableDates[0].from, stay.availableDates[0].to);
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


    const distanceFromUser = calcCrow(lat, lng, stay.loc.lat, stay.loc.lan)
    const averageReviewScore = reviewService.getAverageReview(stay)
    return (
        <section className="stay-preview" key={stay._id}>
            <div className="img-container">
                <PreviewImageCarousel imgs={stay.imgUrls} stay={stay} />
            </div>
            <div className="heart-svg" onClick={(ev) => onLikeClicked(ev)}>
                <SvgHandler svgName={likeSVG} />
            </div>
            <Link to={`/stay/${stay._id}`}>
                <div className="preview-info">
                    <div className="preview-header">
                        <p>{stay.loc.city}, {stay.loc.country}</p>
                        <p className="review-rate"><SvgHandler svgName={STAR_12} /><span>{averageReviewScore}</span></p>
                    </div>
                    <div className="stay-info">
                        {!isWishlistPage ? (
                            <p>
                                {filterBy.labels ? filterBy.labels : `${distanceFromUser} kilometers away`}
                            </p>
                        ) : (
                            <p>{stay.type}</p>
                        )}
                        {isWishlistPage ? <p>{stay.bedrooms} {bedrooms} </p> : ''}
                        <p>{phrase}</p>
                        <p className="price-preview"><span>${utilService.addCommas(stay.price)}</span> night</p>
                    </div>
                </div>
            </Link>
        </section>
    )
}