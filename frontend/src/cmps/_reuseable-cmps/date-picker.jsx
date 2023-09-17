import { DayPicker } from "react-day-picker"
import { startOfDay } from 'date-fns'


export function DatePicker({ selectedRange, handleRangeSelect, availableDates = [] }) {
    const date = new Date()
    const today = startOfDay(date)


    // console.log('availableDates', availableDates)
    const availableTimestampDateRanges = availableDates.map(availableRange => {
        const DAY = 1000 * 60 * 60 * 24
        const timestampRange = {
            from: startOfDay(Date.parse(today) + (DAY * availableRange.daysFromToday)),
            to: startOfDay(Date.parse(today) + (DAY * availableRange.until))
        }
        return timestampRange
    })
    // console.log('availableTimestampDateRanges', availableTimestampDateRanges)



    function isDayDisabled(day) {
        const isBeforeToday = day < today // Disable days before today
        const isOutsideRange = availableDates.length > 0 ?
            !availableTimestampDateRanges.some(range => // Disable days not in available ranges
                (day >= range.from && day <= range.to)
            )
            : false

        return isBeforeToday || isOutsideRange
    }

    const dayModifiers = {
        disabled: (day) => isDayDisabled(day),//add styling to disabled days to differentiate 
    }

    const classNames = {
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_range_middle: 'day-range-middle',
    }


    return (
        <section className="date-picker">
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