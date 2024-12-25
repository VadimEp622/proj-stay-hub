import { logger } from '../../services/logger.service.js'
import { secretService } from './secret.service.js'


export function getApiKeyGoogleMap(req, res) {
    const apiKey = secretService.getApiKeyGoogleMap()
    // logger.info('Getting secret API key', 'Google Maps')
    res.json(apiKey)
}