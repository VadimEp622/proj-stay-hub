import { userService } from "../../../services/user.service"
import { utilService } from "../../../services/util.service"

export function StayReviewPreview({ review }) {

    const reviewerPicUrl = userService.randomHostImg()
    const reviewerName = review.by.fullname
    const reviewDate = utilService.getFormattedDate(review.at, { month: 'long', year: 'numeric' })

    return (
        <section className='stay-review-preview'>
            <section className='mini-user flex align-end'>
                <img src={reviewerPicUrl} alt='host' />
                <section>
                    <h4 className='fs16 lh20'>{reviewerName}</h4>
                    <span className='fs14 lh20'>{reviewDate}</span>
                </section>
            </section>

            <section className='review-content fs16'>
                <p>{review.txt}</p>
            </section>
        </section>
    )
}