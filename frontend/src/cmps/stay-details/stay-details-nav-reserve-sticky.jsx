// Services
import { stayService } from '../../services/stay.service'
import { STAR } from '../../services/svg.service.js'

// Components
import { ButtonMain } from '../_reuseable-cmps/button-main.jsx'
import SvgHandler from '../_reuseable-cmps/svg-handler.jsx'


export function StayDetailsNavReserveSticky({ stay, selectedRange, onCheckAvailabilityClick, onReserveClick, isMobile }) {

    const reviewCount = stay.reviews.length
    const stayScore = stayService.getStayScore(stay.reviews)
    const stayPrice = stay.price.toLocaleString()

    const reviewCountStr = `${reviewCount} ${reviewCount > 1 ? 'reviews' : 'review'}`
    return (
        <section className='stay-details-nav-reserve-sticky-container details-layout'>
            <section className='stay-details-nav-reserve-sticky flex space-between justify-center'>

                {!isMobile &&
                    <nav className='links-container ff-circular-semibold fs14 lh20 flex align-center'>
                        <a href='#photos'>Photos</a>
                        <a href='#amenities'>Amenities</a>
                        <a href='#reviews'>Reviews</a>
                        <a href='#location'>Location</a>
                    </nav>
                }

                <section className={`reserve-container flex align-center ${isMobile ? 'space-between' : 'justify-end'}`}>
                    <section className='stay-info flex column'>

                        <section className='price flex'>
                            <span className='ff-circular-semibold fs16 lh20'>${stayPrice}</span>
                            <span className='fs14 lh18'>night</span>
                        </section>

                        <section className='score ff-circular-semibold lh16 flex align-baseline'>
                            <span className='star fs10'><SvgHandler svgName={STAR} /></span>
                            <span className='review-rate fs12'>{stayScore}</span>
                            <span className='review-count underline fs12'>{reviewCountStr}</span>
                        </section>

                    </section>

                    {(selectedRange.from && selectedRange.to)
                        ? <ButtonMain
                            text={'Reserve'}
                            onClickButton={(ev) => onReserveClick(ev)}
                        />
                        : <ButtonMain
                            text={'Check availability'}
                            onClickButton={(ev) => onCheckAvailabilityClick(ev)}
                        />
                    }
                </section>
            </section>
        </section >
    )
}