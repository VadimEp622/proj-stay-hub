import { useSelector } from "react-redux"
import { StayList } from "../cmps/stay-list"
import { Link } from "react-router-dom"



export function WishList() {
    const wishList = useSelector(storeState => storeState.userModule.wishlist)

    if (wishList.length === 0 || !wishList) {
        return (
            <div>
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
            <div>
                <h1>Wishlist</h1>
                <section>
                    <StayList stays={wishList} />
                </section>
            </div>
        )
    }
}
