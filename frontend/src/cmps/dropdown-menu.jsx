import { useSelector } from "react-redux";
import { LoginSignup } from "./login-signup";
import { useState } from "react";
import { setModal } from "../store/stay.actions";

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
                        <div className="dropdown-option" onClick={(ev) => openModal(ev, 'loginSignup')}>
                            <span>Log in</span>
                            {/* {logInClicked && (
                                <div className="login-component-overlay">
                                    <div className="login-component-wrapper">
                                        <div className="login-component">
                                            <LoginSignup />
                                        </div>
                                    </div>
                                </div>
                            )} */}
                        </div>
                        <div className="dropdown-option">Sign up</div>
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
