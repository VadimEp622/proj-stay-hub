import SvgHandler from '../../_reuseable-cmps/svg-handler'

export function AmenityPreview({ amenity }) {

    return (
        <section className='amenity-preview fs16 lh20 flex align-center gap16'>
            <SvgHandler svgName={amenity} />
            <span>{amenity}</span>
        </section>
    )
}