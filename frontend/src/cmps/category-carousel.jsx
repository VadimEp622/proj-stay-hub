import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { ARROW_LEFT_FAT, ARROW_RIGHT_FAT } from "../services/svg.service"
import SvgHandler from "./svg-handler"



export function CategoryCarousel({ images, selectedCategory, handleClick }) {
    const isMobileDevice = window.innerWidth <= 464
    // console.log(images)

    // const maxScrollWidth = "5801.550px"
    // const maxTranslate="-4750px"


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

    // function afterChange(previousSlide, _ref) {
    //     var currentSlide = _ref.currentSlide; _ref.onMove;
    //     return alert("previous slide is " + previousSlide + " currentSlide is " + currentSlide)
    // }
    // console.log(window.innerWidth)
    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1200
            },
            items: 17,
            slidesToSlide: 6
        },
        mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 6,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: {
                max: 1100,
                min: 464
            },
            items: 12,
            slidesToSlide: 3
        }
    }

    return (
        <Carousel
            // afterChange={function (previousSlide, _ref) { var currentSlide = _ref.currentSlide; _ref.onMove; return alert("previous slide is " + previousSlide + " currentSlide is " + currentSlide) }}
            // additionalTransfrom={0}
            // arrows={!isMobileDevice}
            centerMode={false}
            // dotListClass=""
            draggable={isMobileDevice}
            partialVisible={false}
            // focusOnSelect={false}
            // infinite
            // keyBoardControl
            // renderDotsOutside={false}
            // rewindWithAnimation={false}
            // shouldResetAutoplay
            // showDots={false}
            // sliderClass=""
            // partialVisible={true}
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
                    // style={{width:"fit-content"}}
                    >
                        <img
                            key={index}
                            src={img.imgSrc}
                        />
                        <label><span>{img.label}</span></label>
                    </section>
                ))
            }
        </Carousel>
    )
}