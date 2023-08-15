// Node modules
import { useState } from "react"
import { useSelector } from "react-redux"

// Custom hooks
import { useClickOutside } from "../../../customHooks/clickOutsideModal.js"

// Components
import { NavMenuDropdown } from "./main-nav-menu/nav-menu-dropdown.jsx"
import { NavMenuButton } from "./main-nav-menu/nav-menu-button.jsx"


export function MainNavMenu() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [isDropdownActive, setIsDropdownActive] = useState(false)
    const dropdownRef = useClickOutside(onDropdownClickOutside)

    function onDropdownClickOutside() {
        setIsDropdownActive(false)
    }

    function toggleDropdown(ev) {
        ev.preventDefault()
        setIsDropdownActive(prevDropdown => !prevDropdown)
    }

    return (
        <section className="main-nav-menu" ref={dropdownRef} onClick={(ev) => toggleDropdown(ev)}>
            <NavMenuButton user={user} />
            {isDropdownActive && <NavMenuDropdown setIsDropdownActive={setIsDropdownActive} />}
        </section>
    )
}