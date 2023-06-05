import React from 'react'
import { Routes, Route } from 'react-router'

import { stayService } from './services/stay.service.local'// needed to init demo data to localStorage (do not delete)

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { StayDetails } from './pages/stay-details'
import { useSelector } from 'react-redux'

export function RootCmp() {
    const isUnclickableBg = useSelector(storeState => storeState.systemModule.isUnclickableBg)

    return (
        <section className={`app main-layout ${isUnclickableBg && 'unclickable-background'}`}>
            <AppHeader />
            <div className="full unclickable"></div>
            <main className="app-main">
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />
                </Routes>
            </main>
            <AppFooter />

        </section>
    )
}


