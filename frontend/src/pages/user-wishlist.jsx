// Node modules
import { useCallback, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Custom hooks
import useGeoLocation from '../customHooks/useGeoLocation.js'

// Store
import { useAppDispatch, useAppSelector } from '../store/hooks'

// Components
import { StayList } from '../cmps/stay-index/stay-list.jsx'
import { Loader } from '../cmps/_reuseable-cmps/loader.jsx'
import { loadWishlistStays } from '../store/wishlist-stay.slice'


/**
 * Output of useGeoLocation() func
 * 
 * @typedef {Object} Location
 * @property {boolean} loaded - Is geolocation loaded
 * @property {Coordinates} [coordinates] - geolocation coordinates object
 * @property {Error} [error] - Error object, if any error occurs
 * 
 * @typedef {Object} Coordinates
 * @property {string} lat - The latitude.
 * @property {string} lng - The longitude.
 * 
 * @typedef {Object} Error
 * @property {number} code - Error Type Code
 * @property {string} message - Error description
 */


// TODO-priority-LOW: when navigating to a path which requires logging in, consider rerouting to a special login page(?)

export function UserWishlist() {
    const loggedinUser = useAppSelector(storeState => storeState.userModule.user)
    const wishlistStays = useAppSelector(storeState => storeState.wishlistStayModule.stays)
    const reqStatusLoadStays = useAppSelector(storeState => storeState.wishlistStayModule.reqStatusLoadStays)
    const isRequestedOnceOnCmpLoadRef = useRef(false)

    /** @type {Location} */
    const geoLocation = useGeoLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    const handleLoadWishlistStays = useCallback(async () => {
        try {
            isRequestedOnceOnCmpLoadRef.current = true
            await dispatch(loadWishlistStays())
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }, [navigate, dispatch])


    useEffect(() => {
        if (!loggedinUser) navigate('/')
        else if (!isRequestedOnceOnCmpLoadRef.current) handleLoadWishlistStays()
    }, [navigate, handleLoadWishlistStays, loggedinUser, isRequestedOnceOnCmpLoadRef])



    function isStayWishlist(stayId) {
        return loggedinUser ? wishlistStays.some(wishlistStay => wishlistStay._id === stayId) : false
    }


    if (!loggedinUser || reqStatusLoadStays === "idle" || reqStatusLoadStays === "pending") return <Loader />
    if (reqStatusLoadStays === "failed") return <h1>Failed to load wishlist</h1>

    return (
        <section className='user-wishlist-page'>
            <h1 className='ff-circular-semibold fs28 lh28'>Wishlist</h1>
            {(wishlistStays.length === 0)
                ? (
                    <section className='empty-wishlist'>
                        <h3 className='fs22'>No places saved yet</h3>
                        <p className='no-wishlist'>As you explore, click the heart icon to save your favorite places and experiences to a wishlist.</p>
                        <Link to={`/`}>
                            <button className='explore fs16 lh20'>Start exploring</button>
                        </Link>
                    </section>
                )
                : <StayList stays={wishlistStays} geoLocation={geoLocation} isStayWishlist={isStayWishlist} />
            }
        </section>
    )
}