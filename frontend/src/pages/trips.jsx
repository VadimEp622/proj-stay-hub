import { useSelector } from "react-redux";
import { utilService } from "../services/util.service";
import { showErrorMsg } from "../services/event-bus.service";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";
import { orderService } from "../services/order.service";
import { useEffect } from "react";
import { useState } from "react";

export function MyTrips() {
    const loggedInUser = userService.getLoggedinUser();
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    function handleSearchClick() {
        window.location.href = '/';
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await orderService.getOrders();
                const filteredTrips = orders.filter(
                    (order) => order.buyer._id === loggedInUser._id
                );
                setTrips(filteredTrips);
            } catch (error) {
                showErrorMsg('Error fetching orders');
            }
        };

        fetchOrders();
    }, []);

    if (!loggedInUser) {
        showErrorMsg('You must be logged in to view your trips');
        return navigate('/');
    }

    const currentDate = new Date();

    const upcomingTrips = trips
        .filter((trip) => new Date(trip.stayDetails.checkOut) > currentDate)
        .reverse();

    const pastTrips = trips
        .filter((trip) => new Date(trip.stayDetails.checkOut) <= currentDate)
        .reverse();

    return (
        <div className="trips">
            <h1>Trips</h1>
            {trips && trips.length > 0 ? (
                <section className="trips-container">
                    <h3 className="reservations-header">Upcoming reservations</h3>
                    <div className="upcoming-reservation">
                        <section className="reservation-container">
                            {upcomingTrips.map((trip, index) => {
                                const locationSubstring = trip.stayDetails.loc.substring(0, trip.stayDetails.loc.indexOf(','));
                                return (
                                    <div key={index}>
                                        {trip.stayDetails.city}
                                        Entire rental unit hosted by {trip.seller.fullname}
                                        <div className="inside-upcoming-reservation">
                                            {trip.stayDetails.checkIn} - {trip.stayDetails.checkOut}
                                            {locationSubstring}
                                            {trip.stayDetails.loc.city}
                                            {trip.stayDetails.loc.country}
                                        </div>
                                        <div className="upcoming-reservation-picture">{trip.stayDetails.image}</div>
                                        <aside className="explore-things-to-do">
                                            {/* Explore things to do */}
                                            <h5>Explore things to do near {trip.stayDetails.city}</h5>
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
                                );
                            })}
                        </section>
                    </div>
                    {pastTrips.length > 0 && (
                        <section className="where-you-been">
                            <h3>Where you've been</h3>
                            {pastTrips.map((trip, index) => {
                                const locationSubstring = trip.stayDetails.loc.substring(0, trip.stayDetails.loc.indexOf(','));
                                return (
                                    <div key={index}>
                                        {trip.stayDetails.city}
                                        Entire rental unit hosted by {trip.seller.fullname}
                                        <div className="inside-past-trip">
                                            {trip.stayDetails.checkIn} - {trip.stayDetails.checkOut}
                                            {locationSubstring}
                                            {trip.stayDetails.loc.city}
                                            {trip.stayDetails.loc.country}
                                        </div>
                                        <div className="past-trip-picture">{trip.stayDetails.image}</div>
                                    </div>
                                );
                            })}
                        </section>
                    )}
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
