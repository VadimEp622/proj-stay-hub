import {logger} from '../services/logger.service.mjs'

export async function log(req, res, next) {
  logger.info(req.method, req.originalUrl)
  next()
}

