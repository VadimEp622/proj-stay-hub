import GoogleMap from '../map.jsx'

export function StayMap({ stay }) {

    const { lat, lan, city, country } = stay.loc
    return (
        <section className="map-container" id='location'>
            <h3 className='fs22'>Where you'll be</h3>
            <div className="map">
                <GoogleMap loc={{ lat, lan }} />
            </div>
            <section className='location-about'>
                <h3 className='fs16'>{city}, {country}</h3>
            </section>
        </section>
    )
}