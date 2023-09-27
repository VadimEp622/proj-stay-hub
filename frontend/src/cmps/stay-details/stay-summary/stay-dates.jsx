import useIsMobile from '../../../customHooks/useIsMobile.js'
import { DatePicker } from '../../_reuseable-cmps/date-picker.jsx'


export function StayDates({ stay, selectedRange, handleRangeSelect }) {
    const isScreenWidthLessThan = useIsMobile(1250)


    const numberOfMonths = isScreenWidthLessThan ? 1 : 2
    return (
        <section className='date-container'>
            <h3>Select check-in date</h3>
            <p>Add your travel dates for exact pricing</p>
            <DatePicker
                selectedRange={selectedRange}
                handleRangeSelect={handleRangeSelect}
                availableDates={stay.availableDates}
                numberOfMonths={numberOfMonths}
            />
        </section>
    )
}