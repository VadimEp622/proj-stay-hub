import { StayReviewPreview } from './stay-review-preview.jsx'


// TODO: consider making a stay-review modal with grayed out background for all stay's reviews


export function StayReviewList({ reviewsToDisplay }) {
  return (
    <section className='stay-review-list'>
      {reviewsToDisplay.map((review, idx) =>
        <StayReviewPreview key={idx} review={review} />
      )}
    </section>
  )
}