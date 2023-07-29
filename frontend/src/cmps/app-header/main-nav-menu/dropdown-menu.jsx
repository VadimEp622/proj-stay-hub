// Node modules
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

// Store
import { setModal } from "../../../store/stay.actions.js"
import { logout } from "../../../store/user.actions.js"


export function DropDown({ setIsDropDownActive }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [logInClicked, setLogInClicked] = useState(false)
    const dropdownRef = useRef(null)

    function openModal(ev, modal) {
        ev.preventDefault()
        ev.stopPropagation()
        setIsDropDownActive(false)
        setModal(modal)
    }

    function handleClickInside(ev) {
        setIsDropDownActive(false)
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
    }, [setIsDropDownActive])


    return (
        <>
            <div className="dropdown-navbar flex">

                {loggedInUser ? (
                    <>
                        <div className="dropdown-option">Messages</div>
                        <Link to={`/trips`}><div className="dropdown-option">Trips</div></Link>
                        <Link to={`/wishlist`}><div className="dropdown-option">Wishlist</div></Link>
                        <div className="dropdown-line"></div>
                        <div className="dropdown-option">Manage listings</div>
                        <Link to={`/dashboard`}><div className="dropdown-option">Dashboard</div></Link>
                        <div className="dropdown-line"></div>
                        <div className="dropdown-option" onClick={logout}>Logout</div>
                    </>
                ) : (
                    <>
                        <div className="dropdown-option" onClick={(ev) => openModal(ev, 'logIn')}>
                            <span>Log in</span>
                        </div>
                        <div className="dropdown-option" onClick={(ev) => openModal(ev, 'signUp')}>Sign up</div>
                        <div className="dropdown-line"></div>
                        <Link to={`/dashboard/stay/add`}><div className="dropdown-option">Stayhub your home</div></Link>
                    </>
                )}
            </div>
        </>
    )
}
