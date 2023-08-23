// Node modules
import React from 'react'

// Components
import { FilterModal } from '../filter.jsx'
import { AppLoginSignup } from '../app-login-signup.jsx'

export function DynamicCmp({ modalType }) {
    switch (modalType) {
        case 'logIn':
            return <AppLoginSignup isSignUp={false} />
        case 'signUp':
            return <AppLoginSignup isSignUp={true} />
        case 'filter':
            return <FilterModal />
        default:
            return
    }
}