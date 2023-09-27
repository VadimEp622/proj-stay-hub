// Node modules
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

// Custom hooks
import useGeoLocation from "../customHooks/useGeoLocation.js"

// Components
import { StayList } from "../cmps/stay-index/stay-list.jsx"
import { Loader } from "../cmps/_reuseable-cmps/loader.jsx"


// TODO-priority-LOW: when navigating to a path which requires logging in, consider rerouting to a special login page(?)

export function UserWishlist() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const geoLocation = useGeoLocation()
    const navigate = useNavigate()


    useEffect(() => {
        if (!loggedInUser) navigate('/')
    }, [loggedInUser, navigate])



    if (!loggedInUser) return <Loader />
    return (
        <section className="user-wishlist-page">
            <h1 className="ff-circular-semibold fs28 lh28">Wishlist</h1>
            {(!loggedInUser.wishlist || loggedInUser.wishlist.length === 0)
                ? (
                    <section className="empty-wishlist">
                        <h3 className="fs22">No places saved yet</h3>
                        <p className="no-wishlist">As you explore, click the heart icon to save your favorite places and experiences to a wishlist.</p>
                        <Link to={`/`}>
                            <button className="explore fs16 lh20">Start exploring</button>
                        </Link>
                    </section>
                )
                : <StayList stays={loggedInUser.wishlist} geoLocation={geoLocation} />
            }
        </section>
    )
}