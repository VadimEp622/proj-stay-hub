import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export function CarouselImage2({ images, handleClick }) {
    const isMobileDevice = window.innerWidth <= 464
    // console.log(images)
    return (
        <Carousel
            additionalTransfrom={0}
            arrows={!isMobileDevice}
            autoPlaySpeed={3000}
            centerMode={false}
            className="filter-bar"
            containerClass="filter-bar-container"
            dotListClass=""
            draggable={isMobileDevice}
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                largeDesktop: {
                    breakpoint: {
                        max: 4000,
                        min: 1600
                    },
                    items: 1,
                },
                desktop: {
                    breakpoint: {
                        max: 1600,
                        min: 1024
                    },
                    items: 1,
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 3,
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 2,
                },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {images.map((img, index) => {
                // console.log(img.imgSrc)
                return (
                    <img
                        key={index}
                        src={img.imgSrc}
                    />
                );
            })}
        </Carousel>
    )
}