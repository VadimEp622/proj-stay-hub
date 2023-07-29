// Node modules
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

// Services
import { ARROW_LEFT_FAT, ARROW_RIGHT_FAT } from "../../../services/svg.service.js"

// Components
import SvgHandler from "../../svg-handler.jsx"


export function CategoryCarousel({ images, selectedCategory, handleClick }) {
    const isMobileDevice = window.innerWidth <= 464

    const CustomLeftArrow = ({ onClick }) => (
        <section className="custom-arrow-container left">
            <button className="custom-arrow left" onClick={onClick} >
                <SvgHandler svgName={ARROW_LEFT_FAT} />
            </button >
        </section>
    )

    const CustomRightArrow = ({ onClick }) => (
        <section className="custom-arrow-container right">
            <button className="custom-arrow right" onClick={onClick}  >
                <SvgHandler svgName={ARROW_RIGHT_FAT} />
            </button >
        </section>
    )

    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1700
            },
            items: 17,
            slidesToSlide: 6
        },
        desktopSmall: {
            breakpoint: {
                max: 1700,
                min: 1400
            },
            items: 13,
            slidesToSlide: 6
        },
        tabletLarge: {
            breakpoint: {
                max: 1400,
                min: 1200
            },
            items: 11,
            slidesToSlide: 3
        },
        tabletMedium: {
            breakpoint: {
                max: 1200,
                min: 1000
            },
            items: 9,
            slidesToSlide: 3
        },
        tabletSmall: {
            breakpoint: {
                max: 1000,
                min: 800
            },
            items: 7,
            slidesToSlide: 3
        },
        mobileLarge: {
            breakpoint: {
                max: 800,
                min: 600
            },
            items: 6,
            slidesToSlide: 3
        },
        mobileMedium: {
            breakpoint: {
                max: 600,
                min: 500
            },
            items: 4,
            slidesToSlide: 3
        },
        mobileSmall: {
            breakpoint: {
                max: 500,
                min: 400
            },
            items: 3,
            slidesToSlide: 2
        }
    }

    return (
        <Carousel
            centerMode={false}
            draggable={isMobileDevice}
            partialVisible={false}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            minimumTouchDrag={80}
            renderArrowsWhenDisabled={false}
            arrows
            className="category-bar"
            itemClass="category-item width-100-percent"
            renderButtonGroupOutside={false}
            responsive={responsive}
            rewind={true}
            rtl={false}
            slidesToSlide={1}
            swipeable={true}
            infinite={false}
        >
            {
                images.map((img, index) => (
                    <section
                        key={index}
                        className={`img-container${selectedCategory === img.label ? ' active' : ''}`}
                        onClick={(ev) => handleClick(ev, img.label)}
                    >
                        <img
                            key={index}
                            src={img.imgSrc}
                            alt={index}
                        />
                        <label><span>{img.label}</span></label>
                    </section>
                ))
            }
        </Carousel>
    )
}