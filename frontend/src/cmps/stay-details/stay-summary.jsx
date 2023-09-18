// Services
import { stayService } from "../../services/stay.service.js"

// Components
import { Highlights } from "./stay-summary/highlights.jsx"
import { Overview } from "./stay-summary/overview.jsx"
import { Amenities } from "./stay-summary/amenities.jsx"
import { StayDates } from "./stay-summary/stay-dates.jsx"
import { OrderSidebar } from "./stay-summary/order-sidebar.jsx"


export function StaySummary({ stay, hostImgUrl, randomDateJoined, selectedRange, handleDateChange, handleRangeSelect }) {

    const checkIn = stayService.getDate(selectedRange.from)
    const checkOut = stayService.getDate(selectedRange.to)
    return (
        <section className="summary-container">
            <section className="summary">
                <Overview stay={stay} hostImgUrl={hostImgUrl} />
                <Highlights />
                <Amenities stay={stay} />
                <StayDates stay={stay} selectedRange={selectedRange} handleRangeSelect={handleRangeSelect} />
            </section>
            <section className="order-sidebar-container">
                <OrderSidebar stay={stay} randomDate={randomDateJoined} hostImgUrl={hostImgUrl} checkIn={checkIn} checkOut={checkOut} handleDateChange={handleDateChange} />
            </section>
        </section>
    )
}