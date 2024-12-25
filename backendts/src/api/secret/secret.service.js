import { appConfig } from "../../config/app.config.ts"


function getApiKeyGoogleMap() {
    return {
        secret: appConfig.GOOGLE_MAPS_API_KEY
    }
}

export const secretService = {
    getApiKeyGoogleMap,
}