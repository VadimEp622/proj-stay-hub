// Services
import { TICK_DECLINE } from '../services/svg.service.js'

// Components
import SvgHandler from './_reuseable-cmps/svg-handler.jsx'


export function AppFooter({ isStayDetailsPage }) {

    const currYear = new Date().getFullYear()
    return (
        <footer className={`app-footer full ${!isStayDetailsPage ? 'main-layout' : 'details-layout'}`}>
            <ul className='left-list flex align-center fs14 lh18'>
                <li>© {currYear} StayHub, Inc.</li>
                <li>Terms</li>
                <li>Sitemap</li>
                <li>Privacy</li>
                <li className='flex gap8 align-center'>Your Privacy Choices {<SvgHandler svgName={TICK_DECLINE} />}</li>
            </ul>
        </footer>
    )
}