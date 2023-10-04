import { StayIndex } from './pages/stay-index.jsx'
import { StayDetails } from './pages/stay-details.jsx'
import { OrderConfirmation } from './pages/order-confirmation.jsx'
import { UserWishlist } from './pages/user-wishlist.jsx'
import { UserDashboard } from './pages/user-dashboard.jsx'
import { UserTrips } from './pages/user-trips.jsx'


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
        path: 'trips',
        component: < UserTrips />,
        label: 'MyTrips'
    }
]

export default routes