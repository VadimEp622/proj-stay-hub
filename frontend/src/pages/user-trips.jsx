// Node modules
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

// Services
import { showErrorMsg } from "../services/event-bus.service.js"
import { orderService } from "../services/order.service.js"

// Components
import { FutureReservationList } from "../cmps/user-trips/future-reservation-list.jsx"
import { PastReservationList } from "../cmps/user-trips/past-reservation-list.jsx"


// TODO: when fetching trips, perform loading animation, and only when finished fetching, render cmps
// TODO: fix responsiveness for this page

export function UserTrips() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [trips, setTrips] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        if (!loggedInUser) navigate('/')
        else fetchOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser])


    function handleSearchClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        navigate('/')
    }

    async function fetchOrders() {
        try {
            const orders = await orderService.getOrders({ byUserId: loggedInUser._id })
            console.log('orders', orders)
            setTrips(orders)
        } catch (error) {
            showErrorMsg('Error fetching orders')
        }
    }

    function getUpcomingTrips() {
        const currentDate = new Date()
        const upcomingTrips = trips
            .filter((trip) => new Date(trip.content.checkOut) > currentDate)
            .reverse()
        console.log('upcomingTrips', upcomingTrips)
        return upcomingTrips
    }

    function getPastTrips() {
        const currentDate = new Date()
        const pastTrips = trips
            .filter((trip) => new Date(trip.content.checkOut) <= currentDate)
            .reverse()
        console.log('pastTrips', pastTrips)
        return pastTrips
    }

    return (
        <section className="user-trips-page">
            <h1 className="page-title fs28">Trips</h1>

            <section className="future-reservation-list-container">
                <h3 className="reservation-list-header fs20">Upcoming reservations</h3>
                <FutureReservationList getUpcomingTrips={getUpcomingTrips} handleSearchClick={handleSearchClick} />
            </section>

            <section className="past-reservation-list-container">
                <h3 className="reservation-list-header fs20">Where you've been</h3>
                <PastReservationList getPastTrips={getPastTrips} />
            </section>
        </section>
    )
}
