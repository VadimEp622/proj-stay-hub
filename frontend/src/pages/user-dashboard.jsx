// Node modules
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Services
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

// Components
import { OrderList } from '../cmps/user-dashboard/order-list.jsx'
import { UserOverview } from '../cmps/user-dashboard/user-overview.jsx'
import { ChartBar } from '../cmps/user-dashboard/chart-bar.jsx'
import { ChartLine } from '../cmps/user-dashboard/chart-line.jsx'


// TODO: change user-overview to be a grid, with auto template columns (fluid responsiveness)
// TODO: improve charts to display well even if not on mobile


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
        <section className='dashboard-page'>
            <UserOverview dashboardData={dashboardData} />
            <OrderList loggedInUser={loggedInUser} />
            <section className="sales-dashboard">
                <ChartBar dashboardData={dashboardData} />
                <ChartLine dashboardData={dashboardData} />
            </section>
        </section>
    )
}
