import { reviewService } from "../services/review.service";
import { utilService } from "../services/util.service";
import star from '../assets/img/star.svg'
export function StayPreview({ stay }) {


    return (
        <section className="stay-preview" key={stay._id}>
            <div className="img-container">
                <img src={stay.imgUrls[0]} alt="stay-image" />
            </div>
            <div className="preview-info">
                <div className="preview-header">
                    <p>{stay.loc.city}, {stay.loc.country}</p>
                    <p className="review-rate"><img src={star} alt="star" /><span>{reviewService.getAverageReview(stay)}</span></p>
                </div>
                <p>{utilService.getFormattedTimeRange(stay.checkIn, stay.checkOut)}</p>
                <p>${stay.price.toLocaleString()} night</p>
            </div>
        </section>
    )
}
