import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"



export function CategoryCarousel({ images, selectedCategory, handleClick }) {
    const isMobileDevice = window.innerWidth <= 464
    console.log(images)

    const responsive = {
        largeDesktop: {
            breakpoint: {
                max: 4000,
                min: 1600
            },
            items: 3,
        },
        desktop: {
            breakpoint: {
                max: 1600,
                min: 1024
            },
            items: 3,
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
            items: 3,
        },
    }

    return (
        <Carousel
            // additionalTransfrom={0}
            // arrows={!isMobileDevice}
            // centerMode={false}
            // dotListClass=""
            draggable={isMobileDevice}
            // focusOnSelect={false}
            // infinite
            // keyBoardControl
            // renderDotsOutside={false}
            // rewindWithAnimation={false}
            // shouldResetAutoplay
            // showDots={false}
            // sliderClass=""
            partialVisible={true}
            minimumTouchDrag={80}
            renderArrowsWhenDisabled={false}
            arrows
            className="category-bar"
            itemClass=""
            renderButtonGroupOutside={false}
            responsive={responsive}
            rewind={false}
            rtl={false}
            slidesToSlide={1}
            swipeable={true}
        >
            {
                images.map((img, index) => (
                    // <section className={`category-preview-container${selectedCategory === img.label ? ' active' : ''}`} onClick={(ev) => handleClick(ev, img.label)}>
                    //     <section className={`category-preview`}>
                    <section key={index} className={`img-container${selectedCategory === img.label ? ' active' : ''}`} onClick={(ev) => handleClick(ev, img.label)}>
                        <img
                            key={index}
                            src={img.imgSrc}
                        // height={100}
                        // width={100}
                        // style={{
                        //     // height: "24px",
                        //     // width: "24px",
                        // }}
                        />
                        <label><span>{img.label}</span></label>
                    </section>
                    //     </section>
                    // </section>
                ))
            }
        </Carousel>
    )
}