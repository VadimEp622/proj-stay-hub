import React, { useEffect, useRef, useState } from "react";
import { CarouselImage2 } from "./carousel2";
import { updateFilterBy } from "../store/stay.actions";

export function UpperFilter() {
    // const labels = getLabels(stays)

    const images = [
        {
            label: "Lakefront",
            imgSrc: "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
        },
        {
            label: "Rooms",
            imgSrc: "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
        },
        {
            label: "Design",
            imgSrc: "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
        },
        {
            label: "Tropical",
            imgSrc: "https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg",
        },
        {
            label: "Amazing Views",
            imgSrc: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
        },
        {
            label: "Tiny Homes",
            imgSrc: "https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg",
        },
        {
            label: "Beachfront",
            imgSrc: "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
        },
        {
            label: "Amazing Pools",
            imgSrc: "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
        },
        {
            label: "Mansions",
            imgSrc: "https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg",
        },
        {
            label: "Castles",
            imgSrc: "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
        },
        {
            label: "Tiny Homes",
            imgSrc: "https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg",
        },
        {
            label: "Beachfront",
            imgSrc: "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
        },
        {
            label: "Amazing Pools",
            imgSrc: "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
        },
        {
            label: "Mansions",
            imgSrc: "https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg",
        },
        {
            label: "Castles",
            imgSrc: "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
        },
        {
            label: "Luxe",
            imgSrc: "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
        },
        {
            label: "Cabins",
            imgSrc: "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
        },
        {
            label: "Islands",
            imgSrc: "https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg"
        },
        {
            label: "National Parks",
            imgSrc: "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg"
        },
        {
            label: "Trending",
            imgSrc: "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg"
        },
        {
            label: "Farms",
            imgSrc: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg"
        },
    ]

    const [selectedFilter, setSelectedFilter] = useState()

    function handleClick(label) {
        setSelectedFilter(label)
        updateFilterBy({ labels: label })
        console.log(label)
    }

    return (
        <section className="filter-div">
            {/* {images.map((image, idx) => {
                return <div key={idx} className={`links-box ${image.label === selectedFilter && "selected-box"}`} onClick={() => handleClick(image.label)}>
                    <img src={image.imgSrc} className="links-img" />
                    <p className={`links-label ${image.label === selectedFilter && "selected-label"}`}>{image.label}</p>
                </div>
            })} */}
            <CarouselImage2 handleClick={handleClick} images={images} />
        </section>
    )
}
