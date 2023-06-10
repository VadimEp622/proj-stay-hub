import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"


// import star from '../assets/img/star.svg'


import { utilService } from "../services/util.service.js"
import { reviewService } from "../services/review.service.js"
import { HEART, STAR, WHITE_HEART } from "../services/svg.service.js"


import { setModal } from "../store/stay.actions.js"
import { AddToWishlist, removeFromWishlist } from "../store/user.actions.js"


import SvgHandler from "./svg-handler.jsx"
import { PreviewImageCarousel } from "./preview-image-carousel.jsx"


export function StayPreview({ stay }) {

    const [isLikeClicked, setIsLikeClicked] = useState(false)
    const likeSVG = isLikeClicked ? 'heart-red' : 'heart-white'
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const wishedListItems = useSelector(storeState => storeState.userModule.user?.wishlist)
    const location = useLocation()
    const isWishlistPage = location.pathname.includes('/wishlist')


    function onLikeClicked(ev) {
        if (ev) {
            ev.preventDefault()
            ev.stopPropagation()
        }
        if (!loggedInUser) {
            setModal('logIn')
            return
        }
        if (likeSVG === 'heart-red') removeFromWishlist(stay._id)
        else {
            AddToWishlist(stay)
        }
        setIsLikeClicked(prevHeart => !prevHeart)
    }

    useEffect(() => {
        const likedId = wishedListItems?.some((wishlist) => wishlist._id === stay._id)
        setIsLikeClicked(likedId)
    }, [wishedListItems, stay._id])

    const bedrooms = stay.bedrooms > 1 ? 'bedrooms' : 'bedroom'

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
                        <p className="review-rate"><SvgHandler svgName={STAR} /><span>{reviewService.getAverageReview(stay)}</span></p>
                    </div>
                    <div className="stay-info">
                        {!isWishlistPage ? <p>Lorem, ipsum dolor.</p> : <p>{stay.type}</p>}
                        {isWishlistPage ? <p>{stay.bedrooms} {bedrooms} </p> : ''}
                        <p>{utilService.getFormattedTimeRange(stay.checkIn, stay.checkOut)}</p>
                        <p className="price-preview"><span>${stay.price.toLocaleString()}</span> night</p>
                    </div>
                </div>
            </Link>
        </section>
    )
}
