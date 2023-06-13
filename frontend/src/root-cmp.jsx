import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { useParams, useLocation } from 'react-router-dom'


import { stayService } from './services/stay.service.local'// needed to init demo data to localStorage (do not delete)

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { StayDetails } from './pages/stay-details'
import { useSelector } from 'react-redux'
import { LoginSignup } from './cmps/login-signup'
import { OrderConfirmation } from './pages/order-confirmation'
import { DynamicCmp } from './cmps/reuseableCmp/dynamicCmp'
import { CLOSE_EXPANDED_HEADER, REMOVE_UNCLICKABLE_BG } from './store/system.reducer'
import { store } from './store/store'
import { WishList } from './pages/wishlist'
import { MyTrips } from './pages/trips'
import { AddStay } from './pages/add-stay'
import { JSONStringify } from './cmps/strinfigy'
import { MyDashboard } from './pages/my-dashboard'
import { UserMsg } from './cmps/user-msg'
import { SOCKET_EMIT_USER_WATCH, socketService } from './services/socket.service'
import { showSuccessMsg } from './services/event-bus.service'

export function RootCmp() {
    const isUnclickableBg = useSelector(storeState => storeState.systemModule.isUnclickableBg)
    const location = useLocation()
    const isStayDetailsPage = location.pathname.includes('/stay/')
    const isModalOpen = useSelector(storeState => storeState.stayModule.isModalOpen)
    const user = useSelector(storeState => storeState.userModule.user)


    // useEffect(() => {
    //     socketService.setup()
    //     return () => {
    //         socketService.terminate()
    //     }
    // }, [])


    // useEffect(() => {
    //     if (user) {
    //         socketService.login(user._id)
    //         socketService.on(SOCKET_EMIT_USER_WATCH, () => { showSuccessMsg('A stay you own just got reserved') })
    //         return () => {
    //             socketService.off(SOCKET_EMIT_USER_WATCH)
    //             socketService.logout()
    //         }
    //     }
    // }, [user])

    function closeBackground(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        store.dispatch({ type: CLOSE_EXPANDED_HEADER })
        store.dispatch({ type: REMOVE_UNCLICKABLE_BG })
    }
    // const modalType = useSelector((storeState) => storeState.stayModule.modalType)
    return (
        <>
            {isUnclickableBg && <div className="main-screen" onClick={(ev) => closeBackground(ev)}></div>}
            {isModalOpen && (
                <div className="modal-wrapper">
                    <div className="modal-wrapper-second">
                        <DynamicCmp modalType={isModalOpen} />
                    </div>
                </div>
            )}

            <section className={`app ${!isStayDetailsPage ? 'main-layout' : 'details-layout'} ${isUnclickableBg && 'unclickable-background'}`}>
                {window.innerWidth > 750 && <AppHeader isStayDetailsPage={isStayDetailsPage}  />}

                <main className="app-main">
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                        <Route path="user/:id" element={<UserDetails />} />
                        <Route path="wishlist" element={<WishList />} />
                        <Route path="/dashboard" element={<MyDashboard />} />
                        <Route path="/dashboard/stay/add" element={<AddStay />} />
                        <Route path="trips" element={<MyTrips />} />
                        <Route path="stay/:stayId" element={<StayDetails />} />
                        <Route path="stay/book/:stayId" element={<OrderConfirmation />} />
                        <Route path="stay/stringify" element={<JSONStringify />} />
                    </Routes>
                </main>
                {window.innerWidth > 750 && <AppFooter isStayDetailsPage={isStayDetailsPage} />}

            </section>

        </>
    )
}