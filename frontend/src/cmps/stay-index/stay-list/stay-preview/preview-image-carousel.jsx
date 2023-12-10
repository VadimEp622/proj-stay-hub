import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { ARROW_LEFT, ARROW_RIGHT } from '../../../../services/svg.service.js'
import SvgHandler from '../../../_reuseable-cmps/svg-handler.jsx'


export function PreviewImageCarousel({ imgs, stay }) {

    const CustomLeftArrow = ({ onClick }) => (
        <button className='custom-arrow left' onClick={onClick} >
            <SvgHandler svgName={ARROW_LEFT} />
        </button >
    )

    const CustomRightArrow = ({ onClick }) => (
        <button className='custom-arrow right' onClick={onClick}  >
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
        tablet: {
            breakpoint: {
                max: 1024,
                min: 464
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
    }

    return (
        <Carousel
            additionalTransfrom={0}
            arrows={true}
            centerMode={false}
            className='preview-image-carousel'
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            customTransition='transform 300ms ease-in-out'
            dotListClass='dot-container'
            draggable={false}
            focusOnSelect={false}
            infinite={false}
            itemClass=''
            minimumTouchDrag={80}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rtl={false}
            showDots={true}
            sliderClass=''
            slidesToSlide={1}
            swipeable={true}
        >
            {
                imgs.map((img, index) =>
                    <Link key={index} to={`/stay/${stay._id}`}>
                        <img
                            src={img}
                            alt={`stay-pic-${index}`}
                        />
                    </Link>
                )
            }
        </Carousel>
    )
}
