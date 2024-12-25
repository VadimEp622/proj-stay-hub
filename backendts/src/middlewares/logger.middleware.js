import {logger} from '../services/logger.service.js'

export async function log(req, res, next) {
  logger.info(req.method, req.originalUrl)
  next()
}

