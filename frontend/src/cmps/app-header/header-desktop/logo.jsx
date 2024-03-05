// Node modules
import { Link, useNavigate } from "react-router-dom"

// Services
import { LOGO } from "../../../services/svg.service.js"

// Store
import { stayResetFilterBy } from "../../../store/staySlice"

// Components
import SvgHandler from "../../_reuseable-cmps/svg-handler.jsx"



export function Logo() {
    const navigate = useNavigate()

    function onHomepageRedirect(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        stayResetFilterBy()
        navigate('/')
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