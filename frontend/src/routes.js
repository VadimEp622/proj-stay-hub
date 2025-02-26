import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import { Loader } from './cmps/_reuseable-cmps/loader.jsx'


// TODO: handle error handling that might occur during the dynamic import process 


const StayIndex = lazy(() => import('./pages/stay-index.jsx').then(module => ({ default: module.StayIndex })))
const StayDetails = lazy(() => import('./pages/stay-details.jsx').then(module => ({ default: module.StayDetails })))
const OrderConfirmation = lazy(() => import('./pages/order-confirmation.jsx').then(module => ({ default: module.OrderConfirmation })))
const UserWishlist = lazy(() => import('./pages/user-wishlist.jsx').then(module => ({ default: module.UserWishlist })))
const UserDashboard = lazy(() => import('./pages/user-dashboard.jsx').then(module => ({ default: module.UserDashboard })))
const UserTrips = lazy(() => import('./pages/user-trips.jsx').then(module => ({ default: module.UserTrips })))
const ErrorPage = lazy(() => import('./pages/error-page.jsx').then(module => ({ default: module.ErrorPage })))


export default function MyCustomRouter() {

    const routes = useRoutes([
        {
            path: '/',
            label: 'StayHub',
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <StayIndex />,
                    label: 'StayIndex'
                },
                {
                    path: 'stay',
                    children: [
                        {
                            path: ':stayId',
                            element: <StayDetails />,
                            label: 'StayDetails'
                        },
                        {
                            path: 'book/:stayId',
                            element: <OrderConfirmation />,
                            label: 'OrderConfirmation'
                        }
                    ]
                },
                {
                    path: 'wishlist',
                    element: <UserWishlist />,
                    label: 'UserWishlist'
                },
                {
                    path: 'dashboard',
                    element: <UserDashboard />,
                    label: 'UserDashboard'
                },
                {
                    path: 'trips',
                    element: <UserTrips />,
                    label: 'MyTrips'
                },
            ]
        },
        {
            path: '*',
            element: <ErrorPage />,
            label: 'ErrorPage'
        }
    ])

    // const routes = useRoutes([
    //     {
    //         path: '/',
    //         element: <StayIndex />,
    //         label: 'StayHub'
    //     },
    //     {
    //         path: 'stay',
    //         children: [
    //             {
    //                 path: ':stayId',
    //                 element: <StayDetails />,
    //                 label: 'StayDetails'
    //             },
    //             {
    //                 path: 'book/:stayId',
    //                 element: <OrderConfirmation />,
    //                 label: 'OrderConfirmation'
    //             }
    //         ]
    //     },
    //     {
    //         path: 'wishlist',
    //         element: <UserWishlist />,
    //         label: 'UserWishlist'
    //     },
    //     {
    //         path: 'dashboard',
    //         element: <UserDashboard />,
    //         label: 'UserDashboard'
    //     },
    //     {
    //         path: 'trips',
    //         element: <UserTrips />,
    //         label: 'MyTrips'
    //     },
    //     {
    //         path: '*',
    //         element: <ErrorPage />,
    //         label: 'ErrorPage'
    //     }
    // ])

    return (
        <Suspense fallback={<Loader />}>
            {routes}
        </Suspense>
    )
}
//     {
//         path: '/',
//         component: <StayIndex />,
//         label: 'StayHub'
//     },
//     {
//         path: 'stay/:stayId',
//         component: <StayDetails />,
//         label: 'StayDetails'
//     },
//     {
//         path: 'stay/book/:stayId',
//         component: <OrderConfirmation />,
//         label: 'OrderConfirmation'
//     },
//     {
//         path: 'wishlist',
//         component: <UserWishlist />,
//         label: 'UserWishlist'
//     },
//     {
//         path: 'dashboard',
//         component: <UserDashboard />,
//         label: 'UserDashboard'
//     },
//     {
//         path: 'trips',
//         component: < UserTrips />,
//         label: 'MyTrips'
//     }
// ]

// export default routes