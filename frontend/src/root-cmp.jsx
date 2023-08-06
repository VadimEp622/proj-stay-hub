// Node Modules
import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Routes
import routes from './routes.js'

// Store
import { store } from './store/store.js'
import { CLOSE_EXPANDED_HEADER, REMOVE_UNCLICKABLE_BG } from './store/system.reducer.js'

// Services
import { socketService,  SOCKET_EMIT_STAY_RESERVED, SOCKET_EMIT_USER_WATCH} from './services/socket.service.js'

// Components
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { DynamicCmp } from './cmps/_reuseable-cmps/dynamicCmp.jsx'
import { UserMsg } from './cmps/user-msg.jsx'

// TODO-priority-critical: fix order button, in alt-header in stay-details, not prompting login/signup modal if
// attempting order when unregistered

// TODO-priority-critical: some stays have check-in/out timestamps which are in the past. 
// this causes an issue, at showing fetched orders from DB in the cmp "user-trips.jsx"
// need to fix this, so their starting point will always be ---> from the date of visitor (whether logged in, or not) 


// TODO-priority-high: organize cmps | change colors/box-shadows/sizes in scss to vars
// TODO-medium: handle server interactions with minimum data transfer | sockets

export function RootCmp() {
    const isUnclickableBg = useSelector(storeState => storeState.systemModule.isUnclickableBg)
    const isModalOpen = useSelector(storeState => storeState.stayModule.isModalOpen)
    const location = useLocation()
    const isStayDetailsPage = location.pathname.includes('/stay/')
    // const user = useSelector(storeState => storeState.userModule.user)


    useEffect(() => {
        socketService.setup()
        return () => {
            socketService.terminate()
        }
    }, [])


    // useEffect(() => {
    //     if (user) {
    //         socketService.login(user._id)
    //         socketService.on('set-user-socket', user._id)
    //         return () => {
    //             socketService.logout()
    //             socketService.off('set-user-socket')
    //         }
    //     }
    // }, [user])

    function closeBackground(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        store.dispatch({ type: CLOSE_EXPANDED_HEADER })
        store.dispatch({ type: REMOVE_UNCLICKABLE_BG })
    }
    return (
        <>
            {isUnclickableBg && <div className="gray-viewport" onClick={(ev) => closeBackground(ev)}></div>}
            {isModalOpen && (
                <div className="modal-wrapper-container">
                    <div className="modal-wrapper">
                        <DynamicCmp modalType={isModalOpen} />
                    </div>
                </div>
            )}

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