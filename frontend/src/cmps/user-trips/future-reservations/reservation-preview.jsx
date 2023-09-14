// Components
import useIsMobile from "../../../customHooks/useIsMobile.js"
import { ExploreList } from "./reservation-preview/explore-list.jsx"
import { ReservationTicket } from "./reservation-preview/reservation-ticket.jsx"


// TODO: at 790px width, remove exploreList

export function ReservationPreview({ trip }) {
    const isMobile = useIsMobile()
    return (
        <section className={`upcoming-reservation-preview${isMobile ? ' mobile' : ''}`}>
            <ReservationTicket trip={trip} />
            {!isMobile &&
                <ExploreList trip={trip} />
            }
        </section>
    )
}