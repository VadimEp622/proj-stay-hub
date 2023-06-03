import { useState, useEffect } from 'react'

export function DetailsHeader({stay}) {
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

                console.log('helllooo')
                nav.style.display = entry.isIntersecting ? 'none' : 'block'
            })
        }
    }, []) // <-- empty array means 'run once'

    return <section className='details-header'>
        <section className='details-header-container flex space-between'>
            <section className='links-container flex'>
                <a className='detail-link' href="">Photos</a>
                <a className='detail-link' href="">Amenities</a>
                <a className='detail-link' href="">Reviews</a>
                <a className='detail-link' href="">Location</a>
            </section>
            <section className='reserve-link flex align-center'>
                <section flex>
                    <section flex>
                        <span>${stay.price.toLocaleString()}</span>
                        <span>night</span>
                    </section>
                        <span>⭐️</span>
                        <span>4.95</span>
                        <span> </span>
                        <span>27</span>
                        <span>reviews</span>
                    <section>

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

}