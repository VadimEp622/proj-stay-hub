// Node modules
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// Store
import { approveOrder, rejectOrder, loadOrders } from '../../store/order.actions.js'

// Services
import { orderService } from '../../services/order.service.js'

// Components
import { OrderPreview } from './order-list/order-preview.jsx'
import { Loader } from '../_reuseable-cmps/loader.jsx'


// TODO: Organize/improve styling 
// TODO: make tabs, for displaying:
//   1. ALL ORDERS of ALL users
//   2. Only orders made by CURRENT LOGGED IN USER
//   3. Example of orders, or demo data


export function OrderList({ loggedInUser }) {
  const isLoadingOrders = useSelector(storeState => storeState.orderModule.isLoadingOrders)
  const allOrders = useSelector(storeState => storeState.orderModule.orders)
  const [demoOrders, setDemoOrders] = useState(orderService.getDemoOrders())

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    console.log('allOrders', allOrders)
  }, [allOrders])


  // DEMO DATA //
  function handleApproveDemoData(orderId) {
    const updatedDemoOrders = demoOrders.map(order => (order._id === orderId)
      ? { ...order, content: { ...order.content, status: 'Approved' } }
      : order
    )
    setDemoOrders(updatedDemoOrders)
  }
  function handleRejectDemoData(orderId) {
    const updatedDemoOrders = demoOrders.map(order => (order._id === orderId)
      ? { ...order, content: { ...order.content, status: 'Rejected' } }
      : order
    )
    setDemoOrders(updatedDemoOrders)
  }
  ///////////////


  function onApprove(ev, orderId, isDemoData = false) {
    ev.preventDefault()
    ev.stopPropagation()
    if (!isDemoData) approveOrder(orderId)
    else handleApproveDemoData(orderId)
  }

  function onReject(ev, orderId, isDemoData = false) {
    ev.preventDefault()
    ev.stopPropagation()
    if (!isDemoData) rejectOrder(orderId)
    else handleRejectDemoData(orderId)
  }


  if (isLoadingOrders) return <Loader />
  return (
    <section className="order-list">
      <table>

        <thead>
          <tr className="flex">
            <th className="guest-column">Guest</th>
            <th className="date-column">Dates</th>
            <th className="action-column">Actions</th>
          </tr>
        </thead>

        <tbody>
          {allOrders.map(order => (
            <OrderPreview
              key={order._id}
              order={order}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
          {
            allOrders.length === 0 &&
            demoOrders.map(order => (
              <OrderPreview
                key={order._id}
                order={order}
                onApprove={(ev, orderId) => onApprove(ev, orderId, true)}
                onReject={(ev, orderId) => onReject(ev, orderId, true)}
              />
            ))
          }
        </tbody>

      </table>
    </section >
  )
}
