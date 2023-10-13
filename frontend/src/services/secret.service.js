import { httpService } from './http.service'


const BASE_URL = 'secret'


function getApiKeyGoogleMap() {
    return httpService.get(`${BASE_URL}/key/google_map`)
}


export const secretService = {
    getApiKeyGoogleMap,
}