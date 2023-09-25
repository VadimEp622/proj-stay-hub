import { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import GoogleMapReact from 'google-map-react'


function Marker() {
    return <div style={{ height: '1em', width: '1em', borderRadius: '50%', background: 'red' }}></div>
}


// TODO: research and improve this map cmp
// TODO: secure the API key


export default function SimpleMap({ loc }) {
    //IMPORTANT NOTE: DEMO DATA CONFUSED LAT AND LAN.
    //ALSO:           GoogleMapReact ONLY WORKS WITH LNG KEY, NOT LAN KEY

    const lng = loc.lat
    const lat = loc.lan
    const [center, setCenter] = useState({ lat, lng })
    const [zoom, setZoom] = useState(12)
    const Popper = () => <div className='map-popper'><AiFillHome /><div className='popper-wedge'></div></div>
    const API_KEY = 'AIzaSyAAWlKgdwuqVE_rU0R3Mtxje8-RlWbiwzc'

    return (
        <section className='map' style={{ height: '60vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={center}
                center={center}
                zoom={zoom}
                defaultZoom={zoom}>
                <Popper lat={lat} lng={lng} />
                {/* <Marker lat={lat} lng={lng} /> */}
            </GoogleMapReact>
        </section>
    )
}