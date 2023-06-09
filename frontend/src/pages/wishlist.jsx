import { useSelector } from "react-redux"
import { StayList } from "../cmps/stay-list"
import { Link } from "react-router-dom"
import { AirbnbButton } from "../cmps/reuseableCmp/airbnb-button"
import { setModal } from "../store/stay.actions"



export function WishList() {
    const wishList = useSelector(storeState => storeState.userModule.user?.wishlist)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    const handleLoginClick = (ev) => {
        ev.stopPropagation()
        setModal("logIn")
    }


    if (!loggedInUser) return (
        <div className="wishlist-container">
            <h1>Wishlist</h1>
            <h3>Log in to view your wishlists</h3>
            <p className="wishlist-msg">You can create, view, or edit wishlists once you've logged in</p>
            <div className="button-log-in-wrapper" onClick={handleLoginClick}>
                <AirbnbButton text={'Log in'} />
            </div>
        </div>
    )
    if (wishList.length === 0 || !wishList) {
        return (
            <div className="wishlist-container">
                <h1>Wishlist</h1>
                <h3>No saves yet</h3>
                <p>As you search, click the heart icon to save your favorite places and Experiences to a wishlist.</p>
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
