import { NavLink } from "react-router-dom"

import routes from "../routes.js"
import { LOGO } from "../services/svg.service.js"

import SvgHandler from "./svg-handler.jsx"

export function Logo() {
    return (
        <section className="logo-container">
            {
                routes.map(route =>
                    route.isLogo &&
                    <NavLink
                        className={'page-navbar'}
                        key={route.path}
                        to={route.path}
                    >
                        <article className="logo-svg">
                            <SvgHandler svgName={LOGO} />
                            <span>{route.label}</span>
                        </article>
                    </NavLink>
                )
            }
        </section>
    )
}