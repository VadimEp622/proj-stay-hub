// Node modules
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Store
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { stayUpdateFilterBy } from '../../store/staySlice'

// Services
import { categoryImages } from '../../services/category-images.service.js'

// Components
import { CategoryCarousel } from './category-filter/category-carousel.jsx'
import { stayService } from '../../services/stay.service'
import { utilService } from '../../services/util.service'



// TODO: fix 'All' category click area is too small


export function CategoryFilter() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const storeFilterBy = useAppSelector(storeState => storeState.stayModule.filterBy)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // function handleClick(ev, label) {
    //     ev.preventDefault()
    //     setSelectedCategory(label)
    //     dispatch(stayUpdateFilterBy({ label: label }))
    // }

    function handleClick(ev, label) {
        ev.preventDefault()
        setSelectedCategory(label)
        // dispatch(stayUpdateFilterBy({ label: label }))
        const filter = createFilterObject(storeFilterBy, label)
        const searchParamsString = createQueryString(filter)
        navigate(`/?${searchParamsString}`)
    }

    function createFilterObject(filterBy, label) {
        const filter = stayService.getEmptyFilterBy()

        if (filterBy.where) filter.where = filterBy.where
        if (filterBy.from) {
            filter.from = filterBy.from
            if (!filterBy.to) filter.to = filterBy.from + utilService.getTimeDiffBy('day')//if picked ONLY check-in date
            else filter.to = filterBy.to
        }
        if (filterBy.capacity) filter.capacity = filterBy.capacity
        if (filterBy.guests) filter.guests = filterBy.guests

        filter.label = label
        return filter
    }

    function createQueryString(data = {}) {
        return Object.keys(data).map(key => {
            let val = data[key]
            if (val !== null && typeof val === 'object') val = createQueryString(val)
            return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}`
        }).join('&')
    }

    useEffect(() => {
        if (!storeFilterBy.label || storeFilterBy.label === 'All') setSelectedCategory('All')
    }, [storeFilterBy])

    return (
        <section className='category-filter'>
            <section className='category-carousel-container'>
                <CategoryCarousel images={categoryImages} selectedCategory={selectedCategory} handleClick={handleClick} />
            </section>
        </section>
    )
}
