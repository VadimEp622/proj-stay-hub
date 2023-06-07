import { compareAsc, format, startOfDay } from 'date-fns'
import { useRef, useState, createElement, useEffect } from 'react'
import { DateRange, SelectRangeEventHandler, DayPicker } from 'react-day-picker'
import styles from 'react-day-picker/dist/style.module.css'


// WHY IS DATE FILTER RENDER DATES RESTARTS?
export function DateFilter({ filterBy, onSetFilterDates }) {
    const date = new Date()
    const today = startOfDay(date)
    const [selectedRange, setSelectedRange] = useState({
        from: filterBy.from ? new Date(filterBy.from).toString() : '',
        to: filterBy.to ? new Date(filterBy.to).toString() : ''
    })



    useEffect(() => {
        onSetFilterDates(selectedRange)
    }, [selectedRange])



    function handleRangeSelect(range) {
        setSelectedRange(range)
    }

    function isDayDisabled(day) {
        return day < today
    }

    const dayModifiers = {
        disabled: (day) => isDayDisabled(day),//add styling to disabled days to differentiate 
    }

    const classNames = {
        // ...styles,
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_range_middle: 'day-range-middle'
    }



    return (
        <section className="filter-date-picker" style={{ width: "fit-content" }}>
            <DayPicker
                mode="range"
                numberOfMonths={2}
                selected={selectedRange}
                onSelect={handleRangeSelect}

                classNames={classNames}//add classnames for styling
                modifiers={dayModifiers}//add styling(?)
                disabled={isDayDisabled}//disables given days
            />
        </section>
    )
}