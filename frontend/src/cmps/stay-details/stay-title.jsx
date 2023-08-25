import { HEART_16, RED_HEART_16, SHARE, STAR } from "../../services/svg.service.js"
import SvgHandler from "../_reuseable-cmps/svg-handler.jsx"



export function StayTitle({ stay, averageReviewScore,likeSvg, onLikeClicked }) {

    return (
        <section className='stay-title-container flex' >
            <h1>{stay.name}</h1>
            <section className='info-bar flex space-between align-center'>
                <section className='info flex'>
                    <SvgHandler svgName={STAR} />
                    <span>{averageReviewScore}</span>
                    <span>•</span>
                    <span className='info-review'>{stay.reviews.length} {stay.reviews.length > 1 ? 'reviews' : 'review'}</span>
                    <span>•</span>
                    <span className='info-loc'>{stay.loc.city}, {stay.loc.country}</span>
                </section>
                <section className='btns flex'>
                    <div className='share-btn flex'>
                        <SvgHandler svgName={SHARE} />
                        <span>Share</span>
                        <div className="share-btn-overlay"></div>
                    </div>
                    <div className='save-btn flex'
                        // onClick={() => setIsLikeClicked(prevHeart => !prevHeart)}
                        onClick={(ev) => onLikeClicked(ev)}
                    >
                        <SvgHandler svgName={likeSvg} />
                        {
                            likeSvg === HEART_16 &&
                            <span>Save</span>
                        }
                        {
                            likeSvg === RED_HEART_16 &&
                            <span>Save</span>
                        }
                        <div className="save-btn-overlay"></div>
                    </div>
                </section>
            </section>
        </section>
    )
}