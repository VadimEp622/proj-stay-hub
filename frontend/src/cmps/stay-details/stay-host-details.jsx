import { BLACK_SUPERHOST_16, STAR_16, VERIFIED } from '../../services/svg.service.js'
import SvgHandler from '../_reuseable-cmps/svg-handler.jsx'


// TODO low: some host don't have response time in the database

export function HostDetails({ stay, hostImgUrl, randomDateJoined }) {

    const hostName = stay.host.fullname
    const hostLocation = stay.host.location
    const isSuperHost = stay.host.isSuperhost
    const aboutHost = stay.host?.about
    const reviewsCount = stay.reviews.length
    const responseTime = stay.host?.responseTime ? stay.host.responseTime : 'within a few hours'

    const reviewCountStr = `${reviewsCount} ${reviewsCount > 1 ? 'reviews' : 'review'}`
    return (
        <section className='host-details-container'>

            <section className='host-details-header flex align-center gap16'>
                <section>
                    <img src={hostImgUrl} alt='host' />
                </section>
                <section className='host-intro-info'>
                    <h3 className='host-name fs22'>Hosted by {hostName}</h3>
                    <span className='host-join-date'>Joined in {randomDateJoined}</span>
                </section>
            </section>

            <section className='host-details-main'>

                <section className='host-main-info-container'>
                    <section className='host-tags fs16 lh20 flex align-center flex-wrap'>
                        <section className='reviews-count flex align-center'>
                            <SvgHandler svgName={STAR_16} />
                            <span>{reviewCountStr}</span>
                        </section>
                        <section className='identity-verified flex align-center'>
                            <SvgHandler svgName={VERIFIED} />
                            <span>identity verified</span>
                        </section>
                        {isSuperHost &&
                            <section className='super-host flex align-center'>
                                <SvgHandler svgName={BLACK_SUPERHOST_16} />
                                <span>superhost</span>
                            </section>
                        }
                    </section>

                    <section className='host-main-info fs16'>

                        {aboutHost &&
                            <section className='host-about'>
                                <p className='lh24'>{aboutHost}</p>
                            </section>
                        }

                        <section className='during-stay'>
                            <h4 className='lh20'>During your stay</h4>
                            <p className='lh24'>
                                We live permanently in {hostLocation} with our family and are on site to answer any questions our guests have.
                                We cook for our guests once a week and hold a weekly pizza night.
                            </p>
                        </section>

                        {isSuperHost &&
                            <section className='is-super-host'>
                                <h4 className='lh20'>{hostName} is a Superhost</h4>
                                <p className='lh24'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                            </section>
                        }

                    </section>
                </section>

                <section className='contact-host flex column'>
                    <ul className='host-response-info fs16 lh20'>
                        <li>Language: <span>English</span></li>
                        <li>Response rate: <span>100%</span></li>
                        <li>Response time: <span>{responseTime}</span></li>
                    </ul>
                    <button className='ff-circular-semibold fs16 lh20'>Contact Host</button>
                    <section className='protection-info flex space-between align-center gap16 fs12'>
                        <img src='https://res.cloudinary.com/dnhn4zsy0/image/upload/v1685913828/airbnb-orotect_ohgcnp.svg' alt='airbnb protect' />
                        <span>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</span>
                    </section>
                </section>
            </section>
        </section>
    )
}