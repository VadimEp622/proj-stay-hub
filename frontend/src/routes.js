import { StayIndex } from './pages/stay-index.jsx'
import { StayDetails } from './pages/stay-details.jsx'
import { OrderConfirmation } from './pages/order-confirmation.jsx'
import { UserDetails } from './pages/user-details.jsx'
import { UserWishlist } from './pages/user-wishlist.jsx'
import { UserDashboard } from './pages/user-dashboard.jsx'
import { UserTrips } from './pages/user-trips.jsx'
import { AddStay } from './pages/add-stay.jsx'
import { JSONStringify } from './cmps/stringify.jsx'

const routes = [
    {
        path: '/',
        component: <StayIndex />,
        label: 'StayHub'
    },
    {
        path: 'stay/:stayId',
        component: <StayDetails />,
        label: 'StayDetails'
    },
    {
        path: 'stay/book/:stayId',
        component: <OrderConfirmation />,
        label: 'OrderConfirmation'
    },
    {
        path: 'user/:id',
        component: <UserDetails />,
        label: 'UserDetails'
    },
    {
        path: 'wishlist',
        component: <UserWishlist />,
        label: 'UserWishlist'
    },
    {
        path: '/dashboard',
        component: <UserDashboard />,
        label: 'UserDashboard'
    },
    {
        path: '/dashboard/stay/add',
        component: <AddStay />,
        label: 'AddStay'
    },
    {
        path: 'trips',
        component: < UserTrips />,
        label: 'MyTrips'
    },
    {
        path: 'stay/stringify',
        component: < JSONStringify />,
        label: 'JSONStringify'
    }
]

export default routes