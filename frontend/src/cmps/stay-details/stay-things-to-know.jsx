import { getDate } from "../../services/stay.service.js";

export function ThingsToKnow({stay}) {

    return (

        <section className="things-to-know fs16">
            <h2>Things to know</h2>
            <section className='rules-container flex'>
                <div className="house-rules">
                    <h4>House rules</h4>
                    <p>Check-in after 4:00 PM</p>
                    <p>Checkout before 10:00 AM</p>
                    <p>Pets allowed</p>
                </div>
                <div className="safety">
                    <h4>Safety & property</h4>
                    <p>No smoke alarm</p>
                    <p>Pool/hot tub without a gate or lock</p>
                    <p>Carbon monoxide detector not required</p>
                </div>
                <div className="cancelation">
                    <h4>Cancellation policy</h4>
                    <p>Free cancellation before {getDate(stay.checkIn)}</p>
                    <p>Review the Host's full cancellation policy which applies even if you cancel for illness for disruptions caused by COVID-19</p>
                </div>
            </section>
        </section>
    )
}