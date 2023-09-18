import SvgHandler from "../../_reuseable-cmps/svg-handler.jsx"


export function Amenities({stay}) {

    return (
        <section className='amenities' id='amenities'>
            <h3>What this place offers</h3>
            <section className='amenities-list'>
                {stay.amenities.slice(0, 8).map(amenity => {
                    return (
                        <article className="amenity fs16 flex" key={amenity}>
                            <SvgHandler svgName={amenity} />
                            <span>{amenity}</span>
                        </article>
                    )
                })}
            </section>
        </section>
    )
}