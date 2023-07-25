import { reviewService } from "../../services/review.service.js";
import { STAR_16 } from "../../services/svg.service.js";
import { DetailsReviews } from "../details-reviews.jsx";
import SvgHandler from "../svg-handler.jsx";

export function StayReviews({ stay, reviewsInputs, reviewsToDisplay }) {

    function calculatePercentage(value) {
        const percentage = (value / 5) * 100
        return percentage.toFixed(1)
    }

    return (
        <section className="reviews-container " id='reviews'>
            <div className="review-title fs22 flex align-center"><SvgHandler svgName={STAR_16} />
                <span>{reviewService.getAverageReview(stay)} • {stay.reviews.length} {stay.reviews.length > 1 ? 'reviews' : 'review'} </span>
            </div>
            <div className="reviews-inputs">
                {Object.entries(reviewsInputs).map(([key, value]) => (
                    <div className="review-input" key={key}>
                        <div className="review-input-key">{key}</div>
                        <section className='review-rate flex align-center'>
                            <div className="progress-bar-container flex align-center">
                                <div className="review-input-bar" style={{ width: `${calculatePercentage(value)}%` }}></div>
                            </div>
                            <span className='fs12'>{value.toFixed(1)}</span>
                        </section>
                    </div>
                ))}
            </div>
            <section className='reviews-sum'>
                <DetailsReviews
                    reviewsToDisplay={reviewsToDisplay}
                    key={reviewsToDisplay.id}
                />
            </section>
        </section>
    )
}