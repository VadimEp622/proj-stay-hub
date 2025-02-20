// Node modules
import { useEffect, useRef, useState } from 'react'

// Services
import { userService } from '../services/user.service'

// Store
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { stayUpdateReqStatusLoadStay, stayUpdateReqStatusLoadWishlistId } from '../store/staySlice'

// Custom hooks
import useLoadStay from './useLoadStay'
import useStayDetailsDates from './useStayDetailsDates'
import useStayDetailsGuests from './useStayDetailsGuests'
import useStayDetailsOrderDetails from './useStayDetailsOrderDetails'


export default function useStayDetails(stayId) {
    const [isLoading, setIsLoading] = useState(true)
    const stay = useAppSelector(storeState => storeState.stayModule.stay)
    const reqStatusLoadStay = useAppSelector(storeState => storeState.stayModule.reqStatusLoadStay)
    const stayHostImgUrlRef = useRef()

    useLoadStay(stayId)
    const [isLoadingDates, checkIn, checkOut, selectedRange, setSelectedRange] = useStayDetailsDates(stay, reqStatusLoadStay)
    const [guests, setGuests] = useStayDetailsGuests()// TODO: isLoadedGuests
    const [isLoadingOrderDetails, orderDetails] = useStayDetailsOrderDetails(isLoadingDates, stay, checkIn, checkOut, guests)// TODO: !isLoadedDates && !isLoadedGuests
    const dispatch = useAppDispatch()



    useEffect(() => {
        return () => {
            dispatch(stayUpdateReqStatusLoadWishlistId("idle"))
            dispatch(stayUpdateReqStatusLoadStay("idle"))
        }
    }, [dispatch])

    useEffect(() => {
        if (reqStatusLoadStay !== 'pending' && stay) stayHostImgUrlRef.current = userService.randomHostImg()
    }, [reqStatusLoadStay, stay])

    useEffect(() => {
        if (!isLoadingOrderDetails) setIsLoading(false)
    }, [isLoadingOrderDetails])



    return [
        isLoading,
        stay, stayHostImgUrlRef.current,
        checkIn, checkOut, selectedRange, setSelectedRange,
        guests, setGuests,
        orderDetails,
    ]
}
