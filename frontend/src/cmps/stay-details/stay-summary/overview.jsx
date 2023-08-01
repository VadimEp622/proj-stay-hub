export function Overview({ stay, hostImgUrl }) {

    return (
        <section className='overview-container flex space-between'>
            <section className='overview'>
                <h2>Entire villa hosted by {stay.host.fullname}</h2>
                <span>4 guests</span>
                <span className='dot'>•</span>
                <span>2 bedrooms</span>
                <span className='dot'>•</span>
                <span>2 beds</span>
                <span className='dot'>•</span>
                <span>1 bath</span>
            </section>
            <img src={hostImgUrl} alt="host" />
        </section>
    )
}