import { useState } from "react"

import { USER_NAV_BARS, USER_NAV_PROFILE } from "../../services/svg.service.js"
import { useClickOutside } from "../../customHooks/clickOutsideModal.js"

import { DropDown } from "../dropdown-menu.jsx"
import SvgHandler from "../svg-handler.jsx"

export function MainNavMenu({ onSetDropDown }) {
    const [isDropDownActive, setIsDropDownActive] = useState(false)
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const dropdownRef = useClickOutside(onDropdownClickOutside)

    function onDropdownClickOutside() {
        setIsDropDownActive(false)
    }

    function onSetDropDown(ev) {
        ev.preventDefault()
        const { target } = ev
        setPos(target.parentNode.getBoundingClientRect())
        setIsDropDownActive(true)
    }

    return (
        <section className="main-nav-menu-container" ref={dropdownRef} onClick={(ev) => onSetDropDown(ev)}>
            <section className="main-nav-menu">
                <article className="bars"><SvgHandler svgName={USER_NAV_BARS} /></article>
                <article className="profile"><SvgHandler svgName={USER_NAV_PROFILE} /></article>
            </section>
            {isDropDownActive && <DropDown pos={pos} />}
        </section>
    )
}