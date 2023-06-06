import { useSelector } from "react-redux";

export function WishList() {
    const wishList = useSelector(storeState => storeState.userModule.wishlist);
    if (wishList.length === 0 || !wishList) {
        return (
            <div>
                <h4>No saves yet</h4>
                <p>As you search, click the heart icon to save your favorite places and Experiences to a wishlist.</p>
                <button className="explore">Start exploring</button>
            </div>
        )
    }

    return (
        <div>
            <h3>Wishlist</h3>
            <div className="image-container">
                {wishList.map((stay, index) => (
                    <div key={index}>
                        <img src={stay.imgUrls[0]} alt="" />
                        <img src={stay.imgUrls[1]} alt="" />
                        <img src={stay.imgUrls[2]} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
}
