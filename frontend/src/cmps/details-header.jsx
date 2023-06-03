import { useState } from 'react'

export function DetailsHeader() {

    return <section className='details-header flex'>
        <section className='links-container flex'>
            <a className='detail-link' href="">Photos</a>
            <a className='detail-link' href="">Amenities</a>
            <a className='detail-link' href="">Reviews</a>
            <a className='detail-link' href="">Location</a>
        </section>
        <section className='reserve-link'>

        </section>
    </section>
}