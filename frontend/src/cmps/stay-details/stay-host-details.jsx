import { BLACK_SUPERHOST_16, STAR_16, VERIFIED } from '../../services/svg.service.js'
import SvgHandler from '../_reuseable-cmps/svg-handler.jsx'


// TODO low: some host don't have response time in the database

export function HostDetails({ stay, hostImgUrl, randomDateJoined }) {

    const reviews = stay.reviews.length > 1 ? 'reviews' : 'review'
    const responseTime = stay.host?.responseTime ? stay.host.responseTime : 'within a few hours'
    return (
        <section className='host-details-container'>

            <section className='host-details-header flex align-center'>
                <img src={hostImgUrl} alt='host' />
                <section className='host-intro-info'>
                    <h3 className='host-name fs22'>Hosted by {stay.host.fullname}</h3>
                    <span className='host-join-date'>Joined in {randomDateJoined}</span>
                </section>
            </section>

            <section className='host-details-main flex'>

                <section className='host-main-info-container'>
                    <section className='host-tags fs16 lh20 flex align-center'>
                        <section className='reviews-count flex align-center'>
                            <SvgHandler svgName={STAR_16} />
                            <span>{`${stay.reviews.length} ${reviews}`}</span>
                        </section>
                        <section className='identity-verified flex align-center'>
                            <SvgHandler svgName={VERIFIED} />
                            <span>identity verified</span>
                        </section>
                        {stay.host.isSuperhost &&
                            <section className='super-host flex align-center'>
                                <SvgHandler svgName={BLACK_SUPERHOST_16} />
                                <span>superhost</span>
                            </section>
                        }
                    </section>

                    <section className='host-main-info fs16'>

                        {stay.host?.about &&
                            <section className="host-about">
                                <p className='lh24'>{stay.host.about}</p>
                            </section>
                        }

                        <section className='during-stay'>
                            <h4 className='lh20'>During your stay</h4>
                            <p className='lh24'>
                                We live permanently in {stay.host.location} with our family and are on site to answer any questions our guests have.
                                We cook for our guests once a week and hold a weekly pizza night.
                            </p>
                        </section>

                        <section className='is-super-host'>
                            <h4 className='lh20'>{stay.host.fullname} is a Superhost</h4>
                            <p className='lh24'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                        </section>

                    </section>
                </section>

                <section className='contact-host flex column'>
                    <ul className='host-response-info fs16 lh20'>
                        <li>Language: <span>English</span></li>
                        <li>Response rate: <span>100%</span></li>
                        <li>Response time: <span>{responseTime}</span></li>
                    </ul>
                    <button className='ff-circular-semibold fs16 lh20'>Contact Host</button>
                    <section className='protection-info flex align-center fs12'>
                        <img src='https://res.cloudinary.com/dnhn4zsy0/image/upload/v1685913828/airbnb-orotect_ohgcnp.svg' alt='airbnb protect' />
                        <span>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</span>
                    </section>
                </section>
            </section>
        </section>
    )
}