import React from 'react';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);

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
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
const occupancyRate = [74, 29, 90, 63, 81, 34]
const data = {
    labels,
    datasets: [
        {
            label: 'Occupancy',
            data: occupancyRate,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export function LineChart() {
    return <Line options={options} data={data} />;
}
