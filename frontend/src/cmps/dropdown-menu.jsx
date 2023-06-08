import { useSelector } from "react-redux";
import { LoginSignup } from "./login-signup";
import { useState } from "react";
import { setModal } from "../store/stay.actions";
import { Link } from "react-router-dom";

export function DropDown({ setIsDropDownActive }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [logInClicked, setLogInClicked] = useState(false)

    function openModal(ev, modal) {
        ev.stopPropagation()
        setIsDropDownActive(false)
        setModal(modal)
    }

    return (
        <>
            <div className="dropdown-navbar flex">
                <Link to={`/wishlist`}><div className="dropdown-option">Wishlist</div></Link>
                {loggedInUser ? (
                    <>
                        <div className="dropdown-option">Messages</div>
                        <div className="dropdown-option">Trips</div>
                        <div className="dropdown-line"></div>
                        <div className="dropdown-option">Manage listings</div>
                        <div className="dropdown-option">Dashboard</div>
                        <div className="dropdown-line"></div>
                        <div className="dropdown-option">Logout</div>
                    </>
                ) : (
                    <>
                        <div className="dropdown-option" onClick={(ev) => openModal(ev, 'logIn')}>
                            <span>Log in</span>
                        </div>
                        <div className="dropdown-option" onClick={(ev) => openModal(ev, 'signUp')}>Sign up</div>
                        <div className="dropdown-line"></div>
                        <div className="dropdown-option">Stayhub your home</div>
                    </>
                )}
            </div>
            {/* <div className="login-component" style={{ width: '100vw', height: '100vh' }}>
                <LoginSignup />
            </div> */}
        </>
    )
}
