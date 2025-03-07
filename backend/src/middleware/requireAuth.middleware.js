import { logger } from '../service/logger.service.js'
import { asyncLocalStorage } from '../service/als.service.js'
import { appConfig } from '../config/app.config.ts'
import { UnauthorizedException } from '../shared/exeptions/http.exceptions.ts'


// consider adding requireSameUser

export function requireAuth(req, res, next) {
  const { loggedinUser } = asyncLocalStorage.getStore()
  req.loggedinUser = loggedinUser

  if (appConfig.isGuestMode && !loggedinUser) {
    req.loggedinUser = { _id: '', fullname: 'Guest' }
    return next()
  }

  if (!loggedinUser) throw new UnauthorizedException()
  next()
}

export function requireAdmin(req, res, next) {
  const { loggedinUser } = asyncLocalStorage.getStore()
  if (!loggedinUser) throw new UnauthorizedException()
  if (!loggedinUser.isAdmin) {
    logger.warn(loggedinUser.fullname + ' attempted to perform admin action')
    res.status(403).send('Not Authorized')
  }
  next()
}
