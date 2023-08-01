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



export function RootCmp() {
    const isUnclickableBg = useSelector(storeState => storeState.systemModule.isUnclickableBg)
    const location = useLocation()
    const isStayDetailsPage = location.pathname.includes('/stay/')
    const isModalOpen = useSelector(storeState => storeState.stayModule.isModalOpen)
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
                <div className="modal-wrapper">
                    <div className="modal-wrapper-second">
                        <DynamicCmp modalType={isModalOpen} />
                    </div>
                </div>
            )}

            <section className={`app ${!isStayDetailsPage ? 'main-layout' : 'details-layout'} ${isUnclickableBg && 'unclickable-background'}`}>
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