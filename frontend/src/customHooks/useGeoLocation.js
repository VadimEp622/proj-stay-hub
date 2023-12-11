import { useState, useEffect } from 'react'


/**
 * @typedef {Object} Coordinates
 * @property {string} lat - The latitude.
 * @property {string} lng - The longitude.
 * 
 * @typedef {Object} Error
 * @property {number} code - Error Type Code
 * @property {string} message - Error description
 * 
 * @typedef {Object} Location
 * @property {boolean} loaded - Is geolocation loaded
 * @property {Coordinates} [coordinates] - geolocation coordinates object
 * @property {Error} [error] - Error object, if any error occurs
 */


/**
 * @function
 * @returns {Location} - The location object. If geolocation is available and loaded, 
 * the `coordinates` property will contain the latitude and longitude. If an error occurs 
 * while trying to fetch the geolocation, the `error` property will contain the error code 
 * and message.
 */


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