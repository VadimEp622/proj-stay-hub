import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { stayService } from "../services/stay.service.local.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { reviewService } from '../services/review.service.js'

import SvgHandler from '../cmps/svg_handler.jsx'
import { HEART, SHARE, STAR } from '../services/svg.service.js'

export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStay()
    }, [stayId])

    function loadStay() {
        console.log(stayId);
        stayService.getById(stayId)
            .then(setStay)
            .catch((err) => {
                console.log('Had issues in stay details', err)
                showErrorMsg('Cannot load stay')
                navigate('/stay')
            })
    }

    if (!stay) return <div>Loading...</div>
    return <section className="stay-details"

        // possible to change in place other than stays stay-index, but needs some work
        // style={{ display: "grid", gridTemplateRows: "150px 1fr 150px" }}

    >
        <section className='stay-review flex'>
            <h1>{stay.name}</h1>
            <section className='info-bar flex space-between align-center'>
                <section className='info flex'>
                    <SvgHandler svgName={STAR} />
                    <span>{reviewService.getAverageReview(stay)}</span>
                    <span>{stay.reviews.length} Review</span>
                    <span>{stay.loc.city}, {stay.loc.country}</span>
                </section>
                <section className='btns flex'>
                    <div className='share-btn flex'>
                        <SvgHandler svgName={SHARE} />
                        <span>Share</span>
                    </div>
                    <div className='save-btn flex'>
                        {/* <SvgHandler svgName={HEART} /> */}
                        <span>Save</span>
                    </div>
                </section>
            </section>
        </section>
        <section className="img-container">
            {(() => {
                const images = []
                for (let i = 0; i < 5; i++) {
                    const url = stay.imgUrls[i]
                    images.push(<img key={i} src={url} alt={`Image ${i}`} />)
                }
                return images
            })()}
        </section>

    </section >
}