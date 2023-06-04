import { reviewService } from "../services/review.service";
import { utilService } from "../services/util.service";
// import star from '../assets/img/star.svg'
import SvgHandler from "./svg-handler";
import { HEART, STAR, WHITE_HEART } from "../services/svg.service";
import { CarouselImage } from "./carousel";
import { Link } from "react-router-dom";
import { useState } from "react";
export function StayPreview({ stay }) {

    const [isHeartClicked, setIsHeartClicked] = useState(false)
    const heartSvg = isHeartClicked ? 'heart-red' : 'heart-white'

    return (
        <section className="stay-preview" key={stay._id}>
            <div className="img-container">
                <CarouselImage imgs={stay.imgUrls} stay={stay} />
            </div>
            <div className="heart-svg" onClick={() => setIsHeartClicked(prevHeart => !prevHeart)}>
                <SvgHandler svgName={heartSvg} />
            </div>
            <Link to={`/stay/${stay._id}`}>
                <div className="preview-info">
                    <div className="preview-header">
                        <p>{stay.loc.city}, {stay.loc.country}</p>
                        <p className="review-rate"><SvgHandler svgName={STAR} /><span>{reviewService.getAverageReview(stay)}</span></p>
                    </div>
                    <div className="stay-info">
                        <p>{utilService.getFormattedTimeRange(stay.checkIn, stay.checkOut)}</p>
                        <p>Lorem, ipsum dolor.</p>
                        <p className="price-preview"><span>${stay.price.toLocaleString()}</span> night</p>
                    </div>
                </div>
            </Link>
        </section>
    )
}
