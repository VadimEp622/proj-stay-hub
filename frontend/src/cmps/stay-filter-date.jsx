import { format, compareAsc } from 'date-fns'
import { useState } from 'react'
import { DateRange, DayPicker, SelectRangeEventHandler } from 'react-day-picker'

export function DateFilter() {
    const [selectedRange, setSelectedRange] = useState()
    const [fromValue, setFromValue] = useState('')
    const [toValue, setToValue] = useState('')
    const [openDatePicker, setOpenDatePicker] = useState(true)




    const handleRangeSelect = (range) => {
        setSelectedRange(range)
        if (range?.from) {
            setFromValue(format(range.from, 'y-MM-dd'))
        } else {
            setFromValue('')
        }
        if (range?.to) {
            setOpenDatePicker(false)
            setToValue(format(range.to, 'y-MM-dd'))
        } else {
            setToValue('')
        }
    }


    
    return (
        <section>
            <DayPicker
                mode="range"
                selected={selectedRange}
                numberOfMonths={2}
                onSelect={handleRangeSelect}
            />
        </section>
    )
}