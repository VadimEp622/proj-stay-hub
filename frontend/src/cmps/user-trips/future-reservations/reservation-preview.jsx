// Components
import { ExploreList } from "./reservation-preview/explore-list.jsx"
import { ReservationTicket } from "./reservation-preview/reservation-ticket.jsx"


export function ReservationPreview({ trip }) {
    return (
        <section className="upcoming-reservation-preview">
            <ReservationTicket trip={trip}/>
            <ExploreList trip={trip} />
        </section>
    )
}