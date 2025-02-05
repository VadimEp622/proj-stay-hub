// Node modules
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Services
import { showErrorMsg } from '../services/event-bus.service.js'

// Store
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loadOrders, orderResetLoadOrders, orderUpdateReqStatusLoadOrders } from '../store/orderSlice'


// Components
import { FutureReservationList } from '../cmps/user-trips/future-reservation-list.jsx'
import { PastReservationList } from '../cmps/user-trips/past-reservation-list.jsx'
import { Loader } from '../cmps/_reuseable-cmps/loader.jsx'


// TODO: when fetching trips, perform loading animation, and only when finished fetching, render cmps


// TODO: check why fetching of orders is not done through the store..., fix if possible


export function UserTrips() {
    const loggedinUser = useAppSelector(storeState => storeState.userModule.user)
    const reqStatusLoadOrders = useAppSelector(storeState => storeState.orderModule.reqStatusLoadOrders)
    const [trips, setTrips] = useState([])
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    useEffect(() => {
        return () => {
            dispatch(orderUpdateReqStatusLoadOrders("idle"))
        }
    }, [dispatch])


    useEffect(() => {
        if (!loggedinUser) navigate('/')
        else fetchOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedinUser])


    function onSearchClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        navigate('/')
    }

    async function fetchOrders() {
        try {
            dispatch(orderResetLoadOrders())
            const orders = await dispatch(loadOrders({ userType: 'buyer' })).unwrap()
            // console.log('orders', orders)
            setTrips(orders)
        } catch (error) {
            console.log('Error fetching orders', error)
            showErrorMsg('Error fetching orders')
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


    if (reqStatusLoadOrders === 'idle' || reqStatusLoadOrders === 'pending') return <Loader />
    if (reqStatusLoadOrders === 'failed') return <p>Failed to load orders</p>

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
