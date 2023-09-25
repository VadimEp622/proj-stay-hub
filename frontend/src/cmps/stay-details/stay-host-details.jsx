import { BLACK_SUPERHOST_16, STAR_16, VERIFIED } from '../../services/svg.service.js'
import SvgHandler from '../_reuseable-cmps/svg-handler.jsx'


export function HostDetails({ stay, hostImgUrl, randomDateJoined }) {

    const reviews = stay.reviews.length > 1 ? 'reviews' : 'review'
    const capitalizedReviewsString = reviews.charAt(0).toUpperCase() + reviews.slice(1)
    return (
        <section className='host-details-container'>

            <section className='mini-owner flex align-center'>
                <img src={hostImgUrl} alt='host' />
                <section className='mini-owner-info'>
                    <h3 className='fs22'>Hosted by {stay.host.fullname}</h3>
                    <span>Joined in {randomDateJoined}</span>
                </section>
            </section>

            <section className='sub-details flex'>

                <section className='sub-details-highlights'>

                    <section className='host-tags fs16 lh20 flex align-center'>
                        <section className='reviews-count flex align-center'>
                            <SvgHandler svgName={STAR_16} />
                            <span>{`${stay.reviews.length} ${capitalizedReviewsString}`}</span>
                        </section>
                        <section className='identity-verified flex align-center'>
                            <SvgHandler svgName={VERIFIED} />
                            <span>Identity verified</span>
                        </section>
                        {stay.host.isSuperhost && (
                            <section className='super-host flex align-center'>
                                <SvgHandler svgName={BLACK_SUPERHOST_16} />
                                <span>Superhost</span>
                            </section>
                        )}
                    </section>

                    <section className='about-host fs16'>

                        <section className='house-rules'>
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

                </section>

                <section className='owner-communication flex'>
                    <h3 className='fs16'>Language: English</h3>
                    <h3 className='fs16'>Response rate: 100%</h3>
                    <h3 className='fs16'>Response time: {stay.host.responseTime ? stay.host.responseTime : 'Within couple of hours'}</h3>
                    <button className='fs16'>Contact Host</button>
                    <section className='protection-info flex align-center fs12'>
                        <img src='https://res.cloudinary.com/dnhn4zsy0/image/upload/v1685913828/airbnb-orotect_ohgcnp.svg' alt='airbnb protect' />
                        <span>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</span>
                    </section>
                </section>

            </section>

        </section>
    )
}