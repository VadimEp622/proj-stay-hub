import { secretService } from './secret.service.mjs'


export function getApiKeyGoogleMap(req, res) {
    const apiKey = secretService.getApiKeyGoogleMap()
    res.json(apiKey)
}