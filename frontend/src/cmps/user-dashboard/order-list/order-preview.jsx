// Services
import { utilService } from '../../../services/util.service.js'


export function OrderPreview({ order, onApprove, onReject }) {

    const orderStatus = order.content.status
    const buyerPic = order.content.buyer.img
    const buyerName = order.content.buyer.fullname
    const buyerJoinDate = order.content.buyer.joined
    const { checkIn, checkOut } = order.content.orderDetails
    const timeRange = utilService.getFormattedTimeRange(checkIn, checkOut)
    return (
        <tr className='flex'>
            <td className='guest-column'>
                <section className='order-guest flex align-center'>
                    <img src={buyerPic} alt='guest' />

                    <article className='name-and-join-date flex column'>
                        <span className='full-name'> {buyerName}</span>
                        <span className='join-date fs12'>Joined in {buyerJoinDate}</span>
                    </article>
                </section>
            </td>

            <td className='date-column'>
                <span className='order-dates flex align-center'>{timeRange}</span>
            </td>

            <td className='action-column'>
                <section className='order-actions flex align-center'>
                    {orderStatus === 'Pending' ? (
                        <article className='actions flex column justify-center'>
                            <button className='action-button approve' onClick={(ev) => onApprove(ev, order._id)}>
                                Approve
                            </button>

                            <button className='action-button reject' onClick={(ev) => onReject(ev, order._id)}>
                                Reject
                            </button>
                        </article>
                    ) : (
                        <article className={`order-status ${orderStatus.toLowerCase()} fs14`} >
                            {orderStatus}
                        </article>
                    )}
                </section>
            </td>
        </tr>
    )
}