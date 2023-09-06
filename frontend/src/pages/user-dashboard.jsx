// Node modules
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
// TODO: when logging out, does not redirect from dashboard to homepage

export function UserDashboard() {
    const loggedInUser = userService.getLoggedinUser()
    const dashboardData = userService.getUserDashboardData()
    const navigate = useNavigate()


    useEffect(() => {
        if (!loggedInUser) {
            showErrorMsg('You must be logged in to view your listings')
            navigate('/')
        }
    }, [loggedInUser, navigate])


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
