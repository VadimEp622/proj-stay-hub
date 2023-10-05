// Node modules
import { useEffect, useMemo, useRef, useState } from 'react'

// Services
import { stayService } from '../services/stay.service.js'
import { utilService } from '../services/util.service.js'


export default function useStayDetailsOrderDetails(isLoadingDates, stay, checkIn, checkOut, guests) {
    const isLoadingOrderDetailsRef = useRef(true)

    const immutableFees = useMemo(() => ({
        serviceFee: utilService.getRandomIntInclusive(100, 500),
        cleaningFee: utilService.getRandomIntInclusive(100, 500)
    }), [])

    const [orderDetails, setOrderDetails] = useState({})


    useEffect(() => {
        if (!isLoadingDates) {
            isLoadingOrderDetailsRef.current = false
            if (checkIn && checkOut) {
                handleOrderDetailsUpdate()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingDates, checkIn, checkOut, guests])


    useEffect(() => {
        if (!isLoadingOrderDetailsRef.current && (!checkIn || !checkOut)) handleOrderDetailsDatesReset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkIn, checkOut])

    function handleOrderDetailsUpdate() {
        setOrderDetails(prevOrder => ({ ...prevOrder, ...getUpdatedValues() }))
    }

    function handleOrderDetailsDatesReset() {
        setOrderDetails(prevOrder => ({ ...prevOrder, nightsCount: null }))
    }

    function getUpdatedValues() {
        return {
            price: Math.floor(stay.price + ((stay.price / 8) * (guests.adults + guests.children - 1))),
            guestCount: guests.adults + guests.children,
            nightsCount: stayService.calculateHowManyNights(Date.parse(checkIn), Date.parse(checkOut)),
            ...immutableFees
        }
    }

    return [isLoadingOrderDetailsRef.current, orderDetails]
}