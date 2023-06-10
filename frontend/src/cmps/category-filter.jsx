import React, { useEffect, useRef, useState } from "react"
import { CategoryCarousel } from "./category-carousel"
import { updateFilterBy } from "../store/stay.actions"

import beachfront from "../assets/img/category-bar/beachfront.jpeg"
import cabins from "../assets/img/category-bar/cabins.jpeg"
import islands from "../assets/img/category-bar/islands.jpeg"
import lakefront from "../assets/img/category-bar/lakefront.jpeg"
import mansions from "../assets/img/category-bar/mansions.jpeg"
import New from "../assets/img/category-bar/new.jpeg"
import omg from "../assets/img/category-bar/omg.jpeg"
import rooms from "../assets/img/category-bar/rooms.jpeg"

export function CategoryFilter() {
    const [selectedCategory, setSelectedCategory] = useState('OMG!')

    const images = [
        {
            label: "OMG!",
            imgSrc: omg
        },
        {
            label: "Rooms",
            imgSrc: rooms
        },
        {
            label: "Lakefront",
            imgSrc: lakefront
        },
        {
            label: "Cabins",
            imgSrc: cabins
        },
        {
            label: "New",
            imgSrc: New
        },
        {
            label: "Islands",
            imgSrc: islands
        },
        {
            label: "Mansions",
            imgSrc: mansions
        },
        {
            label: "Beachfront",
            imgSrc: beachfront
        },
    ]


    function handleClick(ev, label) {
        console.log(label)
        ev.preventDefault()
        setSelectedCategory(label)
        updateFilterBy({ labels: label })
    }

    return (
        <section className="filter-carousel-container category-carousel-container">
            {/* {images.map((image, idx) => {
                return <div key={idx} className={`links-box ${image.label === selectedFilter && "selected-box"}`} onClick={() => handleClick(image.label)}>
                    <img src={image.imgSrc} className="links-img" />
                    <p className={`links-label ${image.label === selectedFilter && "selected-label"}`}>{image.label}</p>
                </div>
            })} */}
            <CategoryCarousel images={images} selectedCategory={selectedCategory} handleClick={handleClick} />
        </section>
    )
}
