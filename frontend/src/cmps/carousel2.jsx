import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

export function CarouselImage2({ jpegFiles }) {
    const windowWidth = useRef(window.innerWidth)
    const carouselRef = useRef(null)
    console.log(windowWidth.current)
    const handleResize = () => {
        windowWidth.current = window.innerWidth
        carouselRef.current?.reInit()
        console.log('have entered handleResize')
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [windowWidth])

    console.log(Math.ceil(windowWidth.current / 80))
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: Math.ceil(windowWidth.current / 80)
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: Math.ceil(windowWidth.current / 80)
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: Math.ceil(windowWidth.current / 80)
        }
    };
    console.log('items', responsive.desktop.items)
    if (!jpegFiles) return null

    return (
        <Carousel
            additionalTransfrom={0}
            autoPlaySpeed={3000}
            showDots={false}
            centerMode={false}
            className="carousel-image-wrapper"
            containerClass=""
            dotListClass="dot-container"
            draggable={false}
            focusOnSelect={false}
            infinite={true}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            slidesToSlide={1}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            sliderClass=""
            responsive={responsive}
            swipeable
            ref={carouselRef}
        >
            {jpegFiles.map(({ fileName, module }) => (
                <img
                    key={fileName}
                    src={module.default}
                    alt={fileName}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "24px",
                        margin: "auto",
                        width: "24px"
                    }}
                />
            ))}
        </Carousel>
    );
}

// import { useState, useRef, useEffect } from 'react';

// export function CarouselImage2({ imgs }) {
//     const maxScrollWidth = useRef(0);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const carousel = useRef(null);

//     const movePrev = () => {
//         if (currentIndex > 0) {
//             setCurrentIndex((prevState) => prevState - 1);
//         }
//     };

//     const moveNext = () => {
//         if (
//             carousel.current !== null &&
//             carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
//         ) {
//             setCurrentIndex((prevState) => prevState + 1);
//         }
//     };

//     const isDisabled = (direction) => {
//         if (direction === 'prev') {
//             return currentIndex <= 0;
//         }

//         if (direction === 'next' && carousel.current !== null) {
//             return (
//                 carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
//             );
//         }

//         return false;
//     };

//     useEffect(() => {
//         if (carousel !== null && carousel.current !== null) {
//             carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
//         }
//     }, [currentIndex]);

//     useEffect(() => {
//         maxScrollWidth.current = carousel.current
//             ? carousel.current.scrollWidth - carousel.current.offsetWidth
//             : 0;
//     }, []);

//     return (
//         <div className="carousel my-12 mx-auto">
//             <div className="relative">
//                 <div className="flex justify-between absolute top left w-full h-full">
//                     <button
//                         onClick={movePrev}
//                         className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
//                         disabled={isDisabled('prev')}
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-12 w-20 -ml-5"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth={2}
//                         >
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//                         </svg>
//                         <span className="sr-only">Prev</span>
//                     </button>
//                     <button
//                         onClick={moveNext}
//                         className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
//                         disabled={isDisabled('next')}
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-12 w-20 -ml-5"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth={2}
//                         >
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//                         </svg>
//                         <span className="sr-only">Next</span>
//                     </button>
//                 </div>
//                 <div
//                     ref={carousel}
//                     className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
//                 >
//                     {imgs.map((file, index) => {
//                         const { fileName, module } = file;
//                         return (
//                             <div
//                                 key={index}
//                                 className="carousel-item text-center relative w-64 h-64 snap-start"
//                             >
//                                 <a
//                                     href={'null'}
//                                     className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
//                                     style={{ backgroundImage: `url(${module.default || ''})` }}
//                                 >
//                                     <img
//                                         src={module.default || ''}
//                                         alt={fileName}
//                                         className="w-full aspect-square hidden"
//                                     />
//                                     <h3 className="text-white py-6 px-3 mx-auto text-xl">
//                                         {fileName}
//                                     </h3>
//                                 </a>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// };

