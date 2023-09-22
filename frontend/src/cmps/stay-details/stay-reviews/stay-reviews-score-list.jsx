import { utilService } from "../../../services/util.service"

export function StayReviewsScoreList({ reviewsInputs }) {

    return (
        <section className='review-average-score-list'>
            {Object.entries(reviewsInputs).map(([key, value]) => (
                <section className='review-average-score-item flex align-center' key={key}>

                    <div className='review-input-key fs16 lh20'>{key}</div>

                    <section className='review-item-score flex align-center justify-end'>
                        <section className='score-bar-container'>
                            <div className='score-bar' style={{ width: `${utilService.calculatePercentage(value)}%` }}></div>
                        </section>
                        <span className='score-average ff-circular-semibold fs12'>{value.toFixed(1)}</span>
                    </section>

                </section>
            ))}
        </section>
    )
}