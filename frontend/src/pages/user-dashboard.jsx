// Node modules
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

// Services
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

// Components
import { LineChart } from '../cmps/line-chart.jsx'
import { OrderList } from '../cmps/user-dashboard/order-list.jsx'



// TODO: organize this cmp!

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Revenue overview',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function (value) {
                    return '$' + value
                },
            },
        },
        x: {
            grid: {
                display: false, // Hide the background lines for the x-axis
            },
        },
    },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June']
const revenue = [1710.5, 751.2, 2741.8, 1740, 2476, 857]
const averageRevenue = (revenue.reduce((sum, value) => sum + value, 0) / revenue.length).toLocaleString(undefined,
    { maximumFractionDigits: 2, })

const data = {
    labels,
    datasets: [
        {
            label: 'Revenue generated per month',
            data: revenue,
            backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(128, 0, 128, 0.5)',
            ],
        },
    ],
}

export function UserDashboard() {
    const loggedInUser = userService.getLoggedinUser()
    const navigate = useNavigate()


    useEffect(() => {
        if (!loggedInUser) {
            showErrorMsg('You must be logged in to view your listings')
            navigate('/')
        }
    }, [loggedInUser, navigate])

    return (
        <section className='dashboard-page'>

            <section className='overview'>
                <h4>{revenue.length} Months average</h4>
                <h5>Revenue: <span>${averageRevenue}</span></h5>
                <h5>Occupancy: <span>{61.83}%</span></h5>
            </section>

            <section className="orders">
                <OrderList loggedInUser={loggedInUser} />
            </section>

            <section className="sales-dashboard">
                <section className='chart-container'>
                    <Bar options={options} data={data} />
                </section>
                <section className='chart-container'>
                    <LineChart />
                </section>
            </section>

        </section>
    )
}
