// Node modules
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { startOfDay } from 'date-fns'

// Services
import { stayService } from '../services/stay.service.js'


export default function useStayDetailsDates(stay, isLoadingStay) {
    const isLoadingDatesRef = useRef(true)
    const DAY = useMemo(() => 1000 * 60 * 60 * 24, [])
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [selectedRange, setSelectedRange] = useState(null)


    useEffect(() => {
        if (!isLoadingStay && Object.keys(stay).length > 0) {
            const initialState = getInitialState(filterBy)
            setSelectedRange(initialState)
            isLoadingDatesRef.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingStay, stay])


    function getInitialState(filterBy) {
        const today = Date.parse(startOfDay(Date.now()))
        const earliestCheckIn = stay
            ? today + (DAY * stay.availableDates[0].daysFromToday)
            : today

        return {
            from: new Date(filterBy?.from ? filterBy.from : earliestCheckIn),
            to: new Date(filterBy?.to ? filterBy.to : earliestCheckIn + DAY)
        }
    }

    const checkIn = selectedRange ? stayService.getDate(selectedRange?.from) : ''
    const checkOut = selectedRange ? stayService.getDate(selectedRange?.to) : ''

    return [isLoadingDatesRef.current, checkIn, checkOut, selectedRange, setSelectedRange]
}