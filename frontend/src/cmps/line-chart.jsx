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
            position: 'top',
        },
        title: {
            display: true,
            text: 'Occupancy rate',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
const occupancyRate = [82, 90, 71, 76, 81, 89]
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
