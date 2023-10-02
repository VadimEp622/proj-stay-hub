// Services
import { reviewService } from '../../../../services/review.service.js'
import { STAR } from '../../../../services/svg.service.js'
import { utilService } from '../../../../services/util.service.js'

// Components
import SvgHandler from '../../../_reuseable-cmps/svg-handler.jsx'



export function CostAndReviewScore({ stay, orderDetails }) {
    return (
        <section className='cost-and-review-score flex space-between align-center flex-wrap col-gap8'>
            <article className='cost flex align-end'>
                <span className='fs22 lh26 ff-circular-semibold'>${utilService.addCommas(orderDetails.price)}</span>
                <span className='fs16 lh20'>night</span>
            </article>
            <article className='review-score flex align-center'>
                <SvgHandler svgName={STAR} />
                <span className='score fs14 lh18'>{reviewService.getAverageReview(stay)}</span>
                <span className='amount fs14 lh18'>{stay.reviews.length} reviews</span>
            </article>
        </section>
    )
}