import { logger } from '../service/logger.service.js'
import { asyncLocalStorage } from '../service/als.service.js'
import { appConfig } from '../config/app.config.ts'


// consider adding requireSameUser

export function requireAuth(req, res, next) {
  const { loggedinUser } = asyncLocalStorage.getStore()
  req.loggedinUser = loggedinUser

  if (appConfig.isGuestMode && !loggedinUser) {
    req.loggedinUser = { _id: '', fullname: 'Guest' }
    return next()
  }
  if (!loggedinUser) return res.status(401).send('Not Authenticated')
  next()
}

export function requireAdmin(req, res, next) {
  const { loggedinUser } = asyncLocalStorage.getStore()
  if (!loggedinUser) return res.status(401).send('Not Authenticated')
  if (!loggedinUser.isAdmin) {
    logger.warn(loggedinUser.fullname + ' attempted to perform admin action')
    res.status(403).end('Not Authorized')
    return
  }
  next()
}
