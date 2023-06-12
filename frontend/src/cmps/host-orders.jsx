import React from 'react'

export function HostOrders() {
  const data = [
    { guest: 'John Doe', dates: 'Jun 23-27', status: 'Pending' },
    { guest: 'Jane Smith', dates: 'Mar 11-17', status: 'Approved' },
    { guest: 'Michael Johnson', dates: 'Feb 15-18', status: 'Rejected' },
  ];

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Guest</th>
            <th>Dates</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.guest}</td>
              <td>{row.dates}</td>
              <td>{row.status}</td>
              <td>
                {row.status === 'Pending' && (
                  <button >Approve</button> //onClick={() => handleApprove(index)}
                )}
              </td>
              <td>
                {row.status === 'Pending' && (
                  <button >Reject</button>  //onClick={() => handleReject(index)}
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
