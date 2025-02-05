// Node modules
import { useState, useEffect } from 'react'

// Store
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { approveOrder, loadOrders, orderResetLoadOrders, orderUpdateReqStatusLoadOrders, rejectOrder } from '../../store/orderSlice'

// Services
import { orderService } from '../../services/order.service.js'

// Components
import { OrderPreview } from './order-list/order-preview.jsx'
import { Loader } from '../_reuseable-cmps/loader.jsx'


// TODO: make tabs, for displaying:
//   1. ALL ORDERS of ALL users
//   2. Only orders made by CURRENT LOGGED IN USER
//   3. Example of orders, or demo data
// TODO: consider whether it's really needed to put the orders into the store, and not use useState


export function OrderList({ loggedinUser }) {
  const dispatch = useAppDispatch()
  const reqStatusLoadOrders = useAppSelector(storeState => storeState.orderModule.reqStatusLoadOrders)
  const allOrders = useAppSelector(storeState => storeState.orderModule.orders)
  const [demoOrders, setDemoOrders] = useState(orderService.getDemoOrders())


  useEffect(() => {
    dispatch(orderResetLoadOrders())
    dispatch(loadOrders({ userType: 'all' }))
    return () => {
      dispatch(orderUpdateReqStatusLoadOrders("idle"))
    }
  }, [dispatch])


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
    if (!isDemoData) dispatch(approveOrder(orderId))
    else handleApproveDemoData(orderId)
  }

  function onReject(ev, orderId, isDemoData = false) {
    ev.preventDefault()
    ev.stopPropagation()
    if (!isDemoData) dispatch(rejectOrder(orderId))
    else handleRejectDemoData(orderId)
  }


  if (reqStatusLoadOrders === 'idle' || reqStatusLoadOrders === 'pending') return <Loader />
  if (reqStatusLoadOrders === 'failed') return <p>Failed to load orders</p>

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
