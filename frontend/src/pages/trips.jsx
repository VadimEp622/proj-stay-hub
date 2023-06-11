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
                setTrips(filteredTrips)
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
        .filter((trip) => new Date(trip.checkOut) > currentDate)
        .filter((trip) => new Date(trip.checkOut) > currentDate)
        .reverse();

    const pastTrips = trips
        .filter((trip) => new Date(trip.checkOut) <= currentDate)
        .filter((trip) => new Date(trip.checkOut) <= currentDate)
        .reverse();
    console.log(upcomingTrips)
    return (
        <div className="trips">
            <h1>Trips</h1>
            {trips && trips.length > 0 ? (
                <section className="trips-container">
                    <h3 className="reservations-header">Upcoming reservations</h3>
                        <section className="reservations-container">
                            {upcomingTrips.map((trip, index) => {
                                const locationSubstring = trip.stayDetails.loc.address.substring(0, trip.stayDetails.loc.address.indexOf(','));
                                const locationSubstring = trip.stayDetails.loc.address.substring(0, trip.stayDetails.loc.address.indexOf(','));
                                return (
                                    <div className="upcoming-reservation" key={index}>
                                        <section className='reservation-container flex'>
                                            <section className='reservation-info'>
                                                <section className="reservation-header">
                                                    <h2> {trip.stayDetails.loc.city}</h2>
                                                    <h5> Entire rental unit hosted by {trip.seller.fullname}</h5>
                                                </section>
                                                <section className="reservation-dates">
                                                    {utilService.getFormattedTimeRange(trip.checkIn, trip.checkOut)}
                                                </section>
                                                <section className="reservation-destination">
                                                    {locationSubstring}, {trip.stayDetails.loc.city}, {trip.stayDetails.loc.country}
                                                </section>
                                            </section>
                                            <div className="reservation-img">
                                                <img src={trip.stayDetails.image} alt="Stay Image" />
                                            </div>
                                        </section>
                                        <aside className="explore-things-to-do">
                                            {/* Explore things to do */}
                                            <h5>Explore things to do near {trip.stayDetails.city}</h5>
                                            <div className="things-to-do">
                                                {/* Random experiences */}
                                                <div className="things-todo">
                                                    Just for you {trip.thingsToDo['Just-for-you']} experiences
                                                </div>
                                                <div className="things-todo">
                                                    Top-rated {trip.thingsToDo['Top-rated']} experiences
                                                </div>
                                                <div className="things-todo">
                                                    Sports {trip.thingsToDo['Sports']} experiences
                                                </div>
                                                <div className="things-todo">
                                                    Tours {trip.thingsToDo['Tours']} experiences
                                                </div>
                                                <div className="things-todo">
                                                    Sightseeing {trip.thingsToDo['Sightseeing']} experiences
                                                </div>
                                                <div className="things-todo">
                                                    Show more {trip.thingsToDo['more']} experiences
                                                </div>
                                            </div>
                                        </aside>
                                    </div>
                                );
                            })}
                        </section>
                   
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
                                            {trip.checkIn} - {trip.checkOut}
                                            {locationSubstring}
                                            {trip.stayDetails.loc.city}
                                            {trip.stayDetails.loc.country}
                                        </div>
                                        <div className="past-trip-picture">
                                            <img src={trip.stayDetails.image} alt="Stay Image" />
                                        </div>
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