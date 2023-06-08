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
import { ReactComponent as Search2 } from '../assets/img/search/search-2.svg'
import { ReactComponent as WhiteStrokedHeart } from '../assets/img/heart/heart-white.svg'
import { ReactComponent as RedStrokedHeart } from '../assets/img/heart/heart-red.svg'
import { ReactComponent as Location } from '../assets/img/location/location.svg'
import { ReactComponent as Key } from '../assets/img/key/key.svg'
import { ReactComponent as Checkin } from '../assets/img/self-checkin/self-checkin.svg'
import { ReactComponent as Kitchen } from '../assets/img/airbnb-assets/kitchen.svg'
import { ReactComponent as TV } from '../assets/img/airbnb-assets/tv.svg'
import { ReactComponent as Dishes } from '../assets/img/airbnb-assets/dishes.svg'
import { ReactComponent as Gym } from '../assets/img/airbnb-assets/gym.svg'
import { ReactComponent as HotTub } from '../assets/img/airbnb-assets/hot-tub.svg'
import { ReactComponent as Pets } from '../assets/img/airbnb-assets/pets-allowed.svg'
import { ReactComponent as Refrigerator } from '../assets/img/airbnb-assets/refrigerator.svg'
import { ReactComponent as Wifi } from '../assets/img/airbnb-assets/wifi.svg'
import { ReactComponent as AirCond } from '../assets/img/airbnb-assets/air-cond.svg'
import { ReactComponent as Verified } from '../assets/img/airbnb-assets/verified.svg'
import { ReactComponent as TickDecline } from '../assets/img/tick-decline/tick-decline.svg'
import { ReactComponent as Exit } from '../assets/img/airbnb-assets/exit.svg'
import { ReactComponent as LeftArrow } from '../assets/img/airbnb-assets/left-arrow.svg'
import { ReactComponent as Exclamation } from '../assets/img/airbnb-assets/exclamationmark.svg'
import { ReactComponent as Exclamation } from '../assets/img/airbnb-assets/exclamationmark.svg'
import { ReactComponent as LeftArrow } from '../assets/img/airbnb-assets/left-arrow.svg'

import {
    HEART_16, RED_HEART_16, LOGO, RED_HEART, SEARCH, SHARE, STAR, STAR_16, USER_NAV_BARS,
    USER_NAV_PROFILE, WHITE_HEART, LOCATION, KEY, CHECKIN, SEARCH_2, TICK_DECLINE, VERIFIED
} from '../services/svg.service'


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
            case SEARCH_2:
                return <Search2 />
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
            case 'TV':
                return <TV />
            case 'Wifi':
                return <Wifi />
            case 'Kitchen':
                return <Kitchen />
            case 'Pets allowed':
                return <Pets />
            case 'Cooking basics':
                return <Dishes />
            case 'Hot tub':
                return <HotTub />
            case 'Air conditioning':
                return <AirCond />
            case 'Gym':
                return <Gym />
            case 'Refrigerator':
                return <Refrigerator />
            case 'verified':
                return <Verified />
            case TICK_DECLINE:
                return <TickDecline />
            case 'exit':
                return <Exit />
            case 'exclamation':
                return <Exclamation />
            default:
                return <Heart16 />
        }
        return null
    }

    return (svgIdentifier(svgName))
}

export default SvgHandler
