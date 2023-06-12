import { useEffect, useState } from "react"

import { USER_NAV_BARS, USER_NAV_PROFILE } from "../../services/svg.service.js"
import { useClickOutside } from "../../customHooks/clickOutsideModal.js"

import { DropDown } from "../dropdown-menu.jsx"
import SvgHandler from "../svg-handler.jsx"
import { useSelector } from "react-redux"

export function MainNavMenu() {
    const [isDropDownActive, setIsDropDownActive] = useState(false)
    const dropdownRef = useClickOutside(onDropdownClickOutside)
    const user = useSelector(storeState => storeState.userModule.user)

    //DROP DOWN IS OKAY, NO PROBLEM
    // useEffect(() => {
    //     console.log('Hello isDropDownActive')
    // }, [isDropDownActive])

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
                <article className="profile">
                    {!user && <SvgHandler svgName={USER_NAV_PROFILE} />}
                    {user && user.imgUrl && <img src={user.imgUrl} />}
                    {user && user.imgUrl.length < 1 && <SvgHandler svgName={USER_NAV_PROFILE} />}
                </article>
            </section>
            {isDropDownActive && <DropDown setIsDropDownActive={setIsDropDownActive} />}
        </section>
    )
}