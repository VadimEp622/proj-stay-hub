import { useState } from "react"

import { USER_NAV_BARS, USER_NAV_PROFILE } from "../../services/svg.service.js"
import { useClickOutside } from "../../customHooks/clickOutsideModal.js"

import { DropDown } from "../dropdown-menu.jsx"
import SvgHandler from "../svg-handler.jsx"

export function MainNavMenu() {
    const [isDropDownActive, setIsDropDownActive] = useState(false)
    const dropdownRef = useClickOutside(onDropdownClickOutside)

    function onDropdownClickOutside() {
        setIsDropDownActive(false)
    }

    function onSetDropDown(ev) {
        ev.preventDefault()
        setIsDropDownActive(prevDropDown => !prevDropDown)
    }
    console.log('HELLO!!!!')

    return (
        <section className="main-nav-menu-container" ref={dropdownRef} onClick={(ev) => onSetDropDown(ev)}>
            <section className="main-nav-menu">
                <article className="bars"><SvgHandler svgName={USER_NAV_BARS} /></article>
                <article className="profile"><SvgHandler svgName={USER_NAV_PROFILE} /></article>
            </section>
            {isDropDownActive && <DropDown setIsDropDownActive={setIsDropDownActive} />}
        </section>
    )
}