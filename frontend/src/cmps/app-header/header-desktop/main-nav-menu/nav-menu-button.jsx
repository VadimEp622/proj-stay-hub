// Services
import { USER_NAV_BARS, USER_NAV_PROFILE } from "../../../../services/svg.service.js"

// Components
import SvgHandler from "../../../_reuseable-cmps/svg-handler.jsx"



export function NavMenuButton({user}) {
    return (
        <section className="nav-menu-button">
            <article className="bars"><SvgHandler svgName={USER_NAV_BARS} /></article>
            <article className="profile">
                {!user && <SvgHandler svgName={USER_NAV_PROFILE} />}
                {user && user.imgUrl && <img src={user.imgUrl} alt="user" />}
                {user && user.imgUrl.length < 1 && <SvgHandler svgName={USER_NAV_PROFILE} />}
            </article>
        </section>
    )
}