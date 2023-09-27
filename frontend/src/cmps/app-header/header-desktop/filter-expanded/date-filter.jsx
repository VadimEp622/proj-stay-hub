import { useState, useEffect } from 'react'
import { DatePicker } from '../../../_reuseable-cmps/date-picker.jsx'
import useIsMobile from '../../../../customHooks/useIsMobile.js'


export function DateFilter({ filterBy, onSetFilterDates }) {
    const isScreenWidthLessThan = useIsMobile(900)
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

    const numberOfMonths = isScreenWidthLessThan ? 1 : 2
    return (
        <section className='filter-date-picker'>
            <DatePicker
                selectedRange={selectedRange}
                handleRangeSelect={handleRangeSelect}
                numberOfMonths={numberOfMonths}
            />
        </section>
    )
}