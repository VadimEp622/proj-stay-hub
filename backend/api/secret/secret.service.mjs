

function getApiKeyGoogleMap() {
    return {
        secret: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }
}

export const secretService = {
    getApiKeyGoogleMap,
}