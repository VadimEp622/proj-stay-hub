import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState } from 'react'
// import { Button } from '@material-ui/core'

function Marker() {
    return <div style={{ height: '1em', width: '1em', borderRadius: '50%', background: 'red' }}></div>
}

export default function SimpleMap({ loc }) {
    console.log('loc', loc)
    const [center, setCenter] = useState({ lat: loc.lat, lng: loc.lng })
    const [zoom, setZoom] = useState(12)

    return (
        <div>
            <div style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDyfAKpN05bJPgve7o6my-sutOHsaV6Y-A" }}
                    defaultCenter={center}
                    center={center}
                    zoom={zoom}
                    defaultZoom={zoom}>
  
                    <Marker lat={loc.lat} lng={loc.lng} />
                </GoogleMapReact>
            </div>
        </div>
    );
}