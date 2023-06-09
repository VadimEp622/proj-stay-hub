import { reviewService } from "../services/review.service";
import { utilService } from "../services/util.service";
// import star from '../assets/img/star.svg'
import SvgHandler from "./svg-handler";
import { HEART, STAR, WHITE_HEART } from "../services/svg.service";
import { CarouselImage } from "./carousel";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { setModal } from "../store/stay.actions";
import { AddToWishlist, removeFromWishlist } from "../store/user.actions";
import { useEffect } from "react"

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

    return (
        <section className="stay-preview" key={stay._id}>
            <div className="img-container">
                <CarouselImage imgs={stay.imgUrls} stay={stay} />
            </div>
            <div className="heart-svg" onClick={(ev) => onLikeClicked(ev)}>
                <SvgHandler svgName={likeSVG} />
            </div>
            <Link to={`/stay/${stay._id}`} target="_blank">
                <div className="preview-info">
                    <div className="preview-header">
                        <p>{stay.loc.city}, {stay.loc.country}</p>
                        <p className="review-rate"><SvgHandler svgName={STAR} /><span>{reviewService.getAverageReview(stay)}</span></p>
                    </div>
                    <div className="stay-info">
                    {!isWishlistPage ? <p>Lorem, ipsum dolor.</p> : <p>{stay.type}</p> }
                        <p>{utilService.getFormattedTimeRange(stay.checkIn, stay.checkOut)}</p>
                        <p className="price-preview"><span>${stay.price.toLocaleString()}</span> night</p>
                    </div>
                </div>
            </Link>
        </section>
    )
}
