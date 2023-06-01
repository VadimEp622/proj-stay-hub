import React from 'react'
import { Routes, Route } from 'react-router'

import { stayService } from './services/stay.service.local'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { StayDetails } from './pages/stay-details'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="stay/:stayId" element={<StayDetails />} /> 
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


