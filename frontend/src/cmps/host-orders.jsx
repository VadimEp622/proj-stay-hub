// Node modules
import { useState, useEffect } from 'react'

// Services
import { orderService } from '../services/order.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'


// TODO: might have to remake this from scratch

const data = [
  { guest: 'John Doe', imgUrl: 'https://a0.muscache.com/im/pictures/user/74afa56b-cc05-4701-a2ce-f4de5e435504.jpg?im_w=240', join: 'Mar 2023', dates: 'Jun 23-27', status: 'Pending' },
  { guest: 'Jane Smith', imgUrl: 'https://a0.muscache.com/im/pictures/user/596bca9e-ef37-4f41-b41c-a0904c47ca93.jpg?im_w=240', join: 'Jun 2015', dates: 'Mar 11-17', status: 'Approved' },
  { guest: 'Michael Johnson', imgUrl: 'https://a0.muscache.com/im/pictures/user/cee1b931-2952-4fc0-9b78-3fb70324c397.jpg?im_w=240', join: 'Nov 2020', dates: 'Feb 15-18', status: 'Rejected' },
]

export function HostOrders({ loggedInUser }) {
  const [tableData, setTableData] = useState(data)
  const [orderedListings, setOrderedListings] = useState([])


  const handleApprove = (index) => {
    const updatedData = [...tableData]
    updatedData[index].status = 'Approved'
    setTableData(updatedData)
  }

  const handleReject = (index) => {
    const updatedData = [...tableData]
    updatedData[index].status = 'Rejected'
    setTableData(updatedData)
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await orderService.getOrders()
        console.log('orders -> host-order.jsx', orders)
        setOrderedListings(orders)
      } catch (error) {
        showErrorMsg('Error fetching orders')
      }
    }

    fetchOrders()
  }, [])


  function handleApprovedClick(trip) {
    const updatedListings = orderedListings.map((listing) =>
      listing.content._id === trip.content._id ? { ...listing, content: { ...listing.content, status: 'Approved' } } : listing
    )
    setOrderedListings(updatedListings)
    orderService.saveOrder({ status: 'Approved', _id: trip._id })
  }

  function handleRejectedClick(trip) {
    const updatedListings = orderedListings.map((listing) =>
      listing.content._id === trip.content._id ? { ...listing, content: { ...listing.content, status: 'Rejected' } } : listing
    )
    setOrderedListings(updatedListings)
    orderService.saveOrder({ status: 'Rejected', _id: trip._id })
  }


  return (
    <section className="table-wrapper">
      <section className="table-container">

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
                <td>

                  <section className='order-mini-user flex'>
                    <img src={order.content.buyer.img} alt="guest" />

                    <section className='mini-user-info flex'>
                      <span> {order.content.buyer.fullname}</span>
                      <span className='joined-in flex align-baseline'>Joined in {order.content.buyer.joined}</span>
                    </section>

                  </section>

                </td>

                <td>{utilService.getFormattedTimeRange(order.content.checkIn, order.content.checkOut)}</td>

                <td>

                  {order.content.status === 'Pending' ? (

                    <section className="actions">
                      <button className="action-button approve" onClick={() => handleApprovedClick(order)}>
                        Approve
                      </button>

                      <button className="action-button reject" onClick={() => handleRejectedClick(order)}>
                        Reject
                      </button>
                    </section>

                  ) : (
                    <article className={`selection ${order.content.status === 'Approved' ? 'approved' : 'rejected'}`} >
                      {order.content.status}
                    </article>
                  )}

                </td>

              </tr>
            ))}

            {tableData.map((item, index) => (
              <tr key={index} className='order-table-row'>

                <td>
                  <section className='order-mini-user flex'>

                    <img src={item.imgUrl} alt="guest" />
                    <section className='mini-user-info flex'>
                      <span> {item.guest}</span>
                      <span className='joined-in flex align-baseline'>Joined in {item.join}</span>
                    </section>

                  </section>
                </td>

                <td>{item.dates}</td>

                <td>
                  {item.status === 'Pending' ? (
                    <section className="actions">

                      <button className="action-button approve" onClick={() => handleApprove(index)}>
                        Approve
                      </button>
                      <button className="action-button reject" onClick={() => handleReject(index)}>
                        Reject
                      </button>

                    </section>
                  ) : (
                    <article className={`selection ${item.status === 'Approved' ? 'approved' : 'rejected'}`}>
                      {item.status}
                    </article>
                  )}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </section>
    </section>
  )
}
