// Services
import { CHECKIN, KEY, LOCATION } from "../../../services/svg.service.js"

// Components
import { HighlightPreview } from "./highlight-preview.jsx"


export function HighlightList() {


    const highlightList = [
        {
            label: LOCATION,
            title: 'Great location',
            content: '100% of recent guests gave the location a 5-star rating.'
        },
        {
            label: KEY,
            title: 'Self check-in',
            content: 'Check yourself in with the lockbox.'
        },
        {
            label: CHECKIN,
            title: 'Free cancellation for 48 hours.',
            content: ''
        },
    ]

    return (
        <section className='highlight-list flex column'>
            {highlightList.map(highlight =>
                <HighlightPreview key={highlight.title} highlight={highlight} />
            )}
        </section>
    )
}