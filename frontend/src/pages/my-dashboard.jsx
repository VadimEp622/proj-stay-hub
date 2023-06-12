import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { stayService } from '../services/stay.service';
import { userService } from '../services/user.service';
import { LineChart } from '../cmps/line-chart';
import { showErrorMsg } from '../services/event-bus.service';
import { useNavigate } from 'react-router-dom'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Revenue overview',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May'];
const revenue = [3420, 1502, 5482, 3481, 4953];
const data = {
    labels,
    datasets: [
        {
            label: 'Revenue generated per month',
            data: revenue,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export function MyDashboard() {
    const loggedInUser = userService.getLoggedinUser();
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const listings = await stayService.query();
                const filteredListings = listings.filter((listing) => listing.host._id === loggedInUser._id);
                setListings(filteredListings);
            } catch (error) {
                showErrorMsg('Error fetching orders');
            }
        };

        fetchOrders();
    }, [loggedInUser]);

    useEffect(() => {
        if (!loggedInUser) {
            showErrorMsg('You must be logged in to view your trips');
            navigate('/');
        }
    }, [loggedInUser, navigate]);

    return (
        <div>
            <h3>Welcome back, {loggedInUser?.fullname}</h3>
            <section className="dashboard">
                <h4>Total Orders</h4>
                <p>{listings.length}</p>
                <p>The count of orders has been rising by an average of 20% MoM over the last three months.</p>
            </section>
            <section>
                <h4>Rating</h4>
                <p>4.8</p>
                <p>The average rating of your lists is 4.8. This is better than 80% of the sellers in your area.</p>
            </section>
            <section className="occupancy">
                <p>The average occupancy of your stays is 82% YTD.</p>
            </section>
            <section className="sales-dashboard">
                <Bar options={options} data={data} />
                <LineChart />
            </section>
            <section className="orders"></section>
        </div>
    );
}
