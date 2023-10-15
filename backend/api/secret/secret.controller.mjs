import { logger } from '../../services/logger.service.mjs'
import { secretService } from './secret.service.mjs'


export function getApiKeyGoogleMap(req, res) {
    const apiKey = secretService.getApiKeyGoogleMap()
    logger.info('Getting secret API key', 'Google Maps')
    res.json(apiKey)
}