// Node modules
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


export function ChartBar({ dashboardData }) {

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

    const data = {
        labels: dashboardData.labels,
        datasets: [
            {
                label: 'Revenue generated per month',
                data: dashboardData.revenue,
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
    return (
        <section className='chart-container flex justify-center'>
            <Bar options={options} data={data} />
        </section>
    )
}