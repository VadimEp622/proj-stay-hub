// Node modules
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { startOfDay } from 'date-fns'

// Services
import { stayService } from '../services/stay.service.js'


export default function useStayDates() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const today = Date.parse(startOfDay(Date.now()))
    const DAY = 1000 * 60 * 60 * 24
    const initialState = {
        checkIn: stayService.getDate(filterBy?.from ? filterBy.from : today),
        checkOut: stayService.getDate(filterBy?.to ? filterBy.to : today + DAY)
    }
    const [checkIn, setCheckIn] = useState(initialState.checkIn)
    const [checkOut, setCheckOut] = useState(initialState.checkOut)

    const handleDateChange = (newCheckIn, newCheckOut) => {
        setCheckIn(stayService.getDate(newCheckIn))
        setCheckOut(stayService.getDate(newCheckOut))
    }

    return [checkIn, checkOut, handleDateChange]
}
