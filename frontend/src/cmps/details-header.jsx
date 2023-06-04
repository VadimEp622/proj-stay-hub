import { useEffect } from 'react'
import { reviewService } from "../services/review.service"
import { STAR } from "../services/svg.service"
import SvgHandler from "./svg-handler"

export function DetailsHeader({ stay }) {
    const reviews = stay.reviews.length > 1 ? 'reviews' : 'review'

    function _createButtonDivContainer() {
        const divElements = []
        for (let i = 0; i < 100; i++) {
            divElements.push(<div className="cell" key={i}></div>)
        }
        return divElements
    }

    useEffect(() => {
        const header = document.querySelector('.img-container')
        const nav = document.querySelector('.details-header')

        const headerObserver = new IntersectionObserver(onHeaderObserved, {
            rootMargin: "-5px 0px 0px",
        });

        headerObserver.observe(header)

        function onHeaderObserved(entries) {
            entries.forEach((entry) => {

                nav.style.display = entry.isIntersecting ? 'none' : 'block'
            })
        }

        const orderModal = document.querySelector('.order-modal')
        const reserveLink = document.querySelector('.reserve-container')

        const orderModalObserver = new IntersectionObserver(onOrderModalObserved, {
            rootMargin: "-350px 0px 0px",
        });

        orderModalObserver.observe(orderModal)

        function onOrderModalObserved(entries) {
            entries.forEach((entry) => {
                reserveLink.style.display = entry.isIntersecting ? 'none' : 'block'
            })
        }
    }, [])

    return <section className='details-header'>
        <section className='details-header-container flex space-between'>
            <section className='links-container flex align-center'>
                <a className='detail-link' href='#photos'>Photos</a>
                <a className='detail-link' href='#amenities'>Amenities</a>
                <a className='detail-link' href='#reviews'>Reviews</a>
                <a className='detail-link' href='#location'>Location</a>
            </section>
            <section className='reserve-container'>
                <section className='reserve-info flex align-center justify-center'>
                    <section className='reserve-prev flex'>
                        <section className='flex'>
                            <p><span>${stay.price.toLocaleString()}</span> night</p>
                        </section>
                        <section className='reserve-review flex align-baseline'>
                            <span className='star'><SvgHandler svgName={STAR} /></span>
                            <p> <span className="review-rate">{reviewService.getAverageReview(stay)}</span></p>
                            <span className='period'>·</span>
                            <span className="review-count">{stay.reviews.length} {reviews}</span>
                        </section>
                    </section>
                    <section className='reserve-btn'>
                        <div className="btn-container">
                            {_createButtonDivContainer()}
                            <div className="content">
                                <button className="action-btn">
                                    <span>Reserve</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </section>
    </section>
}