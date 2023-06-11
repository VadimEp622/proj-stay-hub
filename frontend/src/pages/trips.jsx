import { useSelector } from "react-redux";
import { utilService } from "../services/util.service";
import { showErrorMsg } from "../services/event-bus.service";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";
import { orderService } from "../services/order.service";
import { useEffect } from "react";
import { useState } from "react";

export function MyTrips() {
    const loggedInUser = userService.getLoggedinUser()
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate()
    function handleSearchClick() {
        window.location.href = '/'
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await orderService.getOrders();
                setTrips(orders);
            } catch (error) {
                showErrorMsg('Error fetching orders');
            }
        }

        fetchOrders()
    }, [])

    if (!loggedInUser) {
        showErrorMsg('You must be logged in to view your trips');
        return navigate('/');
    }

    console.log(trips)
    return (
        <div className="trips">
            <h1>Trips</h1>
            {loggedInUser.trips && loggedInUser.trips.length > 0 ? (
                <section className="trips-container">
                    {/* Upcoming reservations */}
                    <h3 className="reservations-header">Upcoming reservations</h3>
                    <div className="upcoming-reservation">
                        <section className="reservation-container">
                            {/* Reservation details section */}
                        </section>
                        <aside className="explore-things-to-do">
                            {/* Explore things to do */}
                            <h5>Explore things to do near {loggedInUser.trips[0]?.city}</h5>
                            <div className="things-to-do">
                                {/* Random experiences */}
                                <div className="things-todo">
                                    Just for you {utilService.getRandomIntInclusive(10, 20)} experiences
                                </div>
                                <div className="things-todo">
                                    Top-rated {utilService.getRandomIntInclusive(30, 50)} experiences
                                </div>
                                <div className="things-todo">
                                    Sports {utilService.getRandomIntInclusive(30, 60)} experiences
                                </div>
                                <div className="things-todo">
                                    Tours {utilService.getRandomIntInclusive(50, 120)} experiences
                                </div>
                                <div className="things-todo">
                                    Sightseeing {utilService.getRandomIntInclusive(50, 120)} experiences
                                </div>
                                <div className="things-todo">
                                    Show more {utilService.getRandomIntInclusive(300, 500)} experiences
                                </div>
                            </div>
                        </aside>
                    </div>
                    <section className=""></section>
                </section>
            ) : (
                <section className="no-trips">
                    <div className="no-trips-header">No trips booked...yet!</div>
                    <p>Time to dust off your bags and start planning your next adventure</p>
                    <button onClick={handleSearchClick}>Start searching</button>
                </section>
            )}
        </div>
    );
}
