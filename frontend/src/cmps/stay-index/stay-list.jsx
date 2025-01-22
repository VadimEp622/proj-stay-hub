// Store
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { toggleWishlistStay } from '../../store/wishlist-stay.slice'
import { systemSetAppModal } from '../../store/systemSlice'

// Custom hooks
import useIsMobile from '../../customHooks/useIsMobile.js'

// Services
import { SET_APP_MODAL_LOGIN } from '../../services/resources-strings.service'

// Components
import { StayPreview } from './stay-list/stay-preview.jsx'


// TODO: improve stay-list cmp structure + styling

export function StayList({ stays, geoLocation, lastStayElementRef = null, isStayWishlist }) {
    const loggedInUser = useAppSelector(storeState => storeState.userModule.user)
    const isMobile = useIsMobile()
    const dispatch = useAppDispatch()


    function onLikeClicked(ev, stayId) {
        ev.preventDefault()
        ev.stopPropagation()
        if (!loggedInUser) {
            dispatch(systemSetAppModal(SET_APP_MODAL_LOGIN))
            return
        }
        dispatch(toggleWishlistStay({ stayId }))
    }


    return (
        <section className='stay-list'>
            {stays.map((stay, index) =>
                <StayPreview key={stay._id} stay={stay} geoLocation={geoLocation} isMobile={isMobile}
                    isStayWishlist={isStayWishlist} onLikeClicked={onLikeClicked}
                    lastStayElementRef={(lastStayElementRef && stays.length === index + 1) ? lastStayElementRef : null}
                />
            )}
        </section>
    )
}
