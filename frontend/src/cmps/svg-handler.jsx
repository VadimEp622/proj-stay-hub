import React from 'react'

// ************************************** ARROWS **************************************
import { ReactComponent as ArrowLeftFat } from '../assets/img/arrows/arrow-left-fat.svg'
import { ReactComponent as ArrowLeft } from '../assets/img/arrows/arrow-left.svg'
import { ReactComponent as ArrowRightFat } from '../assets/img/arrows/arrow-right-fat.svg'
import { ReactComponent as ArrowRight } from '../assets/img/arrows/arrow-right.svg'
import { ReactComponent as ArrowUp } from '../assets/img/arrows/arrow-up.svg'

// ************************************** ... **************************************
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
import { ReactComponent as Eye } from '../assets/img/eye/eye.svg'
import { ReactComponent as RedTag } from '../assets/img/tag/red tag.svg'
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
import { ReactComponent as Exclamation } from '../assets/img/airbnb-assets/exclamationmark.svg'
import { ReactComponent as Superhost } from '../assets/img/superhost/super-host.svg'
import { ReactComponent as BlackSuperhost16 } from '../assets/img/superhost/superhost-black-16.svg'

import {
    HEART_16, RED_HEART_16, LOGO, RED_HEART, SEARCH, SHARE, STAR, STAR_16, USER_NAV_BARS, RED_TAG, SUPERHOST, BLACK_SUPERHOST_16, EYE,
    USER_NAV_PROFILE, WHITE_HEART, LOCATION, KEY, CHECKIN, SEARCH_2, TICK_DECLINE, VERIFIED, ARROW_LEFT_FAT, ARROW_LEFT, ARROW_RIGHT, ARROW_RIGHT_FAT, ARROW_UP
} from '../services/svg.service'


const SvgHandler = ({ svgName }) => {

    function svgIdentifier(name) {
        switch (name) {
            // ************************************** ARROWS **************************************
            case ARROW_LEFT_FAT:
                return <ArrowLeftFat />
            case ARROW_LEFT:
                return <ArrowLeft />
            case ARROW_RIGHT_FAT:
                return <ArrowRightFat />
            case ARROW_RIGHT:
                return <ArrowRight />
            case ARROW_UP:
                return <ArrowUp />

            // ************************************** ... **************************************
            case USER_NAV_BARS:
                return <UserNavBar />
            case LOGO:
                return <Logo />
            case USER_NAV_PROFILE:
                return <UserNavProfile />
            case STAR:
                return <Star />
            case RED_TAG:
                return <RedTag />
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
            case EYE:
                return <Eye />
            case CHECKIN:
                return <Checkin />
            case SUPERHOST:
                return <Superhost />
            case BLACK_SUPERHOST_16:
                return <BlackSuperhost16 />
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
