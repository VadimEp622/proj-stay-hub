import React, { useState } from 'react'
<<<<<<< HEAD
import { orderService } from '../services/order.service';
=======
>>>>>>> 90d4816711d22d6f07cf41a50c33d2e85cbc3801

const data = [
  { guest: 'John Doe', dates: 'Jun 23-27', status: 'Pending' },
  { guest: 'Jane Smith', dates: 'Mar 11-17', status: 'Approved' },
  { guest: 'Michael Johnson', dates: 'Feb 15-18', status: 'Rejected' },
];

export function HostOrders() {
<<<<<<< HEAD
  const [tableData, setTableData] = useState(data)
  const [orderedListings, setOrderedListings] = useState([])
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
                <td>{utilService.getFormattedTimeRange(stay.availableDates[0].from, stay.availableDates[0].to)}</td>
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
=======
    const [tableData, setTableData] = useState(data)

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
>>>>>>> 90d4816711d22d6f07cf41a50c33d2e85cbc3801
