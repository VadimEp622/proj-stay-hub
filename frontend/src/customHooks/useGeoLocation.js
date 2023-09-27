import { useState, useEffect } from 'react'

export default function useGeoLocation() {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: '', lng: '' },
    })

    useEffect(() => {
        if (!('geolocation' in navigator)) {
            onError({
                code: 0,
                message: 'Geolocation not supported',
            })
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, [])


    function onSuccess(location) {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        })
    }

    function onError(error) {
        setLocation({
            loaded: true,
            error: {
                code: error.code,
                message: error.message,
            },
        })
    }

    return location
}