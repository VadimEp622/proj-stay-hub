import React, { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

export function CarouselImage({ imgs, stay }) {
    return (
        <Carousel
            additionalTransfrom={0}
            autoPlaySpeed={3000}
            showDots={true}
            centerMode={false}
            className="carousel"
            containerClass="container"
            dotListClass="dot-container"
            draggable={false}
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
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
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {imgs.map((img, index) => (
                <Link key={index} to={`/stay/${stay._id}`} target="_blank">
                    <img
                        src={img}
                        style={{
                            display: "block",
                            height: "100%",
                            margin: "auto",
                            width: "100%"
                        }}
                    />
                </Link>
            ))}
        </Carousel>
    )
}
