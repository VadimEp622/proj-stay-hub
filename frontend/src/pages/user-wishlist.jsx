// Node modules
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

// Store
import { setModal } from "../store/stay.actions.js"

// Components
import { StayList } from "../cmps/stay-index/stay-list.jsx"
import { ButtonMain } from "../cmps/_reuseable-cmps/button-main.jsx"


// TODO: organize this component


export function UserWishlist() {
    const wishList = useSelector(storeState => storeState.userModule.user?.wishlist)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    const handleLoginClick = (ev) => {
        ev.stopPropagation()
        setModal("logIn")
    }

    useEffect(() => {
        console.log('wishList 1', wishList)
    }, [])

    useEffect(() => {
        console.log('wishList 2', wishList)
    }, [wishList])


    if (!loggedInUser) return (
        <div className="wishlist-container">
            <h1>Wishlist</h1>
            <h3>Log in to view your wishlists</h3>
            <p className="wishlist-msg">You can create, view, or edit wishlists once you've logged in</p>
            <div className="button-log-in-wrapper" onClick={handleLoginClick}>
                <ButtonMain text={'Log in'} />
            </div>
        </div>
    )
    if (wishList.length === 0 || !wishList) {
        return (
            <div className="wishlist-container">
                <h1>Wishlist</h1>
                <h3>No saves yet</h3>
                <p className="no-wishlist">As you search, click the heart icon to save your favorite places and Experiences to a wishlist.</p>
                <Link to={`/`}>
                    <button className="explore">Start exploring</button>
                </Link>
            </div>
        )
    }

    else {
        return (
            <div className="wishlist-container">
                <h1>Wishlist</h1>
                <section>
                    <StayList stays={wishList} />
                </section>
            </div>
        )
    }
}