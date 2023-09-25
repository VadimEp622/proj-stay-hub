export function ThingsToKnow({ checkIn }) {

    return (

        <section className='things-to-know'>
            <h2 className='title fs22 lh26'>Things to know</h2>
            <section className='rules-container flex fs16 lh20'>

                <section className='house-rules'>
                    <h4>House rules</h4>
                    <p>Check-in after 4:00 PM</p>
                    <p>Checkout before 10:00 AM</p>
                    <p>Pets allowed</p>
                </section>

                <section className='safety'>
                    <h4>Safety & property</h4>
                    <p>No smoke alarm</p>
                    <p>Pool/hot tub without a gate or lock</p>
                    <p>Carbon monoxide detector not required</p>
                </section>

                <section className='cancelation'>
                    <h4>Cancellation policy</h4>
                    {checkIn ?
                        <>
                            <p>Free cancellation before {checkIn}</p>
                            <p>Review the Host's full cancellation policy which applies even if you cancel for illness for disruptions caused by COVID-19</p>
                        </>
                        : <p>Add your trip dates to get the cancellation details for this stay. </p>
                    }
                </section>

            </section>
        </section>
    )
}