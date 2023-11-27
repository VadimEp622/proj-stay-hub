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
import { socketService } from './services/socket.service.js'

// Custom Hooks
import useIsMobile from './customHooks/useIsMobile.js'

// Components
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { UserMsg } from './cmps/user-msg.jsx'
import { AppMainModal } from './cmps/app-main-modal.jsx'

// TODO-priority-high: make all pages start from top! (some pages start scrolling from middle on route change)
// TODO-priority-high: in dashboard-page mobile, table is overflowing!


// TODO: research where the following custom-hooks can be used:
//          1. useEffectUpdate.js
//          2. useForm.js

// TODO: attempt to abstract some custom-hooks, with the final goal to immediately understand what each hook does,
//    and to prevent too many hooks for one page cmp.

// TODO: add more variety to userMsg, and make styling better!



// **** Abstract ****
// TODO-priority-high: organize cmps

// TODO-medium: handle server interactions with minimum data transfer | sockets
// TODO-medium: in 'stay-details.jsx', In navbar, clicking on: 'photos/amenities/reviews/location'
//       makes it so ,in reviews, profile pictures keep changing.


export function RootCmp() {
    const isUnclickableBg = useSelector(storeState => storeState.systemModule.isUnclickableBg)
    const appModal = useSelector(storeState => storeState.systemModule.appModal)
    const location = useLocation()
    const isStayDetailsPage = location.pathname.startsWith('/stay/')
    const isMobile = useIsMobile()


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
            {isUnclickableBg && <div className='gray-viewport' onClick={(ev) => closeBackground(ev)}></div>}

            {appModal && <AppMainModal modalType={appModal} />}

            <section className={`app ${!isStayDetailsPage ? 'main-layout' : 'details-layout'}`}>
                <AppHeader isStayDetailsPage={isStayDetailsPage} isMobile={isMobile} />
                <main className={`app-main${isStayDetailsPage ? ' full details-layout' : ''}`}>
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    </Routes>
                </main>
                {!isMobile && <AppFooter isStayDetailsPage={isStayDetailsPage} />}
                <UserMsg />
            </section>
        </>
    )
}