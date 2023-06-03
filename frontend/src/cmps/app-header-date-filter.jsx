import { compareAsc, format, startOfDay } from 'date-fns'
import { useRef, useState, createElement, useEffect } from 'react'
import { DateRange, SelectRangeEventHandler, DayPicker } from 'react-day-picker'
import styles from 'react-day-picker/dist/style.module.css'

export function DateFilter({ filterBy, onSubmit, setFilterDates }) {
    const [selectedRange, setSelectedRange] = useState('')
    const [fromValue, setFromValue] = useState('')
    const [toValue, setToValue] = useState('')


    const date = new Date()
    const today = startOfDay(date)

    useEffect(() => {
        setFilterDates(selectedRange)
    }, [selectedRange])


    function handleRangeSelect(range) {
        setSelectedRange(range)
        if (range?.from) {
            setFromValue(format(range.from, 'y-MM-dd'))
        } else {
            setFromValue('')
        }
        if (range?.to) {
            setToValue(format(range.to, 'y-MM-dd'))
        } else {
            setToValue('')
        }
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
        <section className="filter-date-picker">
            <section className="flex space-evenly">
                <article>
                    <label>Check In</label>
                    <p>{fromValue}</p>
                </article>
                <article>
                    <label>Check Out</label>
                    <p>{toValue}</p>
                </article>
            </section>
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