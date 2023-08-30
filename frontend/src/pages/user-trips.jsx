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


// TODO: organize this component.

export function UserTrips() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [trips, setTrips] = useState([])
    const navigate = useNavigate()

    function handleSearchClick() {
        window.location.href = '/'
    }


    useEffect(() => {
        if (!loggedInUser) navigate('/')
        else fetchOrders()
    }, [loggedInUser])


    async function fetchOrders() {
        try {
            const orders = await orderService.getOrders({ byUserId: loggedInUser._id })
            console.log('orders', orders)
            // What is the point of the below .filter?
            const filteredTrips = orders.filter(
                (order) => order.byUser._id === loggedInUser._id
            )
            setTrips(filteredTrips)
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
        <section className="page-user-trips">
            <h1 className="page-title fs28">Trips</h1>
            <FutureReservationList
                getUpcomingTrips={getUpcomingTrips}
                handleSearchClick={handleSearchClick}
            />
            <PastReservationList getPastTrips={getPastTrips} />
        </section>
    )
}
