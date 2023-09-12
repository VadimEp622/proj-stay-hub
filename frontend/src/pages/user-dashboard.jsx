// Node modules
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Services
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

// Components
import { OrderList } from '../cmps/user-dashboard/order-list.jsx'
import { DashboardStatistics } from '../cmps/user-dashboard/dashboard-statistics.jsx'



// TODO: when 1050px width, remove upper charts, and show only lower charts

// TODO: reorganize components so:
//     1. app header stays above
//     2. user-dashboard has header "My Dashboard"
//     3. box-shadowed blocks of revenue data, and graphs, fluid
//     4. reservations/order-list table

export function UserDashboard() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const dashboardData = userService.getUserDashboardData()


    useEffect(() => {
        if (!loggedInUser) {
            showErrorMsg('You must be logged in to view your listings')
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser])


    return (
        <section className="dashboard-page">
            <h1 className="dashboard-page-title fs30">My Dashboard</h1>
            <DashboardStatistics dashboardData={dashboardData} />
            <OrderList loggedInUser={loggedInUser} />
        </section>
    )
}
