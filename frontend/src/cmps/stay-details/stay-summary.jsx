// Components
import { Highlights } from "./stay-summary/highlights.jsx"
import { Overview } from "./stay-summary/overview.jsx"
import { Amenities } from "./stay-summary/amenities.jsx"
import { StayDates } from "./stay-summary/stay-dates.jsx"
import { OrderSidebar } from "./stay-summary/order-sidebar.jsx"

export function StaySummary({ stay, hostImgUrl, randomDateJoined }) {

    return (
        <section className='summary-container'>
            <section className='summary'>
                <Overview stay={stay} hostImgUrl={hostImgUrl} />
                <Highlights />
                <Amenities stay={stay} />
                <StayDates stay={stay}/>
            </section>
            <section className='order-sidebar-container'>
                <OrderSidebar stay={stay} randomDate={randomDateJoined} hostImgUrl={hostImgUrl} />
            </section>
        </section>
    )
}