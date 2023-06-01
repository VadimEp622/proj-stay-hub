import React from 'react'
import { ReactComponent as Logo } from '../assets/img/logo/logo-airbnb.svg'
import { ReactComponent as UserNav } from '../assets/img/user-nav/user-nav.svg'

const SvgHandler = ({ svgName }) => {

    console.log('svgName', svgName)

    function svgIdentifier(name) {
        switch (name) {
            case 'UserNav':
                return <UserNav />
            case 'Logo':
                return <Logo />
        }
    }

    return (svgIdentifier(svgName))
}

export default SvgHandler




// 