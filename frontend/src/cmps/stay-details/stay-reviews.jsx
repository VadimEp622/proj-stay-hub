// Services
import { reviewService } from '../../services/review.service.js'
import { STAR_16 } from '../../services/svg.service.js'

// Components
import { StayReviewList } from './stay-reviews/stay-review-list.jsx'
import SvgHandler from '../_reuseable-cmps/svg-handler.jsx'


// TODO: organize this cmp:
//         1. restructure styling
//         2. restructure cmp
//         3. make review list, and review preview cmps


export function StayReviews({ stay, reviewsInputs }) {

    const reviewsToDisplay = stay.reviews.slice(0, 6)

    function calculatePercentage(value) {
        const percentage = (value / 5) * 100
        return percentage.toFixed(1)
    }

    return (
        <section className='stay-reviews-container' id='reviews'>

            <section className='review-title fs22 flex align-center'>
                <SvgHandler svgName={STAR_16} />
                <span>{reviewService.getAverageReview(stay)} • {stay.reviews.length} {stay.reviews.length > 1 ? 'reviews' : 'review'} </span>
            </section>

            <section className='review-average-score-list'>
                {Object.entries(reviewsInputs).map(([key, value]) => (
                    <section className='review-average-score-item' key={key}>

                        <div className='review-input-key fs16'>{key}</div>

                        <section className='review-item-score flex align-center justify-end'>
                            <section className='score-bar-container flex align-center'>
                                <div className='score-bar' style={{ width: `${calculatePercentage(value)}%` }}></div>
                            </section>
                            <span className='score-average fs12'>{value.toFixed(1)}</span>
                        </section>

                    </section>
                ))}
            </section>

            <StayReviewList
                reviewsToDisplay={reviewsToDisplay}
                key={reviewsToDisplay.id}
            />
        </section>
    )
}