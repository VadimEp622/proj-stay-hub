import { reviewService } from "../../../services/review.service"
import { userService } from "../../../services/user.service"

export function StayReviewPreview({ review }) {

    const reviewerPicUrl = userService.randomHostImg()
    const reviewerName = review.by.fullname
    const reviewDate = reviewService.formatDateString(review.at)

    return (
        <section className='review-container'>
            <section className='mini-user flex align-end'>
                <img src={reviewerPicUrl} alt='host' />
                <section>
                    <h4 className='fs16 lh20'>{reviewerName}</h4>
                    <span className='fs14 lh20'>{reviewDate}</span>
                </section>
            </section>

            <section className='review-content-container fs16'>
                <p>{review.txt}</p>
            </section>
        </section>
    )
}