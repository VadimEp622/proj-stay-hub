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
import { Loader } from '../_reuseable-cmps/loader.jsx'


// TODO: improve stay-list cmp structure + styling

export function StayList({ stays, geoLocation, lastStayElementRef = null, isStayWishlist }) {
    const loggedInUser = useAppSelector(storeState => storeState.userModule.user)
    // const wishlistIds = useAppSelector(storeState => storeState.stayModule.wishlistIds)
    const isLoading = useAppSelector(storeState => storeState.systemModule.isLoading)
    const isMobile = useIsMobile()
    const dispatch = useAppDispatch()

    // function isStayWishlist(stayId) {
    //     return loggedInUser ? wishlistIds.some(wishlistId => wishlistId === stayId) : false
    // }

    function onLikeClicked(ev, stayId) {
        ev.preventDefault()
        ev.stopPropagation()
        if (!loggedInUser) {
            dispatch(systemSetAppModal(SET_APP_MODAL_LOGIN))
            return
        }
        dispatch(toggleWishlistStay({ stayId }))
    }

    if (isLoading) return <Loader />
    return (
        <section className='stay-list'>
            {stays.length < 1 && <span>No Stays Available</span>}
            {stays.map((stay, index) =>
                <StayPreview key={stay._id} stay={stay} geoLocation={geoLocation} isMobile={isMobile}
                    isStayWishlist={isStayWishlist} onLikeClicked={onLikeClicked}
                    lastStayElementRef={(lastStayElementRef && stays.length === index + 1) ? lastStayElementRef : null}
                />
            )}
        </section>
    )
}
