import { BLACK_SUPERHOST_16, STAR_16, VERIFIED } from "../../services/svg.service.js"
import SvgHandler from "../_reuseable-cmps/svg-handler.jsx"


export function HostDetails({ stay, hostImgUrl, randomDateJoined }) {

    const reviews = stay.reviews.length > 1 ? 'reviews' : 'review'
    const capitalizedReviewsString = reviews.charAt(0).toUpperCase() + reviews.slice(1)
    return (
        <section className="host-details-container">
            <div className="mini-owner flex align-center">
                <img src={hostImgUrl} alt="host" />
                <section className='mini-owner-info'>
                    <h3 className='fs22'>Hosted by {stay.host.fullname}</h3>
                    <span>Joined in {randomDateJoined}</span>
                </section>
            </div>
            <div className="sub-details flex">
                <section className='sub-details-highlights'>
                    <section className='fs16 flex align-center'>
                        <SvgHandler svgName={STAR_16} />
                        <h4>
                            {stay.reviews.length}
                        </h4>
                        <span>
                            {capitalizedReviewsString}
                        </span>
                        <SvgHandler svgName={VERIFIED} />
                        <h4>
                            Identity verified
                        </h4>
                        {stay.host.isSuperhost && (
                            <>
                                <SvgHandler svgName={BLACK_SUPERHOST_16} />
                                <h4>
                                    Superhost
                                </h4>
                            </>
                        )}
                    </section>
                    <section className="about-host fs16">
                        <div className="house-rules">
                            <p>{stay.host.about}</p>
                            <h4>During your stay</h4>
                            <p>
                                We live permanently in {stay.host.location} with our family and are on site to answer any questions our guests have.
                                We cook for our guests once a week and hold a weekly pizza night.
                            </p>

                            <h4>{stay.host.fullname} is a Superhost</h4>
                            <p>
                                Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                            </p>
                        </div>

                    </section>
                </section>
                <section className='owner-communication flex'>
                    <h3 className='fs16'>Language: English</h3>
                    <h3 className='fs16'>Response rate: 100%</h3>
                    <h3 className='fs16'>Response time: {stay.host.responseTime ? stay.host.responseTime : 'Within couple of hours'}</h3>
                    <button className='fs16'>Contact Host</button>
                    <section className='protection-info flex align-center fs12'>
                        <img src="https://res.cloudinary.com/dnhn4zsy0/image/upload/v1685913828/airbnb-orotect_ohgcnp.svg" alt="airbnb protect" />
                        <span>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</span>
                    </section>
                </section>
            </div>
        </section>
    )
}