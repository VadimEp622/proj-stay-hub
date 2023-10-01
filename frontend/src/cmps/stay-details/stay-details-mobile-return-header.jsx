import { ARROW_LEFT, HEART_16_BLACK_STROKE, HEART_16_RED_FILL, SHARE } from '../../services/svg.service'
import SvgHandler from '../_reuseable-cmps/svg-handler'

export function StayDetailsMobileReturnHeader({ onLikeClicked, isStayWishlist, onReturnClicked }) {

    return (
        <section className='stay-details-mobile-return-header flex space-between align-center'>
            <section className='return'>
                <button onClick={(ev) => onReturnClicked(ev)}>
                    <section className='flex align-center gap8'>
                        <SvgHandler svgName={ARROW_LEFT} />
                        <h2 className='capitalize fs14 lh18'>homes</h2>
                    </section>
                </button>
            </section>
            <section className='like-share flex gap20'>
                <button className='share'>
                    <SvgHandler svgName={SHARE} />
                </button>
                <button onClick={(ev) => onLikeClicked(ev)}>
                    <SvgHandler svgName={isStayWishlist() ? HEART_16_RED_FILL : HEART_16_BLACK_STROKE} />
                </button>
            </section>
        </section>
    )
}