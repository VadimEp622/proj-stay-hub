import { useSelector } from "react-redux";
import { utilService } from "../services/util.service";
import { showErrorMsg } from "../services/event-bus.service";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";
import { orderService } from "../services/order.service";
import { useEffect } from "react";
import { useState } from "react";
import SvgHandler from "../cmps/svg-handler";
import { EYE } from "../services/svg.service";

export function MyTrips() {
    const loggedInUser = userService.getLoggedinUser();
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();
    const explore = {
        justForYou: [
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-1226627-media_library/original/1641efa4-73ba-4037-9f2b-bdb3fd94943b.jpeg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-1295231-media_library/original/dda27602-1822-4f04-9a99-d5753e5a7a8c.jpeg?im_w=1200',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-1295231-media_library/original/df3c75bb-5d1c-493b-9980-e8e9ae3dc229.jpeg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-4291306-media_library/original/ad7c2318-c13b-4d30-abba-3ad07a66db4b.png?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-4527793-media_library/original/0ed36c15-16ae-45cd-8264-aaae30d32481.jpg?im_w=1440',
        ],
        topRated: [
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-378164-media_library/original/be3797e8-dc34-49f8-99c2-63d0f4a2ea2b.jpeg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-378164-media_library/original/0a6dcbe4-81e6-4359-8a9d-e6417482d938.jpeg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-5102308-media_library/original/f8578b0b-a655-4704-8ef1-025ff458dfdf.jpeg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-37654-active_media/original/90fe2f1f-227b-4141-8801-b6aaff1eb709.jpeg?im_w=1440',
            'https://a0.muscache.com/im/pictures/86bed863-dc5b-4b78-8c43-bbb0f46f8217.jpg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-94980-media_library/original/ca151df1-122f-4dad-bd27-78c6a175ed0a.jpeg?im_w=1440',
        ],
        sports: [
            'https://a0.muscache.com/im/pictures/c49684a2-0242-4321-8d2a-70e4e9c59f02.jpg?im_w=1440',
            'https://a0.muscache.com/im/pictures/2c48518f-b085-4b47-ac96-2bd9597963df.jpg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-215130-media_library/original/b2531d3d-dedb-425b-b453-06683a445d49.jpeg?im_w=1440',
            'https://a0.muscache.com/im/pictures/85826c51-22cf-4224-a703-1752535f3207.jpg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-76136-media_library/original/e477f299-e86a-4df5-9835-50360c859072.jpeg?im_w=1440',
        ],
        tours: [
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-241583-poster/original/c355acbe-b555-4562-b3c6-ad4d3dc426af.jpeg?im_w=1200',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-3941689-media_library/original/e12ee974-80c9-4fbe-8f12-a9b1e0a2024e.jpeg?im_w=1200',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-3941689-media_library/original/f3ff57d0-0afe-4448-a733-710db8502e2e.jpeg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-2861715-media_library/original/c3105295-5e19-4528-9e82-7e22c0f3f41b.jpeg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-2861715-media_library/original/79ed513c-a191-4115-8c32-97c3dd451b18.jpeg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-2861715-media_library/original/bd2c1351-1bc7-49e8-acb9-bbf32dd48aaf.jpeg?im_w=1440',
        ],
        sightseeing: [
            'https://a0.muscache.com/im/pictures/5edde511-ec43-4a36-ab2b-995c073747bf.jpg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-298331-media_library/original/01b96675-6111-49d3-aef1-d7cb77466558.jpg?im_w=1440',
            'https://a0.muscache.com/im/pictures/78f227bf-9f95-4add-bf6e-13e14eaddf1c.jpg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-298331-media_library/original/177c90ff-6914-4551-b7ee-5a26b74360e8.jpeg?im_w=1440',
            'https://a0.muscache.com/im/pictures/lombard/MtTemplate-298331-media_library/original/2d0762e4-1c67-4717-a246-3f0083f5f26d.jpg?im_w=1440'
        ]
    }

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
        .reverse();

    const pastTrips = trips
        .filter((trip) => new Date(trip.checkOut) <= currentDate)
        .reverse();
    console.log('pastTrips', pastTrips)
    return (
        <div className="trips">
            <h1>Trips</h1>
            {trips && trips.length > 0 ? (
                <section className="trips-container">
                    <h3 className="reservations-header">Upcoming reservations</h3>
                    <section className="reservations-container">
                        {upcomingTrips.map((trip, index) => {
                            const locationSubstring = trip.stayDetails.loc.address.substring(0, trip.stayDetails.loc.address.indexOf(','));
                            return (
                                <div className="upcoming-reservation" key={index}>
                                    <section className='reservation-container '>
                                        <section className='reservation-info'>
                                            <section className="reservation-header">
                                                <h2> {trip.stayDetails.loc.city}</h2>
                                                <h5> Entire rental unit hosted by {trip.seller.fullname}</h5>
                                            </section>
                                            <section className="reservation-date flex">
                                                <section className="reservation-dates">
                                                    {utilService.getFormattedTimeRange(trip.checkIn, trip.checkOut)}
                                                </section>
                                                <section className="reservation-destination flex">
                                                    <h4>{locationSubstring}</h4>
                                                    <span>{trip.stayDetails.loc.city}</span>
                                                    <span>{trip.stayDetails.loc.country}</span>
                                                </section>
                                            </section>

                                        </section>
                                        <div className="reservation-img">
                                            <img src={trip.stayDetails.image} alt="Stay Image" />
                                        </div>
                                    </section>
                                    <aside className="explore-things-to-do">
                                        <h5>Explore things to do near {trip.stayDetails.loc.city}</h5>
                                        <div className="things-to-do">
                                            <div className="to-do">
                                                <img src={explore.justForYou[Math.floor(Math.random() * explore.sightseeing.length)]} alt="to-do" />
                                                <section className='todo-info'>
                                                    <h4>Just for you</h4>
                                                    <span>{trip.thingsToDo['Just-for-you']} experiences</span>
                                                </section>
                                            </div>
                                            <div className="to-do">
                                                <img src={explore.topRated[Math.floor(Math.random() * explore.sightseeing.length)]} alt="top rated" />
                                                <section className='todo-info'>
                                                    <h4>Top-rated</h4>
                                                    <span>{trip.thingsToDo['Top-rated']} experiences</span>
                                                </section>
                                            </div>
                                            <div className="to-do">
                                                <img src={explore.sports[Math.floor(Math.random() * explore.sightseeing.length)]} alt="sports" />
                                                <section className='todo-info'>
                                                    <h4>Sports</h4>
                                                    <span>{trip.thingsToDo['Sports']} experiences</span>
                                                </section>
                                            </div>
                                            <div className="to-do">
                                                <img src={explore.tours[Math.floor(Math.random() * explore.sightseeing.length)]} alt="tours" />
                                                <section className='todo-info'>
                                                    <h4>Tours</h4>
                                                    <span>{trip.thingsToDo['Tours']} experiences</span>
                                                </section>
                                            </div>
                                            <div className="to-do">
                                                <img src={explore.sightseeing[Math.floor(Math.random() * explore.sightseeing.length)]} alt="sightseeing" />
                                                <section className='todo-info'>
                                                    <h4>Sightseeing</h4>
                                                    <span>{trip.thingsToDo['Sightseeing']} experiences</span>
                                                </section>
                                            </div>
                                            <div className="to-do">
                                                <div className="show-more">
                                                    <SvgHandler svgName={EYE} />
                                                </div>
                                                <section className='todo-info'>
                                                    <h4>Show more</h4>
                                                    <span>{trip.thingsToDo['more']} experiences</span>
                                                </section>
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
