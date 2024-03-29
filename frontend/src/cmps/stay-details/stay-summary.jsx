// Components
import { HighlightList } from './stay-summary/highlight-list.jsx'
import { Overview } from './stay-summary/overview.jsx'
import { AmenityList } from './stay-summary/amenity-list.jsx'
import { StayDates } from './stay-summary/stay-dates.jsx'
import { OrderSidebar } from './stay-summary/order-sidebar.jsx'


export function StaySummary({
    stay, hostImgUrl,
    checkIn, checkOut, selectedRange, handleRangeSelect,
    guests, setGuests,
    orderDetails,
    onCheckAvailabilityClick, onReserveClick,
    isMobile
}) {

    return (
        <section className='summary-container'>
            <section className='summary'>
                <Overview stay={stay} hostImgUrl={hostImgUrl} />
                <HighlightList />
                <AmenityList amenities={stay.amenities} />
                <StayDates stay={stay} selectedRange={selectedRange} handleRangeSelect={handleRangeSelect} />
            </section>

            {!isMobile &&
                <section className='order-sidebar-container'>
                    <OrderSidebar
                        stay={stay}
                        checkIn={checkIn} checkOut={checkOut}
                        guests={guests} setGuests={setGuests}
                        orderDetails={orderDetails}
                        onCheckAvailabilityClick={onCheckAvailabilityClick} onReserveClick={onReserveClick}
                    />
                </section>
            }
        </section>
    )
}