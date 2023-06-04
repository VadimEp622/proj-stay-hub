import React from "react"
import GoogleMapReact from 'google-map-react'
import { AiFillHome } from "react-icons/ai"
import { useState } from 'react'

function Marker() {
    return <div style={{ height: '1em', width: '1em', borderRadius: '50%', background: 'red' }}></div>
}


export default function SimpleMap({ loc }) {
    const { lat, lng } = loc
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
                    <Popper lat={loc.lat} lng={loc.lng} />
                    {/* <Marker lat={loc.lat} lng={loc.lng} /> */}
                </GoogleMapReact>
            </div>
        </div>
    )
}