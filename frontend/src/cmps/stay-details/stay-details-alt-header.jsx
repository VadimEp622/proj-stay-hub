// Node modules
import { useEffect } from 'react'

// Services
import { reviewService } from '../../services/review.service.js'
import { STAR } from '../../services/svg.service.js'

// Components
import { ButtonMain } from '../_reuseable-cmps/button-main.jsx'
import SvgHandler from '../_reuseable-cmps/svg-handler.jsx'


export function StayDetailsAltHeader({ stay, selectedRange, onCheckAvailabilityClick, onReserveClick }) {


    useEffect(() => {
        const photos = document.querySelector('.stay-photos-container')
        const altHeader = document.querySelector('.stay-details-alt-header-container')
        const orderSidebarBtn = document.querySelector('.order-sidebar .btn-main-container')
        const reserveLink = document.querySelector('.reserve-container')

        const photosObserver = new IntersectionObserver(onPhotosObserved, {
            rootMargin: "-5px 0px 0px",
        })
        const orderSidebarBtnObserver = new IntersectionObserver(onOrderSidebarBtnObserved, {
            rootMargin: "-80px 0px 0px 0px"
        })

        function onPhotosObserved(entries) {
            entries.forEach((entry) => {
                altHeader.style.display = entry.isIntersecting ? 'none' : 'grid'
            })
        }

        function onOrderSidebarBtnObserved(entries) {
            entries.forEach((entry) => {
                reserveLink.style.display = entry.isIntersecting ? 'none' : 'block'
            })
        }

        photosObserver.observe(photos)
        orderSidebarBtnObserver.observe(orderSidebarBtn)

        return () => {
            photosObserver.disconnect()
            orderSidebarBtnObserver.disconnect()
        }
    }, [])


    const reviews = stay.reviews.length > 1 ? 'reviews' : 'review'
    return (
        <section className='stay-details-alt-header-container details-layout'>

            <section className='stay-details-alt-header flex space-between'>

                <section className='links-container ff-circular-semibold fs14 lh20 flex align-center'>
                    <a className='detail-link' href='#photos'>Photos</a>
                    <a className='detail-link' href='#amenities'>Amenities</a>
                    <a className='detail-link' href='#reviews'>Reviews</a>
                    <a className='detail-link' href='#location'>Location</a>
                </section>

                <section className='reserve-container'>
                    <section className='reserve-info flex align-center justify-center'>
                        <section className='reserve-preview flex'>

                            <section className='price flex'>
                                <span className='ff-circular-semibold fs16 lh20'>${stay.price.toLocaleString()}&nbsp;</span>
                                <span className='fs14 lh18'>night</span>
                            </section>

                            <section className='score ff-circular-semibold flex align-baseline'>
                                <span className='star fs10 lh16'><SvgHandler svgName={STAR} /></span>
                                <span className='review-rate fs12 lh16'>{reviewService.getAverageReview(stay)} ·</span>
                                <span className='review-count fs12 lh16'>{stay.reviews.length} {reviews}</span>
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
            </section>
        </section>
    )
}