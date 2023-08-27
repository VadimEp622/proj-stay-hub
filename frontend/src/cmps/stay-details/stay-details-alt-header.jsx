// Node modules
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Services
import { reviewService } from "../../services/review.service.js"
import { STAR } from "../../services/svg.service.js"

// Components
import { ButtonMain } from "../_reuseable-cmps/button-main.jsx"
import SvgHandler from '../_reuseable-cmps/svg-handler.jsx'
import { setAppModal } from '../../store/system.action.js'
import { SET_APP_MODAL_LOGIN } from '../../store/system.reducer.js'



// TODO: check if these observers here need to be unobserved when component unmounts 


export function StayDetailsAltHeader({ stay, loggedInUser }) {
    const navigate = useNavigate()
    const reviews = stay.reviews.length > 1 ? 'reviews' : 'review'

    useEffect(() => {
        const header = document.querySelector('.stay-photos-container')
        const nav = document.querySelector('.stay-details-alt-header-container')
        const orderModal = document.querySelector('.order-sidebar')
        const reserveLink = document.querySelector('.reserve-container')

        const headerObserver = new IntersectionObserver(onHeaderObserved, {
            rootMargin: "-5px 0px 0px",
        })
        headerObserver.observe(header)

        function onHeaderObserved(entries) {
            entries.forEach((entry) => {
                nav.style.display = entry.isIntersecting ? 'none' : 'block'
            })
        }


        const orderModalObserver = new IntersectionObserver(onOrderModalObserved, {
            rootMargin: "-500px 0px 0px",
        })
        orderModalObserver.observe(orderModal)

        function onOrderModalObserved(entries) {
            entries.forEach((entry) => {
                reserveLink.style.display = entry.isIntersecting ? 'none' : 'block'
            })
        }
    }, [])

    function onClickButton(ev) {
        console.log('ev', ev)
        ev.preventDefault()
        ev.stopPropagation()
        if (!loggedInUser) {
            console.log("NOT logged in click")
            setAppModal(SET_APP_MODAL_LOGIN)
        }
        else {
            console.log("logged in click")
            navigate(`/stay/book/${stay._id}`)
        }
    }


    return (
        <section className='stay-details-alt-header-container'>
            <section className='stay-details-alt-header flex space-between'>
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
                        {/* <ButtonMain text={"Reserve"} onClickButton={(ev) => onClickButton(ev)} /> */}
                        <ButtonMain
                            text={'Reserve'}
                            onClickButton={(ev) => onClickButton(ev)}
                        />
                    </section>
                </section>
            </section>
        </section>
    )
}