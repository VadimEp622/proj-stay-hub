import { useMemo } from 'react'
import { DayPicker } from 'react-day-picker'
import { startOfDay } from 'date-fns'


// TODO: in stay-details's date-picker, consider how to make it so, that:
//   1. All current stay's available dates are enabled, only when: both selectedRange's "from" and "to" are NOT an empty string
//   2. When both selectedRanges's "from" and "to" are NOT an empty string, prevent from selecting another range over "unavailable" ranges


// TODO: in date-picker, add reset button:
//    1. stay-detail's is button is a square "clear dates"
//    2. app's shared header, when expanded and clicked check-in/check-out, display circled "X"


// TODO: consider inserting function isDayDisabled as parameter, to make parent cmp responsible for calculation,
//    and thus making date-picker abstracted, with better reusability logic 


export function DatePicker({ selectedRange, handleRangeSelect, availableDates = [] }) {
    const DAY = useMemo(() => 1000 * 60 * 60 * 24, [])
    const today = startOfDay(new Date())

    const availableTimestampDateRanges = availableDates.map(availableRange => {
        const timestampRange = {
            from: startOfDay(Date.parse(today) + (DAY * availableRange.daysFromToday)),
            to: startOfDay(Date.parse(today) + (DAY * availableRange.until))
        }
        return timestampRange
    })

    function isDayDisabled(day) {
        const isBeforeToday = day < today // Disable days before today
        const isOutsideRange = availableDates.length > 0 // if checking current stay's available days
            ? (!availableTimestampDateRanges.some(range => {

                if (day >= range?.from && day <= range?.to) {
                    if (selectedRange?.from) {
                        if ((selectedRange?.from >= range.from && selectedRange?.from <= range.to)) return true
                        return false // Disable days, outside current stay's range of available days, which contains current selected range 
                    }
                    return true // Enable days, inside current stay's available days
                }
                return false // Disable days, outside current stay's available days
            }
            ))
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