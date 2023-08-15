import { useState, useEffect } from 'react'
// import { DateRange, SelectRangeEventHandler, DayPicker } from 'react-day-picker'
// import { compareAsc, format, startOfDay, parseISO, parse } from 'date-fns'
import { DatePicker } from '../../../_reuseable-cmps/date-picker.jsx'



// WHY IS DATE FILTER RENDER DATES RESTARTS?
export function DateFilter({ filterBy, onSetFilterDates }) {
    const [selectedRange, setSelectedRange] = useState({
        from: filterBy.from ? new Date(filterBy.from) : '',
        to: filterBy.to ? new Date(filterBy.to) : ''
    })


    useEffect(() => {
        onSetFilterDates(selectedRange)
    }, [selectedRange])


    function handleRangeSelect(range) {
        setSelectedRange(range)
    }

    
    return (
        <section className="filter-date-picker">
            <DatePicker selectedRange={selectedRange} handleRangeSelect={handleRangeSelect} />
        </section>
    )
}