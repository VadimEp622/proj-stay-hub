// Node Modules
import { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Routes
import routes from './routes.js'

// Store
import { store } from './store/store.js'
import { CLOSE_EXPANDED_HEADER, REMOVE_UNCLICKABLE_BG } from './store/system.reducer.js'

// Services
import { socketService, SOCKET_EMIT_STAY_RESERVED, SOCKET_EMIT_USER_WATCH } from './services/socket.service.js'

// Components
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { UserMsg } from './cmps/user-msg.jsx'
import { AppMainModal } from './cmps/app-main-modal.jsx'


// TODO: add more variety to userMsg, and make styling better!


// TODO-priority-high: in "user-trips.jsx", make sure dates already passed don't display anymore/display in "previous trips"
// TODO-priority-high: in "stay-details.jsx", implement the date-picker
// TODO-priority-high: in "user-dashboard.jsx", fix charts responsiveness/fluidity with desktop/mobile

// TODO-priority-high: make "stay-details.jsx" work for mobile (either attempt at convert existing, or build new one)
// TODO-priority-high: make all pages start from top! (some pages start scrolling from middle on route change)


// **** Abstract ****
// TODO-priority-high: organize cmps
// TODO-priority-high: firefox site looks very different from chrome, figure out a solution
// TODO-medium: research and decide which sizes in scss to convert to vars, and whether they needs to be rem/em dependant
// TODO-medium: handle server interactions with minimum data transfer | sockets


// TODO-medium: in "stay-details.jsx", in alt-header, box-shadow from lower cmp encroaches on alt-header area
// TODO-medium: in "stay-details.jsx", in reviews, clicking "show more" changes profile pictures,
//     as well as clicking on "photos/amenities/reviews/location" in alt-header 


export function RootCmp() {
    const isUnclickableBg = useSelector(storeState => storeState.systemModule.isUnclickableBg)
    const appModal = useSelector(storeState => storeState.systemModule.appModal)
    const location = useLocation()
    const isStayDetailsPage = location.pathname.startsWith('/stay/')


    useEffect(() => {
        socketService.setup()
        return () => {
            socketService.terminate()
        }
    }, [])


    function closeBackground(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        store.dispatch({ type: CLOSE_EXPANDED_HEADER })
        store.dispatch({ type: REMOVE_UNCLICKABLE_BG })
    }

    return (
        <>
            {isUnclickableBg && <div className="gray-viewport" onClick={(ev) => closeBackground(ev)}></div>}

            {appModal && <AppMainModal modalType={appModal} />}

            <section className={`app ${!isStayDetailsPage ? 'main-layout' : 'details-layout'}`}>
                <AppHeader isStayDetailsPage={isStayDetailsPage} />
                <main className="app-main">
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    </Routes>
                </main>
                {window.innerWidth > 750 && <AppFooter isStayDetailsPage={isStayDetailsPage} />}
                <UserMsg />
            </section>
        </>
    )
}