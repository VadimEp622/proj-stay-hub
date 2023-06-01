import React from 'react'
import { ReactComponent as Logo } from '../assets/img/logo/logo-airbnb.svg'
import { ReactComponent as UserNavBar } from '../assets/img/user-nav/user-nav-bars.svg'
import { ReactComponent as UserNavProfile } from '../assets/img/user-nav/user-nav-profile.svg'

import { LOGO, USER_NAV_BARS, USER_NAV_PROFILE } from '../services/svg.service.js'



const SvgHandler = ({ svgName }) => {

    console.log('svgName', svgName)

    function svgIdentifier(name) {
        switch (name) {
            case USER_NAV_BARS:
                return <UserNavBar />
            case LOGO:
                return <Logo />
            case USER_NAV_PROFILE:
                return <UserNavProfile />
        }
    }

    return (svgIdentifier(svgName))
}

export default SvgHandler




// 