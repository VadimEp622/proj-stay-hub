// ===================== Routes I Know =====================
import { StayIndex } from './pages/stay-index.jsx'
import { StayDetails } from './pages/stay-details.jsx'
import { OrderConfirmation } from './pages/order-confirmation.jsx'
import { UserWishlist } from './pages/user-wishlist.jsx'
import { UserDashboard } from './pages/user-dashboard.jsx'
import { UserTrips } from './pages/user-trips.jsx'
// =========================================================
// ================== Routes I Don't Know ==================
import { UserDetails } from './pages/user-details.jsx'
import { AddStay } from './pages/add-stay.jsx'
import { JSONStringify } from './cmps/stringify.jsx'
// =========================================================

const routes = [
    // ===================== Routes I Know =====================
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
    },
    // =========================================================
    // ================== Routes I Don't Know ==================
    {
        path: 'user/:id',
        component: <UserDetails />,
        label: 'UserDetails'
    },
    {
        path: '/dashboard/stay/add',
        component: <AddStay />,
        label: 'AddStay'
    },
    {
        path: 'stay/stringify',
        component: < JSONStringify />,
        label: 'JSONStringify'
    }
    // =========================================================
]

export default routes