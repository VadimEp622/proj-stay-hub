import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState } from 'react'
function Marker() {
    return <div style={{ height: '1em', width: '1em', borderRadius: '50%', background: 'red' }}></div>
}
export default function GoogleMap({ loc }) {
    const [center, setCenter] = useState({ lat: loc.lat, lng: loc.lng })
    const zoom = 10
    return (
        // Important! Always set the container height explicitly
        <div className="map-container">
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }} // Always remove key before uploading to github!
                    defaultCenter={center}
                    center={center}
                    defaultZoom={zoom}
                >
                    <Marker lat={center.lat} lng={center.lng} />
                </GoogleMapReact>

            </div>
        </div>
    );
}