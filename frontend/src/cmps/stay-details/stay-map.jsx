import GoogleMap from '../_reuseable-cmps/map.jsx'

export function StayMap({ stay }) {

    const { lat, lan, city, country } = stay.loc
    return (
        <section className='stay-map-container' id='location'>
            <h3 className='title fs22 lh26'>Where you'll be</h3>
            <p className='location fs16 lh20'>{city}, {country}</p>
            <GoogleMap loc={{ lat, lan }} />
        </section>
    )
}