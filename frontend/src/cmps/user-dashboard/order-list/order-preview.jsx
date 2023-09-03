// Services
import { utilService } from "../../../services/util.service.js"


export function OrderPreview({ order, onApprove, onReject }) {
    return (
        <tr className="flex">
            <td className="guest-column">
                <section className="order-guest flex align-center">
                    <img src={order.content.buyer.img} alt="guest" />

                    <article className="name-and-join-date flex column">
                        <span className="full-name"> {order.content.buyer.fullname}</span>
                        <span className="join-date fs12">Joined in {order.content.buyer.joined}</span>
                    </article>
                </section>
            </td>

            <td className="date-column">
                <span className="order-dates flex align-center">{utilService.getFormattedTimeRange(order.content.checkIn, order.content.checkOut)}</span>
            </td>

            <td className="action-column">
                <section className="order-actions flex align-center">
                    {order.content.status === 'Pending' ? (
                        <article className="actions flex column justify-center">
                            <button className="action-button approve" onClick={(ev) => onApprove(ev, order._id)}>
                                Approve
                            </button>

                            <button className="action-button reject" onClick={(ev) => onReject(ev, order._id)}>
                                Reject
                            </button>
                        </article>
                    ) : (
                        <article className={`order-status ${order.content.status === 'Approved' ? 'approved' : 'rejected'} fs14`} >
                            {order.content.status}
                        </article>
                    )}
                </section>
            </td>
        </tr>
    )
}