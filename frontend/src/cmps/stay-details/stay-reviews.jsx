import { StayReviewList } from './stay-reviews/stay-review-list.jsx'
import { StayReviewsHeader } from './stay-reviews/stay-reviews-header.jsx'
import { CategoryScoreList } from './stay-reviews/category-score-list.jsx'


// TODO: build stay-reviews modal with gray background, which can be viewed with button or URL link and will have ALL 
//   current stays reviews


export function StayReviews({ stay, stayCategoryScores, averageReviewScore }) {

    const reviewsToDisplay = stay.reviews.slice(0, 6)

    return (
        <section className='stay-reviews-container' id='reviews'>
            <StayReviewsHeader
                stay={stay}
                averageReviewScore={averageReviewScore}
            />
            <CategoryScoreList
                stayCategoryScores={stayCategoryScores}
            />
            <StayReviewList
                reviewsToDisplay={reviewsToDisplay}
                key={reviewsToDisplay.id}
            />
        </section>
    )
}