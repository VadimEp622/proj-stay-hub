import React from 'react'
import { ReactComponent as Logo } from '../assets/img/logo/logo-airbnb.svg'
import { ReactComponent as UserNavBar } from '../assets/img/user-nav/user-nav-bars.svg'
import { ReactComponent as UserNavProfile } from '../assets/img/user-nav/user-nav-profile.svg'
import { ReactComponent as Star } from '../assets/img/star/star.svg'
import { ReactComponent as Share } from '../assets/img/share/share.svg'
import { ReactComponent as Heart } from '../assets/img/heart/heart.svg'
import { ReactComponent as Search } from '../assets/img/search/search.svg'
import { HEART, LOGO, SEARCH, SHARE, STAR, USER_NAV_BARS, USER_NAV_PROFILE } from '../services/svg.service'


const SvgHandler = ({ svgName }) => {

    function svgIdentifier(name) {
        switch (name) {
            case USER_NAV_BARS:
                return <UserNavBar />
            case LOGO:
                return <Logo />
            case USER_NAV_PROFILE:
                return <UserNavProfile />
            case STAR:
                return <Star />
            case SHARE:
                return <Share />
            case HEART:
                return <Heart />
            case SEARCH:
                return <Search />
            // case:
            //     return default
        }
    }

    return (svgIdentifier(svgName))
}

export default SvgHandler




// 