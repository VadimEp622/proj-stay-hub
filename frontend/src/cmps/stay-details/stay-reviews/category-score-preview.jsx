import { utilService } from "../../../services/util.service"

export function CategoryScorePreview({ category, avgScore }) {

    return (
        <section className='category-score-preview flex align-center'>

            <div className='category-name fs16 lh20'>{category}</div>

            <section className='category-score flex align-center justify-end'>
                <section className='score-bar-container'>
                    <div className='score-bar' style={{ width: `${utilService.calculatePercentage(avgScore)}%` }}></div>
                </section>
                <span className='score-average ff-circular-semibold fs12'>{avgScore.toFixed(1)}</span>
            </section>

        </section>
    )
}