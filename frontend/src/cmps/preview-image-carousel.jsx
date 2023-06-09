import React, { useRef, useState } from "react"
import Carousel from "react-multi-carousel"
import { Link } from "react-router-dom"

import "react-multi-carousel/lib/styles.css"


import { ARROW_LEFT, ARROW_RIGHT } from "../services/svg.service.js"

import SvgHandler from "./svg-handler.jsx"


export function PreviewImageCarousel({ imgs, stay }) {


    const CustomLeftArrow = ({ onClick }) => (
        <button className="custom-arrow left" onClick={onClick} >
            <SvgHandler svgName={ARROW_LEFT} />
        </button >
    )

    const CustomRightArrow = ({ onClick }) => (
        <button className="custom-arrow right" onClick={onClick}  >
            <SvgHandler svgName={ARROW_RIGHT} />
        </button >
    )

    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 1,
        },
        mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 1,
        },
        tablet: {
            breakpoint: {
                max: 1024,
                min: 464
            },
            items: 1,
        }
    }

    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            centerMode={false}
            className="preview-image-carousel"
            customTransition="transform 300ms ease-in-out"
            dotListClass="dot-container"
            draggable={false}
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            minimumTouchDrag={80}
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rtl={false}
            showDots={true}
            sliderClass=""
            slidesToSlide={1}
            swipeable
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
        >
            {
                imgs.map((img, index) => (
                    <Link key={index} to={`/stay/${stay._id}`}>
                        <img
                            src={img}
                        // style={{
                        //     // display: "block",
                        //     // height: "100%",
                        //     // width: "100%",
                        //     // margin: "auto",
                        // }}
                        />
                    </Link>
                ))
            }
        </Carousel>
    )
}
