// Node modules
import { useState } from 'react'

// Store
import { updateFilterBy } from "../store/stay.actions.js"

// Services
import { categoryImages } from "../services/category-images.service.js"

// Components
import { CategoryCarousel } from "./category-carousel.jsx"


export function CategoryFilter() {
    const [selectedCategory, setSelectedCategory] = useState('Trending')

    function handleClick(ev, label) {
        console.log(label)
        ev.preventDefault()
        setSelectedCategory(label)
        updateFilterBy({ label: label })
    }

    return (
        <section className="category-filter">
            <section className="category-carousel-container">
                <CategoryCarousel images={categoryImages} selectedCategory={selectedCategory} handleClick={handleClick} />
            </section>
        </section>
    )
}
