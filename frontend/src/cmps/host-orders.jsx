// Node modules
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// Store
import { approveOrder, denyOrder, loadOrders } from '../store/order.actions.js'

// Services
import { utilService } from '../services/util.service.js'


// TODO: add order list + order preview, and demo data preview
// TODO: consider renaming hostOrders to userOrders(?)/userHostOrders(?)

const demoData = [
  { guest: 'John Doe', imgUrl: 'https://a0.muscache.com/im/pictures/user/74afa56b-cc05-4701-a2ce-f4de5e435504.jpg?im_w=240', join: 'Mar 2023', dates: 'Jun 23-27', status: 'Pending' },
  { guest: 'Jane Smith', imgUrl: 'https://a0.muscache.com/im/pictures/user/596bca9e-ef37-4f41-b41c-a0904c47ca93.jpg?im_w=240', join: 'Jun 2015', dates: 'Mar 11-17', status: 'Approved' },
  { guest: 'Michael Johnson', imgUrl: 'https://a0.muscache.com/im/pictures/user/cee1b931-2952-4fc0-9b78-3fb70324c397.jpg?im_w=240', join: 'Nov 2020', dates: 'Feb 15-18', status: 'Rejected' },
]

export function HostOrders({ loggedInUser }) {
  const [tableData, setTableData] = useState(demoData)
  const allOrders = useSelector(storeState => storeState.orderModule.orders)

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    console.log('allOrders', allOrders)
  }, [allOrders])


  // DEMO DATA //
  function handleApproveDemoData(index) {
    const updatedData = [...tableData]
    updatedData[index].status = 'Approved'
    setTableData(updatedData)
  }
  function handleRejectDemoData(index) {
    const updatedData = [...tableData]
    updatedData[index].status = 'Rejected'
    setTableData(updatedData)
  }
  ///////////////


  function onApprove(ev, orderId) {
    ev.preventDefault()
    ev.stopPropagation()
    approveOrder(orderId)
  }

  function onReject(ev, orderId) {
    ev.preventDefault()
    ev.stopPropagation()
    denyOrder(orderId)
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

            {allOrders.map((order, index) => (
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
                      <button className="action-button approve" onClick={(ev) => onApprove(ev, order._id)}>
                        Approve
                      </button>

                      <button className="action-button reject" onClick={(ev) => onReject(ev, order._id)}>
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

                      <button className="action-button approve" onClick={() => handleApproveDemoData(index)}>
                        Approve
                      </button>
                      <button className="action-button reject" onClick={() => handleRejectDemoData(index)}>
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
