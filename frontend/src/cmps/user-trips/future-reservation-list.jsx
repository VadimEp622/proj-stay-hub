// Components
import { ReservationPreview } from './future-reservations/reservation-preview.jsx'


export function FutureReservationList({ getUpcomingTrips, onSearchClick }) {
    const upcomingTrips = getUpcomingTrips()
    return (
        <section className='future-reservation-list'>
            {upcomingTrips && upcomingTrips.length > 0
                ? (upcomingTrips.map(trip =>
                    <ReservationPreview trip={trip} key={trip._id} />
                ))
                : (
                    <section className='no-trips'>
                        <h3 className='no-trips-header fs22 lh26'>No trips booked...yet!</h3>
                        <p className='fs16 lh24'>Time to dust off your bags and start planning your next adventure</p>
                        <button className='fs16' onClick={(ev) => onSearchClick(ev)}>Start searching</button>
                    </section>
                )
            }
        </section>
    )
}