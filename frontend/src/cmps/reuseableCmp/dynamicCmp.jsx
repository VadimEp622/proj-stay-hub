import React from 'react';
import { useSelector } from 'react-redux';
import { FilterModal } from '../filter';
import { LoginSignup } from '../login-signup';

export function DynamicCmp({ modalType }) {
    switch (modalType) {
        case 'loginSignup':
            return <LoginSignup />
            break
        case 'filter':
            return <FilterModal />
            break
        default:
            return null
    }
}