export function UserOverview({ dashboardData }) {


    const averageRevenue = (dashboardData.revenue.reduce((sum, value) => sum + value, 0) / dashboardData.revenue.length).toLocaleString(undefined,
        { maximumFractionDigits: 2, })
        
    return (
        <section className='overview'>
            <h4>{dashboardData.revenue.length} Months average</h4>
            <h5>Revenue: <span>${averageRevenue}</span></h5>
            <h5>Occupancy: <span>{61.83}%</span></h5>
        </section>
    )
}