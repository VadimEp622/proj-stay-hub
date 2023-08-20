// Node modules
import { useEffect, useState } from "react"

// Services
import { stayService } from "../services/stay.service.js"
import { utilService } from "../services/util.service.js"


export default function useStayDetails(stay, checkIn, checkOut, guests) {
    const initialValues = {
        price: Math.floor(stay.price + ((stay.price / 8) * (guests.adults + guests.children - 1))),
        guestCount: guests.adults + guests.children,
        nightsCount: stayService.calculateHowManyNights(Date.parse(checkIn), Date.parse(checkOut)),
        serviceFee: utilService.getRandomIntInclusive(100, 500),
        cleaningFee: utilService.getRandomIntInclusive(100, 500)
    }
    const [orderDetails, setOrderDetails] = useState(initialValues)



    useEffect(() => {
        setOrderDetails(prevOrder => ({
            ...prevOrder,
            price: Math.floor(stay.price + ((stay.price / 8) * (guests.adults + guests.children - 1))),
            guestCount: guests.adults + guests.children,
            nightsCount: stayService.calculateHowManyNights(Date.parse(checkIn), Date.parse(checkOut))
        }))
    }, [checkIn, checkOut, guests, stay.price])

    return [orderDetails]
}