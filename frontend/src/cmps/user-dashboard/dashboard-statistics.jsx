import { ChartBar } from "./dashboard-statistics/chart-bar.jsx"
import { ChartLine } from "./dashboard-statistics/chart-line.jsx"

export function DashboardStatistics({ dashboardData }) {


    function getAverageRevenue() {
        const sum = dashboardData.revenue.reduce((sum, value) => sum + value, 0)
        const average = sum / dashboardData.revenue.length
        return average.toLocaleString(undefined, { maximumFractionDigits: 2 })
    }

    const averageRevenue = getAverageRevenue()
    return (
        <section className="dashboard-statistics">

            <article className="statistics-revenue">
                <h2 className="statistics-header">Total revenue</h2>
                <section className="statistics-body">
                    <article className="flex space-between">
                        <h3>Revenue:</h3>
                        <h3>${averageRevenue}</h3>
                    </article>
                    <article className="flex space-between">
                        <h3>Occupancy:</h3>
                        <h3>{61.83}%</h3>
                    </article>
                </section>
            </article>
            <article className="statistics-chart-bar">
                <h2 className="statistics-header">Revenue per month</h2>
                <ChartBar dashboardData={dashboardData} />
            </article>
            <article className="statistics-chart-line">
                <h2 className="statistics-header">Occupancy rate</h2>
                <ChartLine dashboardData={dashboardData} />
            </article>

        </section>
    )
}