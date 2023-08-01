// Services
import { CHECKIN, KEY, LOCATION } from "../../../services/svg.service.js"

// Components
import SvgHandler from "../../svg-handler.jsx"


export function Highlights() {
    return (
        <section className='highlights-container'>
            <div className='highlight flex'>
                <span><SvgHandler svgName={LOCATION} /></span>
                <div className='highlight-txt'>
                    <h3>Great location</h3>
                    <p>100% of recent guests gave the location a 5-star rating.</p>
                </div>
            </div>
            <div className='highlight flex'>
                <span><SvgHandler svgName={KEY} />
                </span>
                <div className='highlight-txt'>
                    <h3>Self check-in</h3>
                    <p>Check yourself in with the lockbox.</p>
                </div>
            </div>
            <div className='highlight flex'>
                <span><SvgHandler svgName={CHECKIN} /></span>
                <div className='highlight-txt'>
                    <h3>Free cancellation for 48 hours.</h3>
                    <p></p>
                </div>
            </div>
        </section>
    )
}