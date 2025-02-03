// Node modules
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Store
import { useAppSelector } from '../store/hooks'

// Services
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

// Components
import { OrderList } from '../cmps/user-dashboard/order-list.jsx'
import { DashboardStatistics } from '../cmps/user-dashboard/dashboard-statistics.jsx'


export function UserDashboard() {
    const loggedinUser = useAppSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const dashboardData = userService.getUserDashboardData()


    useEffect(() => {
        if (!loggedinUser) {
            showErrorMsg('You must be logged in to view your listings')
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedinUser])


    return (
        <section className='dashboard-page'>
            <h1 className='dashboard-page-title fs30'>My Dashboard</h1>
            <DashboardStatistics dashboardData={dashboardData} />
            <OrderList loggedinUser={loggedinUser} />
        </section>
    )
}
