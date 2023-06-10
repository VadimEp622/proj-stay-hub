import { useSelector } from "react-redux"
import { utilService } from "../services/util.service"
import { showErrorMsg } from "../services/event-bus.service"
import { useNavigate } from "react-router-dom"


export function MyTrips() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    console.log('loggedInUser', loggedInUser);
    const navigate = useNavigate()

    if (!loggedInUser) {
        // showErrorMsg('You must be logged in to view your trips')
        // navigate('/')
        return (
            <h1>No logged in user, please login or sign-up</h1>
        )
    }
    else {
        return (
            <div className="trips">
                <h1>Trips</h1>
                {loggedInUser.trips ? (
                    <section className="trips-container">
                        {console.log('trips', loggedInUser.trips)}
                        <h3 className="reservations-header">Upcoming reservations</h3>
                        <div className="upcoming-reservation">
                            <section className="reservation-container">
                            reservations details section
                            </section>
                            <aside className="explore-things-to-do">
                                <h5>Explore things to do near {loggedInUser.trips[0]?.city}</h5>
                                <div className="things-to-do">
                                    <div className="things-todo">
                                        Just for you
                                        {utilService.getRandomIntInclusive(10, 20)} experiences
                                    </div>
                                    <div className="things-todo">
                                        Top-rated
                                        {utilService.getRandomIntInclusive(30, 50)} experiences
                                    </div>
                                    <div className="things-todo">
                                        Sports
                                        {utilService.getRandomIntInclusive(30, 60)} experiences
                                    </div>
                                    <div className="things-todo">
                                        Tours
                                        {utilService.getRandomIntInclusive(50, 120)} experiences
                                    </div>
                                    <div className="things-todo">
                                        Sightseeing
                                        {utilService.getRandomIntInclusive(50, 120)} experiences
                                    </div>
                                    <div className="things-todo">
                                        Show more
                                        {utilService.getRandomIntInclusive(300, 500)} experiences
                                    </div>
                                </div>
                            </aside>
                        </div>
                        <section className=""></section>
                    </section>
                ) : (
                    <>
                        <section className="no-trips">
                        <h1>Trips</h1>
                            <div className="no-trips-header">No trips booked...yet!</div> <span></span>
                            <p>Time to dust off your bags and start planning your next adventure</p>
                            <button>Start searching</button>
                        </section>
                    </>
                )}
            </div>
        )
    }
}