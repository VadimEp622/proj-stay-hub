// Services
import { utilService } from "../../../services/util.service.js"


export function OrderPreview({ order, onApprove, onReject }) {
    return (
        <tr>

            <td>
                <section className='order-mini-user flex'>
                    <img src={order.content.buyer.img} alt="guest" />

                    <article className='mini-user-info flex'>
                        <span> {order.content.buyer.fullname}</span>
                        <span className='joined-in flex align-baseline'>Joined in {order.content.buyer.joined}</span>
                    </article>
                </section>
            </td>

            <td>{utilService.getFormattedTimeRange(order.content.checkIn, order.content.checkOut)}</td>

            <td>
                {order.content.status === 'Pending' ? (
                    <article className="actions">
                        <button className="action-button approve" onClick={(ev) => onApprove(ev, order._id)}>
                            Approve
                        </button>

                        <button className="action-button reject" onClick={(ev) => onReject(ev, order._id)}>
                            Reject
                        </button>
                    </article>
                ) : (
                    <article className={`selection ${order.content.status === 'Approved' ? 'approved' : 'rejected'}`} >
                        {order.content.status}
                    </article>
                )}
            </td>

        </tr>
    )
}