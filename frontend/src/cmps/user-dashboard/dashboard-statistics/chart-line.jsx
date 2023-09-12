// Node modules
import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js'


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)


export function ChartLine({ dashboardData }) {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Occupancy rate',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                grid: {
                    display: false, // Hide the background lines for the x-axis
                },
            },
            y: {
                grid: {
                    display: true, // Hide the background lines for the y-axis
                },
            },
        },
    }

    const data = {
        labels: dashboardData.labels,
        datasets: [
            {
                label: 'Occupancy',
                data: dashboardData.occupancyRate,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    return (
        <section className='chart-container flex justify-center'>
            <Line options={options} data={data} />
        </section>
    )
}
