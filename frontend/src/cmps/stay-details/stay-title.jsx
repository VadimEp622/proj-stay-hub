// Services
import { HEART_16_BLACK_STROKE, HEART_16_RED_FILL, SHARE, STAR } from '../../services/svg.service.js'

// Components
import SvgHandler from '../_reuseable-cmps/svg-handler.jsx'


export function StayTitle({ stay, averageReviewScore, onLikeClicked, isStayWishlist }) {

    const stayName = stay.name
    const reviewCount = stay.reviews.length
    const { city, country } = stay.loc
    const reviewCountStr = `${reviewCount} ${reviewCount > 1 ? 'reviews' : 'review'}`
    return (
        <section className='full details-layout'>

            <section className='stay-title-container flex column' >
                <h1 className='ff-circular-regular fs26 lh30'>{stayName}</h1>
                <section className='info-container fs14 flex space-between align-center'>

                    <ul className='info ff-circular-semibold lh20 flex justify-start align-center'>

                        <li className='score-container flex'>
                            <section className='score flex align-center gap4'>
                                <SvgHandler svgName={STAR} />
                                <span>{averageReviewScore}</span>
                            </section>
                            <span className='info-review underline'>{reviewCountStr}</span>
                        </li>

                        <li><span className='info-loc underline'>{city}, {country}</span></li>
                    </ul>

                    <section className='action-buttons lh18 flex align-baseline gap20'>

                        <section className='flex align-center gap8'>
                            <SvgHandler svgName={SHARE} />
                            <span className='ff-circular-semibold underline capitalize'>share</span>
                            <div className='overlay'></div>
                        </section>

                        <section
                            className='flex align-center gap8'
                            onClick={(ev) => onLikeClicked(ev)}
                        >
                            <SvgHandler svgName={isStayWishlist() ? HEART_16_RED_FILL : HEART_16_BLACK_STROKE} />
                            <span className='ff-circular-semibold underline capitalize'>save</span>
                            <div className='overlay'></div>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    )
}