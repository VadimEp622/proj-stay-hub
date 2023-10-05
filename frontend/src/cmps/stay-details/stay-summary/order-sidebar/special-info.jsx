import { RED_TAG } from '../../../../services/svg.service.js'
import SvgHandler from '../../../_reuseable-cmps/svg-handler.jsx'


export function SpecialInfo({ stay }) {
    return (
        <section className='special-info flex'>
            <article className='info-container'>
                <span className='bold fs16 lh20'>Lower price.</span>
                <span className='fs16 lh20'>Your dates are ${(stay.price * 0.4).toFixed(0)} less per night compared to the average nightly rate of the last 60 days.</span>
            </article>
            <SvgHandler svgName={RED_TAG} />
        </section>
    )
}