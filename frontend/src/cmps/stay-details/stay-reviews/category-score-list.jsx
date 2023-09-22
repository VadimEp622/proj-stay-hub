import { CategoryScorePreview } from "./category-score-preview"

export function CategoryScoreList({ stayCategoryScores }) {

    return (
        <section className='category-score-list'>
            {Object.entries(stayCategoryScores).map(([key, value]) => (
                <CategoryScorePreview key={key} category={key} avgScore={value} />
            ))}
        </section>
    )
}