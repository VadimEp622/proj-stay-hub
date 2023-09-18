// Node modules
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { startOfDay } from 'date-fns'


export default function useStayDates(stay) {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [selectedRange, setSelectedRange] = useState({})
    const DAY = useMemo(() => 1000 * 60 * 60 * 24, [])


    useEffect(() => {
        const initialState = getInitialState(filterBy)
        setSelectedRange(initialState)
    }, [stay])


    const getInitialState = (filterBy) => {
        const today = Date.parse(startOfDay(Date.now()))
        const earliestCheckIn = stay
            ? today + (DAY * stay.availableDates[0].daysFromToday)
            : today

        return {
            from: new Date(filterBy?.from ? filterBy.from : earliestCheckIn),
            to: new Date(filterBy?.to ? filterBy.to : earliestCheckIn + DAY)
        }
    }

    return [selectedRange, setSelectedRange]
}