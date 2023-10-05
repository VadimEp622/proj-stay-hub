import { EYE } from '../../../../../services/svg.service.js'
import SvgHandler from '../../../../_reuseable-cmps/svg-handler.jsx'


export function ExplorePreview({ exploreItem }) {
    return (
        <section className='to-do'>
            {exploreItem.img
                ? <img src={exploreItem.img} alt='to-do' />
                : <article className='show-more'><SvgHandler svgName={EYE} /></article>
            }
            <article className='todo-info'>
                <h4>{exploreItem.title}</h4>
                <span>{exploreItem.amount} experiences</span>
            </article>
        </section>
    )
}