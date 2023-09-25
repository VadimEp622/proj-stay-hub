export function Overview({ stay, hostImgUrl }) {

    const guests = '4 guests'
    const bedrooms = '2 bedrooms'
    const beds = '2 beds'
    const baths = '1 bath'
    return (
        <section className='stay-overview-container flex space-between'>
            <section className='stay-overview'>
                <h2 className='title fs22 lh26'>Entire villa hosted by {stay.host.fullname}</h2>
                <ul className='content-list flex fs16 lh20'>
                    <li>{guests}</li>
                    <li>{bedrooms}</li>
                    <li>{beds}</li>
                    <li>{baths}</li>
                </ul>
            </section>
            <img src={hostImgUrl} alt='host' />
        </section>
    )
}