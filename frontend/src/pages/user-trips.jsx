// Node modules
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Services
import { showErrorMsg } from '../services/event-bus.service.js'
import { orderService } from '../services/order.service.js'

// Store
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { orderSetIsLoadingOrders } from '../store/orderSlice'


// Components
import { FutureReservationList } from '../cmps/user-trips/future-reservation-list.jsx'
import { PastReservationList } from '../cmps/user-trips/past-reservation-list.jsx'
import { Loader } from '../cmps/_reuseable-cmps/loader.jsx'


// TODO: when fetching trips, perform loading animation, and only when finished fetching, render cmps


export function UserTrips() {
    const loggedInUser = useAppSelector(storeState => storeState.userModule.user)
    const isLoadingOrders = useAppSelector(storeState => storeState.orderModule.isLoadingOrders)
    const [trips, setTrips] = useState([])
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            dispatch(orderSetIsLoadingOrders(false))
        }
    }, [dispatch])


    useEffect(() => {
        if (!loggedInUser) navigate('/')
        else fetchOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser])


    function onSearchClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        navigate('/')
    }

    async function fetchOrders() {
        try {
            dispatch(orderSetIsLoadingOrders(true))
            const orders = await orderService.getOrders({ byUserId: loggedInUser._id })
            // console.log('orders', orders)
            setTrips(orders)
        } catch (error) {
            console.log('Error fetching orders', error)
            showErrorMsg('Error fetching orders')
        } finally {
            dispatch(orderSetIsLoadingOrders(false))
        }
    }

    function getUpcomingTrips() {
        const currentDate = new Date()
        const upcomingTrips = trips
            .filter((trip) => new Date(trip.content.orderDetails.checkOut) > currentDate)
            .reverse()
        // console.log('upcomingTrips', upcomingTrips)
        return upcomingTrips
    }

    function getPastTrips() {
        const currentDate = new Date()
        const pastTrips = trips
            .filter((trip) => new Date(trip.content.orderDetails.checkOut) <= currentDate)
            .reverse()
        // console.log('pastTrips', pastTrips)
        return pastTrips
    }


    if (isLoadingOrders) return <Loader />
    return (
        <section className='user-trips-page'>
            <h1 className='page-title fs28'>Trips</h1>

            <section className='future-reservation-list-container'>
                <h3 className='reservation-list-header fs20'>Upcoming reservations</h3>
                <FutureReservationList getUpcomingTrips={getUpcomingTrips} onSearchClick={onSearchClick} />
            </section>

            <section className='past-reservation-list-container'>
                <h3 className='reservation-list-header fs20'>Where you've been</h3>
                <PastReservationList getPastTrips={getPastTrips} />
            </section>
        </section>
    )
}
