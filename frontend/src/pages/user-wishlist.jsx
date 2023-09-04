// Node modules
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

// Components
import { StayList } from "../cmps/stay-index/stay-list.jsx"
import { Loader } from "../cmps/_reuseable-cmps/loader.jsx"



// TODO: when navigating to a path which requires logging in, consider rerouting to a special login page(?)


export function UserWishlist() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const wishList = useSelector(storeState => storeState.userModule.user?.wishlist)
    const navigate = useNavigate()


    useEffect(() => {
        if (!loggedInUser) navigate('/')
    }, [loggedInUser, navigate])


    if (!loggedInUser) return <Loader />
    return (
        <section className="user-wishlist-page">
            <h1 className="ff-circular-bold">Wishlist</h1>
            {(!wishList || wishList.length === 0)
                ? (
                    <section className="empty-wishlist">
                        <h3>No places saved yet</h3>
                        <p className="no-wishlist">As you explore, click the heart icon to save your favorite places and experiences to a wishlist.</p>
                        <Link to={`/`}>
                            <button className="explore">Start exploring</button>
                        </Link>
                    </section>
                )
                : <StayList stays={wishList} />
            }
        </section>
    )
}