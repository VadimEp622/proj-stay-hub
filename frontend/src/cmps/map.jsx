import React from "react"
import GoogleMapReact from 'google-map-react'
import { AiFillHome } from "react-icons/ai"
import { useState } from 'react'

function Marker() {
    return <div style={{ height: '1em', width: '1em', borderRadius: '50%', background: 'red' }}></div>
}


export default function SimpleMap({ loc }) {
    //IMPORTANT NOTE: DEMO DATA CONFUSED LAT AND LAN.
    //ALSO:           GoogleMapReact ONLY WORKS WITH LNG KEY, NOT LAN KEY
    console.log('loc', loc)
    const lng = loc.lat
    const lat = loc.lan
    const [center, setCenter] = useState({ lat, lng })
    const [zoom, setZoom] = useState(12)
    const Popper = () => <div className="map-popper"><AiFillHome /><div className="popper-wedge"></div></div>
    return (
        <div>
            <div style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDyfAKpN05bJPgve7o6my-sutOHsaV6Y-A" }}
                    defaultCenter={center}
                    center={center}
                    zoom={zoom}
                    defaultZoom={zoom}>
                    <Popper lat={lat} lng={lng} />
                    {/* <Marker lat={lat} lng={lng} /> */}
                </GoogleMapReact>
            </div>
        </div>
    )
}