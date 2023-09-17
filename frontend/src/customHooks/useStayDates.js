// Node modules
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { startOfDay } from 'date-fns'

// Services
import { stayService } from '../services/stay.service.js'


const DAY = 1000 * 60 * 60 * 24

export default function useStayDates(stay) {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')


    useEffect(() => {
        const initialState = getInitialState(filterBy)
        setCheckIn(initialState.checkIn)
        setCheckOut(initialState.checkOut)
    }, [stay])


    const getInitialState = (filterBy) => {
        const today = Date.parse(startOfDay(Date.now()))
        const earliestCheckIn = stay
            ? today + (DAY * stay.availableDates[0].daysFromToday)
            : today

        return {
            checkIn: stayService.getDate(filterBy?.from ? filterBy.from : earliestCheckIn),
            checkOut: stayService.getDate(filterBy?.to ? filterBy.to : earliestCheckIn + DAY),
        }
    }

    const handleDateChange = (newCheckIn, newCheckOut) => {
        setCheckIn(stayService.getDate(newCheckIn))
        setCheckOut(stayService.getDate(newCheckOut))
    }

    const selectedRange = {
        from: startOfDay(Date.parse(checkIn)),
        to: startOfDay(Date.parse(checkOut))
    }

    return [checkIn, checkOut, selectedRange, handleDateChange]
}
