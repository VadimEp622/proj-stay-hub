// Node modules
import { useState } from 'react'

// Store
import { updateFilterBy } from "../../store/stay.actions.js"

// Services
import { categoryImages } from "../../services/category-images.service.js"

// Components
import { CategoryCarousel } from "./category-filter/category-carousel.jsx"

// TODO: add "Your Search" category in category-filter cmp, for user input filter search results, outside of category filter results

export function CategoryFilter() {
    const [selectedCategory, setSelectedCategory] = useState('OMG!')

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
