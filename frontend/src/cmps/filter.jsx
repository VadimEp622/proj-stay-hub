import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateFilterBy } from '../store/stay.actions';
import { utilService } from '../services/util.service';

function displayAmenities(stays) {
    if (!stays || !Array.isArray(stays)) return []
    const allAmenities = stays.reduce((amenities, stay) => {
        stay.amenities.forEach((amenity) => {
            if (!amenities.includes(amenity)) {
                amenities.push(amenity)
            }
        })
        return amenities
    }, [])
    return allAmenities
}


export function FilterModal({ stays, setIsFilterModalOpen }) {
    // const [filterByToEdit, setFilterByToEdit] = useState(stayService.getDefaultFilter())
    const [priceRange, setPriceRange] = useState(utilService.checkMinMaxPrices(stays))
    const [initialPriceRange, setInitialPriceRange] = useState(utilService.checkMinMaxPrices(stays))
    const [filterByToSend, setFilterByToSend] = useState({ amenities: [] })
    const [amenities, setAmenities] = useState([])

    useEffect(() => {
        setFilterByToSend(prevFilter => ({ ...prevFilter, minPrice: priceRange.minPrice, maxPrice: priceRange.maxPrice }))
    }, [priceRange, filterByToSend]);

    useEffect(() => {
        const allAmenities = displayAmenities(stays)
        setAmenities(allAmenities)
    }, [stays])


    function handleChange({ target }) {
        const { name: field, type, checked } = target;
        const value =
            type === "number" ? +target.value || "" : type === "checkbox" ? checked : target.value;

        setFilterByToSend((prevFilter) => {
            if (amenities.includes(field)) {
                if (checked) {
                    return { ...prevFilter, amenities: [...prevFilter.amenities, field] };
                } else {
                    const updatedAmenities = prevFilter.amenities.filter((amenity) => amenity !== field);
                    return { ...prevFilter, amenities: updatedAmenities };
                }
            } else {
                return { ...prevFilter, [field]: value };
            }
        })
    }


    function handleSliderChange(values) {
        setPriceRange({ minPrice: values[0], maxPrice: values[1] })
    }

    function handleInputChange(ev) {
        ev.preventDefault();
        const { name, value } = ev.target;
        setPriceRange((prevPriceRange) => ({
            ...prevPriceRange,
            [name]: Number(value),
        }));
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        setIsFilterModalOpen(false)
        updateFilterBy(filterByToSend)
    }
    return (
        <section>
            <div className="header-div">
                <button onClick={() => setIsFilterModalOpen(false)}>X</button>
                Filters
            </div>
            <form onSubmit={onSubmitFilter}>
                <h3>Type of place</h3>
                <div className="places-type">
                    <button type="button">
                        <div className="type">
                            All types
                            <span>2,140$ avg.</span>
                        </div>
                    </button>
                    <button type="button">
                        <div className="type">
                            Rooms
                            <span>914$ avg.</span>
                        </div>
                    </button >
                    <button type="button">
                        <div className="type">
                            Homes
                            <span>2357$ avg.</span>
                        </div>
                    </button>
                </div>
                <p>Browse rooms, homes and more. Average nightly prices include fees and taxes.</p>
                <h3>Price Range</h3>
                <Slider range allowCross={false}
                    min={initialPriceRange.minPrice}
                    max={initialPriceRange.maxPrice}
                    value={[priceRange.minPrice, priceRange.maxPrice]}
                    onChange={handleSliderChange}
                    keyboard={true} />
                <div className="price-ranges">
                    <div className="price-input">
                        <label >Minimum:</label>
                        <input type="number" name="minPrice" value={priceRange.minPrice} onChange={handleInputChange} />
                    </div>
                    <div className="space">--</div>
                    <div className="price-input">
                        <label >Maximum:</label>
                        <input type="number" name="maxPrice" value={priceRange.maxPrice} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="amenities-container">
                    <h2>Amenities</h2>
                    <h4>Essentials</h4>
                    {displayAmenities(stays).map((amenity) => (
                        <label key={amenity}>
                            <input
                                type="checkbox"
                                name={amenity}
                                onChange={handleChange}
                                value={amenity}
                            />
                            {amenity}
                        </label>
                    ))}
                </div>
            </form>
        </section >
    )
}