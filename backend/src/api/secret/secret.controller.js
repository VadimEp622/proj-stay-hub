import { secretService } from './secret.service.js'


export function getApiKeyGoogleMap(req, res) {
    const apiKey = secretService.getApiKeyGoogleMap()
    res.status(200).json(apiKey)
}