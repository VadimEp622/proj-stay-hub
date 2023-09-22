// Components
import { StayReviewList } from './stay-reviews/stay-review-list.jsx'
import { StayReviewsHeader } from './stay-reviews/stay-reviews-header.jsx'
import { StayReviewsScoreList } from './stay-reviews/stay-reviews-score-list.jsx'


// TODO: organize this cmp:
//         1. restructure styling
//         2. restructure cmp
//         3. make review list, and review preview cmps


export function StayReviews({ stay, reviewsInputs, averageReviewScore }) {

    const reviewsToDisplay = stay.reviews.slice(0, 6)

    return (
        <section className='stay-reviews-container' id='reviews'>
            <StayReviewsHeader stay={stay} averageReviewScore={averageReviewScore} />
            <StayReviewsScoreList reviewsInputs={reviewsInputs} />


            <StayReviewList
                reviewsToDisplay={reviewsToDisplay}
                key={reviewsToDisplay.id}
            />
        </section>
    )
}