import { DatePicker } from "../../_reuseable-cmps/date-picker.jsx"

export function StayDates({ stay, selectedRange, handleRangeSelect }) {

    return (
        <section className="date-container">
            <h3>Select check-in date</h3>
            <p>Add your travel dates for exact pricing</p>
            <DatePicker availableDates={stay.availableDates} selectedRange={selectedRange} handleRangeSelect={handleRangeSelect} />
        </section>
    )
}