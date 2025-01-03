import { logger } from '../../service/logger.service.js'


export async function healthcheck(req, res) {
    const healthcheck = {
        uptime: process.uptime(),
        responseTime: process.hrtime(),
        message: 'OK',
        timestamp: Date.now()
    };

    try {
        logger.info('Healthcheck', healthcheck)
        return res.status(200).json(healthcheck)
    } catch (error) {
        healthcheck.message = error
        logger.error('Healthcheck', healthcheck)
        return res.status(503).json(healthcheck)
    }
}