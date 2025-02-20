// Node modules
import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// Store
import { loadStay, loadWishlistedStayId } from '../store/staySlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'


// NOTE: on stay-details route, loadStay can only be requested once, on cmp load, and never again.
//          Thus, the isRequestedOnceOnCmpLoadRef is used to enforce this.

export default function useLoadStay(stayId) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const loggedinUser = useAppSelector(storeState => storeState.userModule.user)
    const isRequestedOnceOnCmpLoadRef = useRef(false)

    const handleLoadStay = useCallback(async () => {
        try {
            isRequestedOnceOnCmpLoadRef.current = true
            await dispatch(loadStay(stayId))
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }, [navigate, dispatch, stayId])

    const handleLoadWishlistStayId = useCallback(() => {
        if (loggedinUser) {
            dispatch(loadWishlistedStayId(stayId))
        }
    }, [dispatch, stayId, loggedinUser])

    useEffect(() => {
        if (!isRequestedOnceOnCmpLoadRef.current) {
            handleLoadStay()
            handleLoadWishlistStayId()
        }
    }, [isRequestedOnceOnCmpLoadRef, handleLoadStay, handleLoadWishlistStayId])
}