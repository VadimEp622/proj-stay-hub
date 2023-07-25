import GoogleMap from '../map.jsx'

export function StayMap({stay}){

    return(
        <section className="map-container" id='location'>
        <h3 className='fs22'>Where you'll be</h3>
        <div className="map">
            <GoogleMap loc={{ lat: stay.loc.lat, lan: stay.loc.lan }} />
        </div>
        <section className='location-about'>
            <h3 className='fs16'>{stay.loc.city}, {stay.loc.country}</h3>
        </section>
    </section>
    )
}