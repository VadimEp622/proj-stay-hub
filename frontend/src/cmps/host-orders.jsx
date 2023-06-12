import React, { useState } from 'react'

const data = [
  { guest: 'John Doe', dates: 'Jun 23-27', status: 'Pending' },
  { guest: 'Jane Smith', dates: 'Mar 11-17', status: 'Approved' },
  { guest: 'Michael Johnson', dates: 'Feb 15-18', status: 'Rejected' },
];

export function HostOrders() {
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