import { STAR_16 } from "../../../services/svg.service"
import SvgHandler from "../../_reuseable-cmps/svg-handler"

export function StayReviewsHeader({ stay, averageReviewScore }) {

    const reviewCount = stay.reviews.length
    return (
        <section className='stay-reviews-header fs22 lh26 flex align-center'>
            <SvgHandler svgName={STAR_16} />
            <section className='stay-score-and-review-count'>
                <span className='ff-circular-semibold'>{averageReviewScore}</span>
                <span>{` • `}</span>
                <span className='ff-circular-semibold'>{`${reviewCount} ${reviewCount > 1 ? 'reviews' : 'review'}`}</span>
            </section>
        </section>
    )
}