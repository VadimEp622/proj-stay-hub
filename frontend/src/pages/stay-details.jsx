import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { stayService } from "../services/stay.service.local.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { reviewService } from '../services/review.service.js'
import { OrderContainer } from '../cmps/order-container.jsx'

import SvgHandler from '../cmps/svg_handler.jsx'
import { HEART_16, RED_HEART_16, SHARE, STAR, LOCATION } from '../services/svg.service.js'

export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStay()
    }, [stayId])

    async function loadStay() {
        try {
        const stay = await stayService.getById(stayId);
        setStay(stay);
        } catch (err) {
        console.log('Had issues in stay details', err);
        showErrorMsg('Cannot load stay');
        navigate('/stay');
        }
        }

    const [isHeartClicked, setIsHeartClicked] = useState(false)
    const heartSvg = isHeartClicked ? 'heart-red-16' : 'heart-16'

    if (!stay) return <div>Loading...</div>
    return <section className="stay-details">
        <section className='stay-review flex'>
            <h1>{stay.name}</h1>
            <section className='info-bar flex space-between align-center'>
                <section className='info flex'>
                    <SvgHandler svgName={STAR} />
                    <span>{reviewService.getAverageReview(stay)}</span>
                    <span className='info-review'>{stay.reviews.length} Review</span>
                    <span className='info-loc'>{stay.loc.city}, {stay.loc.country}</span>
                </section>
                <section className='btns flex'>
                    <div className='share-btn flex'>
                        <SvgHandler svgName={SHARE} />
                        <span>Share</span>
                    </div>
                    <div className='save-btn flex' onClick={() => setIsHeartClicked(prevHeart => !prevHeart)}>
                        <SvgHandler svgName={heartSvg} />
                        <span>Save</span>
                    </div>
                </section>
            </section>
        </section>
        <section className="img-container">
            {(() => {
                const images = [];
                for (let i = 0; i < 5; i++) {
                    const url = stay.imgUrls[i];
                    images.push(
                        <div className="img" key={i}>
                            <img src={url} alt={`Image ${i}`} className="fade-image" />
                            <div className="overlay"></div>
                        </div>
                    )
                }
                return images;
            })()}
        </section>
        <section className='details-container'>
            <section className='about-host flex space-between'>
                <section className='host-info'>
                    <h2>Entire villa hosted by Joan Felip</h2>
                    <span>4 • guests1 • bedroom2 • beds1 • bath</span>
                </section>
                <img src="https://a0.muscache.com/im/pictures/user/59da4e65-e5a0-4fde-b4d9-e48f20c1ba43.jpg?im_w=240" alt="host image" />
            </section>
            <section className='stay-highlights'>
                <div className='highlight flex'>
                    <span><SvgHandler svgName={LOCATION} /></span>
                    <div>
                        <h3>Great location</h3>
                        <p>100% of recent guests gave the location a 5-star rating.</p>
                    </div>
                </div>
                <div className='highlight flex'>
                    <span></span>
                    <div>
                        <h3>Self check-in</h3>
                        <p>Check yourself in with the lockbox.</p>
                    </div>
                </div>
                <div className='highlight flex'>
                    <span></span>
                    <div>
                        <h3>Free cancellation for 48 hours.</h3>
                        <p></p>
                    </div>
                </div>
            </section>
            <OrderContainer className='order-container' stay={stay} />
        </section>
    </section>
}