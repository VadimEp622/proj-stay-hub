// Services
import { TICK_DECLINE } from '../services/svg.service.js'

// Components
import SvgHandler from './_reuseable-cmps/svg-handler.jsx'



export function AppFooter({ isStayDetailsPage }) {
    return (
        <footer className={`app-footer full ${!isStayDetailsPage ? 'main-layout' : 'details-layout'}`}>
            <p className="flex align-center">
                © {new Date().getFullYear()} StayHub, Inc. <span>·</span> Terms <span>·</span> Sitemap <span>·</span> Privacy <span>·</span> Your Privacy Choices {<SvgHandler svgName={TICK_DECLINE} />}
            </p>
        </footer>
    )
}