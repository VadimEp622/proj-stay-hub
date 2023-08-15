import { Link } from "react-router-dom"

import { LOGO } from "../../../services/svg.service.js"

import SvgHandler from "../../svg-handler.jsx"

export function Logo() {
    return (
        <section className="logo-container">
            <Link className="page-navbar" to="/">
                <article className="logo-svg">
                    <SvgHandler svgName={LOGO} />
                    <span>StayHub</span>
                </article>
            </Link>
        </section>
    )
}