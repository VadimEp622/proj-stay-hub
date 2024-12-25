

function getApiKeyGoogleMap() {
    return {
        secret: process.env.GOOGLE_MAPS_API_KEY
    }
}

export const secretService = {
    getApiKeyGoogleMap,
}