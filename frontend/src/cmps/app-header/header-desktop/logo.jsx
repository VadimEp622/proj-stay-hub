import { Link } from "react-router-dom"

import { LOGO } from "../../../services/svg.service.js"
import SvgHandler from "../../_reuseable-cmps/svg-handler.jsx"



export function Logo() {
    function onHomepageRedirect(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        console.log('clicked logo')
    }

    return (
        <section className="logo-container">
            <Link className="page-navbar" to="/" onClick={(ev) => onHomepageRedirect(ev)}>
                <article className="logo-svg">
                    <SvgHandler svgName={LOGO} />
                    <span>StayHub</span>
                </article>
            </Link>
        </section>
    )
}