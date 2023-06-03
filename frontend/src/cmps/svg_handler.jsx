import React from 'react'
import { ReactComponent as Logo } from '../assets/img/logo/logo-airbnb.svg'
import { ReactComponent as UserNavBar } from '../assets/img/user-nav/user-nav-bars.svg'
import { ReactComponent as UserNavProfile } from '../assets/img/user-nav/user-nav-profile.svg'
import { ReactComponent as Star } from '../assets/img/star/star.svg'
import { ReactComponent as Star16 } from '../assets/img/star/star-16.svg'
import { ReactComponent as Share } from '../assets/img/share/share.svg'
import { ReactComponent as Heart16 } from '../assets/img/heart/heart-16.svg'
import { ReactComponent as RedHeart16 } from '../assets/img/heart/heart-red-16.svg'
import { ReactComponent as Search } from '../assets/img/search/search.svg'
import { ReactComponent as WhiteStrokedHeart } from '../assets/img/heart/heart-white.svg'
import { ReactComponent as RedStrokedHeart } from '../assets/img/heart/heart-red.svg'
import { ReactComponent as Location } from '../assets/img/location/location.svg'
import { ReactComponent as Key } from '../assets/img/key/key.svg'
import { ReactComponent as Checkin } from '../assets/img/self-checkin/self-checkin.svg'
import { HEART_16, RED_HEART_16, LOGO, RED_HEART, SEARCH, SHARE, STAR, STAR_16, USER_NAV_BARS, 
    USER_NAV_PROFILE, WHITE_HEART, LOCATION, KEY, CHECKIN } from '../services/svg.service'


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
            case STAR_16:
                return <Star16 />
            case SHARE:
                return <Share />
            case HEART_16:
                return <Heart16 />
            case RED_HEART_16:
                return <RedHeart16 />
            case SEARCH:
                return <Search />
            case WHITE_HEART:
                return <WhiteStrokedHeart />
            case RED_HEART:
                return <RedStrokedHeart />
            case LOCATION:
                return <Location />
            case KEY:
                return <Key />
            case CHECKIN:
                return <Checkin />
        
            default:
                return <Heart16 />
        }
        return null
    }

    return (svgIdentifier(svgName))
}

export default SvgHandler
