import React, { useState } from 'react'
import { orderService } from '../services/order.service';
import { useEffect } from 'react';
import { showErrorMsg } from '../services/event-bus.service';
import { userService } from '../services/user.service';
import { utilService } from '../services/util.service';

const data = [
  { guest: 'John Doe', dates: 'Jun 23-27', status: 'Pending' },
  { guest: 'Jane Smith', dates: 'Mar 11-17', status: 'Approved' },
  { guest: 'Michael Johnson', dates: 'Feb 15-18', status: 'Rejected' },
];

export function HostOrders() {
  const [tableData, setTableData] = useState(data)
  const [orderedListings, setOrderedListings] = useState([])
  const loggedInUser = userService.getLoggedinUser();

  const handleApprove = (index) => {
    const updatedData = [...tableData]
    updatedData[index].status = 'Approved'
    setTableData(updatedData)
  };

  const handleReject = (index) => {
    const updatedData = [...tableData]
    updatedData[index].status = 'Rejected'
    setTableData(updatedData)
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await orderService.getOrders();
        const filteredTrips = orders.filter(
          (order) => order.seller._id === loggedInUser._id
        );
        setOrderedListings(filteredTrips)
      } catch (error) {
        showErrorMsg('Error fetching orders');
      }
    };

    fetchOrders();
  }, []);

  function handleApprovedClick(trip) {
    trip.status = "Approved"
    orderService.saveOrder(trip)
  }

  function handleRejectedClick(trip) {
    trip.status = "Rejected"
    orderService.saveOrder(trip)
  }

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Dates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderedListings.map((order, index) => (
              <tr key={index}>
                <td>{order.buyer.name}</td>
                <td>{utilService.getFormattedTimeRange(order.availableDates[0].from, order.availableDates[0].to)}</td>
                <td>
                  {order.status === 'Pending' ? (
                    <div className="actions">
                      <button className="action-button approve" onClick={() => handleApprovedClick(order)}>
                        Approve
                      </button>
                      <button className="action-button reject" onClick={() => handleRejectedClick(order)}>
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="selection">{order.status}</div>
                  )}
                </td>
              </tr>
            ))}
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.guest}</td>
                <td>{item.dates}</td>
                <td>
                  {item.status === 'Pending' ? (
                    <div className="actions">
                      <button className="action-button approve" onClick={() => handleApprove(index)}>
                        Approve
                      </button>
                      <button className="action-button reject" onClick={() => handleReject(index)}>
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="selection">{item.status}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}