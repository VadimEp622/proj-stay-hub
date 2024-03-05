// Node modules
import { useState } from 'react'

// Store
import { useAppDispatch } from '../../store/hooks'
import { stayUpdateFilterBy } from '../../store/staySlice'

// Services
import { categoryImages } from '../../services/category-images.service.js'

// Components
import { CategoryCarousel } from './category-filter/category-carousel.jsx'


// TODO: add 'Your Search' category in category-filter cmp, for user input filter search results, outside of category filter results

export function CategoryFilter() {
    const [selectedCategory, setSelectedCategory] = useState('OMG!')
    const dispatch = useAppDispatch()

    function handleClick(ev, label) {
        ev.preventDefault()
        setSelectedCategory(label)
        dispatch(stayUpdateFilterBy({ label: label }))
    }

    return (
        <section className='category-filter'>
            <section className='category-carousel-container'>
                <CategoryCarousel images={categoryImages} selectedCategory={selectedCategory} handleClick={handleClick} />
            </section>
        </section>
    )
}
