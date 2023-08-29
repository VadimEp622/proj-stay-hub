// Node modules
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

// Store
import { logout } from "../../../../store/user.actions.js"
import { SET_APP_MODAL_LOGIN, SET_APP_MODAL_SIGNUP } from "../../../../store/system.reducer.js"
import { setAppModal } from "../../../../store/system.action.js"


export function NavMenuDropdown({ setIsDropdownActive }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [logInClicked, setLogInClicked] = useState(false)
    const dropdownRef = useRef(null)

    function openModal(ev, modalType) {
        ev.preventDefault()
        ev.stopPropagation()
        setIsDropdownActive(false)
        setAppModal(modalType)
    }

    function handleClickInside(ev) {
        setIsDropdownActive(false)
    }

    useEffect(() => {

        if (dropdownRef.current) {
            dropdownRef.current.addEventListener("click", handleClickInside)
        }

        return () => {
            if (dropdownRef.current) {
                dropdownRef.current.removeEventListener("click", handleClickInside)
            }
        }
    }, [setIsDropdownActive])


    return (
        <>
            <div className="dropdown-navbar flex">

                {loggedInUser ? (
                    <>
                        {/* <div className="dropdown-option">Messages</div> */}
                        <Link to={`/trips`}><div className="dropdown-option">Trips</div></Link>
                        <Link to={`/wishlist`}><div className="dropdown-option">Wishlist</div></Link>
                        <div className="dropdown-line"></div>
                        {/* <div className="dropdown-option">Manage listings</div> */}
                        <Link to={`/dashboard`}><div className="dropdown-option">Dashboard</div></Link>
                        <div className="dropdown-line"></div>
                        <div className="dropdown-option" onClick={logout}>Logout</div>
                    </>
                ) : (
                    <>
                        <div className="dropdown-option" onClick={(ev) => openModal(ev, SET_APP_MODAL_LOGIN)}>
                            <span>Log in</span>
                        </div>
                        <div className="dropdown-option" onClick={(ev) => openModal(ev, SET_APP_MODAL_SIGNUP)}>Sign up</div>
                        {/* <div className="dropdown-line"></div> */}
                        {/* <Link to={`/dashboard/stay/add`}><div className="dropdown-option">StayHub your home</div></Link> */}
                    </>
                )}
            </div>
        </>
    )
}
