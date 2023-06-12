import { DayPicker } from "react-day-picker"
import { startOfDay, isSameDay } from 'date-fns'
// import styles from 'react-day-picker/dist/style.module.css'
// import customStyles from "./customDatePickerStyles.module.css"

export function DatePicker({ selectedRange, handleRangeSelect }) {
    const date = new Date()
    const today = startOfDay(date)


    function isDayDisabled(day) {
        return day < today
    }

    const dayModifiers = {
        disabled: (day) => isDayDisabled(day),//add styling to disabled days to differentiate 
    }

    const classNames = {
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_range_middle: 'day-range-middle',
    }




    // POSSIBLE TO FIX FIREFOX NO :HAS SELECTORS WITH TOOLS FROM BELOW
    // function isDayInRange(day) {
    //     console.log('selectedRange', selectedRange)
    //     const [from, to] = selectedRange
    //     if (from && to) {
    //         return isSameDay(day, from) || isSameDay(day, to) || (day > from && day < to)
    //     }
    //     return false
    // }

    // const dayModifiers = {
    //     disabled: (day) => isDayDisabled(day),
    //     'day-range-start': (day) => isSameDay(day, selectedRange[0]),
    //     'day-range-end': (day) => isSameDay(day, selectedRange[1]),
    //     'day-range-middle': (day) => isDayInRange(day),
    // }



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