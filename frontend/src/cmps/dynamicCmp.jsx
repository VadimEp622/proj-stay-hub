import React from 'react';
import { useSelector } from 'react-redux';
import { LoginSignup } from './cmps/login-signup';
import { FilterModal } from './filter';

const DynamicCmp = ({ modalType }) => {
    switch (modalType) {
        case 'loginSignup':
            return <LoginSignup />
            break
        case 'filter':
            return <FilterModal />
            break
        default:
            return null;
    }
};

export default DynamicCmp;
