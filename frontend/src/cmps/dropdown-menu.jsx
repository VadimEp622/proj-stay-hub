import { useSelector } from "react-redux";

export function DropDown() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user);

    return (
        <div className="dropdown-navbar flex">
            {loggedInUser ? (
                <>
                    <div className="dropdown-option">Messages</div>
                    <div className="dropdown-option">Trips</div>
                    <div className="dropdown-option">Wishlist</div>
                    <div className="dropdown-line"></div>
                    <div className="dropdown-option">Manage listings</div>
                    <div className="dropdown-option">Dashboard</div>
                    <div className="dropdown-line"></div>
                    <div className="dropdown-option">Logout</div>
                </>
            ) : (
                <>
                    <div className="dropdown-option">Log in</div>
                    <div className="dropdown-option">Sign up</div>
                    <div className="dropdown-line"></div>
                    <div className="dropdown-option">Stayhub your home</div>
                </>
            )}
        </div>
    );
}
